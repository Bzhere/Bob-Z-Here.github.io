import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Lanyard from "./components/Lanyard/Lanyard";
import portraitUrl from "../assets/crimson-02.webp";
import "./styles.css";

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function coverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function coverImageWithFocus(ctx, image, x, y, width, height, focusX = 0.5, focusY = 0.3) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const drawX = x + width / 2 - drawWidth * focusX;
  const drawY = y + height / 2 - drawHeight * focusY;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

async function makeFrontTexture() {
  const image = await loadImage(portraitUrl);
  const canvas = document.createElement("canvas");
  canvas.width = 820;
  canvas.height = 1240;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#f4f0e9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  roundRect(ctx, 64, 72, 692, 520, 46);
  ctx.fillStyle = "#171615";
  ctx.fill();
  ctx.clip();
  coverImageWithFocus(ctx, image, 64, 72, 692, 520, 0.5, 0.3);
  ctx.restore();

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(255,255,255,0.66)");
  gradient.addColorStop(0.48, "rgba(255,255,255,0)");
  gradient.addColorStop(1, "rgba(23,22,21,0.12)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#a73422";
  ctx.font = "800 48px Inter, Arial, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText("PORTRAIT PASS", 64, 690);

  ctx.fillStyle = "#171615";
  ctx.font = "900 174px Inter, Arial, sans-serif";
  ctx.letterSpacing = "0px";
  ctx.fillText("ZGY", 58, 858);

  ctx.fillStyle = "rgba(23, 22, 21, 0.68)";
  ctx.font = "700 44px Inter, Arial, sans-serif";
  ctx.fillText("Move quietly.", 64, 952);
  ctx.fillText("Leave a sharp silhouette.", 64, 1012);

  ctx.strokeStyle = "rgba(23, 22, 21, 0.16)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(64, 1086);
  ctx.lineTo(756, 1086);
  ctx.stroke();

  ctx.fillStyle = "rgba(23, 22, 21, 0.48)";
  ctx.font = "800 30px Inter, Arial, sans-serif";
  ctx.fillText("DENIM", 64, 1158);
  ctx.textAlign = "right";
  ctx.fillText("CRIMSON", 756, 1158);

  return canvas.toDataURL("image/png");
}

function makeBackTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 820;
  canvas.height = 1240;
  const ctx = canvas.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bg.addColorStop(0, "#b94732");
  bg.addColorStop(0.55, "#8d2a1f");
  bg.addColorStop(1, "#3a120f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 248, 239, 0.12)";
  ctx.beginPath();
  ctx.arc(160, 150, 320, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff8ef";
  ctx.textAlign = "center";
  ctx.font = "900 132px Inter, Arial, sans-serif";
  ctx.fillText("Love", 410, 454);
  ctx.fillText("you", 410, 610);
  ctx.fillText("KiKi!", 410, 766);

  ctx.fillStyle = "rgba(255, 248, 239, 0.68)";
  ctx.font = "800 42px Inter, Arial, sans-serif";
  ctx.fillText("PRIVATE SIDE", 410, 950);

  return Promise.resolve(canvas.toDataURL("image/png"));
}

function ReactBitsLanyardBadge() {
  const [textures, setTextures] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all([makeFrontTexture(), makeBackTexture()]).then(([frontImage, backImage]) => {
      if (mounted) setTextures({ frontImage, backImage });
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const denimSection = document.getElementById("denim");
    if (!denimSection) return undefined;

    const updateVisibility = () => {
      const navOffset = 96;
      setIsHidden(denimSection.getBoundingClientRect().top <= navOffset);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!textures) return null;

  return (
    <div
      className={`reactbits-lanyard-shell${isHidden ? " is-hidden" : ""}`}
      aria-label="Interactive React Bits lanyard badge"
      aria-hidden={isHidden}
    >
      <Lanyard
        position={[0, 0, 18]}
        gravity={[0, -40, 0]}
        frontImage={textures.frontImage}
        backImage={textures.backImage}
        imageFit="cover"
        lanyardWidth={1}
      />
    </div>
  );
}

const mount = document.createElement("div");
mount.id = "reactbits-lanyard-root";
document.body.appendChild(mount);

createRoot(mount).render(<ReactBitsLanyardBadge />);
