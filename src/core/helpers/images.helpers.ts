export const getCanvas = (
  i: HTMLImageElement,
  w: number,
  l: number,
  t: number,
  s: number
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  canvas.width = w;
  canvas.height = w;

  ctx!.fillStyle = 'white';
  ctx!.fillRect(0, 0, canvas.width, canvas.height);
  ctx!.drawImage(i, l, t, i.naturalWidth * s, i.naturalHeight * s);

  return canvas;
};

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return fetch(canvas.toDataURL('image/webp'))
    .then(res => res.blob());
};