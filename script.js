const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const loader = document.getElementById("loader");

// 🔢 TOTAL FRAMES (change based on your images)
const frameCount = 120;

// 🖼️ IMAGE PATH FORMAT
const currentFrame = (index) =>
  `images/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const images = [];
let imagesLoaded = 0;
let currentFrameIndex = 0;

// 📐 Resize canvas to fit screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
}

// 🖌️ Draw image while maintaining aspect ratio
function drawImageCover(img) {
  const canvasRatio = canvas.width / canvas.height;
  const imageRatio = img.width / img.height;

  let drawWidth, drawHeight, xOffset, yOffset;

  if (canvasRatio > imageRatio) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imageRatio;
    xOffset = 0;
    yOffset = (canvas.height - drawHeight) / 2;
  } else {
    drawHeight = canvas.height;
    drawWidth = canvas.height * imageRatio;
    yOffset = 0;
    xOffset = (canvas.width - drawWidth) / 2;
  }

  context.drawImage(img, xOffset, yOffset, drawWidth, drawHeight);
}

// 🖼️ Render frame
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawImageCover(images[currentFrameIndex]);
}

// 📦 Preload images
function preloadImages() {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frameCount) {
        loader.style.display = "none";
        resizeCanvas();
      }
    };
    images.push(img);
  }
}

// 📜 Scroll animation logic
function handleScroll() {
  const scrollTop = window.scrollY;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / scrollHeight;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (frameIndex !== currentFrameIndex) {
    currentFrameIndex = frameIndex;
    requestAnimationFrame(render);
  }
}

// 🔄 Events
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", resizeCanvas);

// 🚀 Start
preloadImages();
