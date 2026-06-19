export async function exportPosterToPNG({
  elementId = "poster-crop",
  width = 1000,
  height = 1500,
}: {
  elementId?: string;
  width?: number;
  height?: number;
}) {
  const el = document.getElementById(elementId);

  if (!el) throw new Error("Crop element not found");

  // wait one frame to ensure paint is stable
  await new Promise((r) => requestAnimationFrame(r));

  const html2canvas = (await import("html2canvas")).default;

  const canvas = await html2canvas(el, {
    backgroundColor: null,
    useCORS: true,
    scale: 2, // high quality output
  });

  const out = document.createElement("canvas");
  out.width = width;
  out.height = height;

  const ctx = out.getContext("2d")!;
  ctx.drawImage(canvas, 0, 0, width, height);

  return out.toDataURL("image/png", 1.0);
}