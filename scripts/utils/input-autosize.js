const measureCanvas = document.createElement("canvas");
const measureCtx = measureCanvas.getContext("2d");

function measureTextWidth(text, font) {
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
}

export function initInputAutosize(root) {
  const inputs = root.querySelectorAll(".profile-input");
  for (const el of inputs) {
    const resize = () => {
      const style = getComputedStyle(el);
      const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const text = el.value.length > 0 ? el.value : el.placeholder;
      const textWidth = measureTextWidth(text, font);
      const minWidth = measureTextWidth("XXXXX", font);
      el.style.width = `${Math.max(textWidth, minWidth) + 6}px`;
    };
    resize();
    el.addEventListener("input", resize);
  }
}