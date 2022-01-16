export const sharedCanvas = document.createElement("canvas");
const _context = sharedCanvas.getContext("2d");

if (!_context) {
  throw new Error("Failed to create canvas context");
}

export const sharedCanvasContext = _context;
