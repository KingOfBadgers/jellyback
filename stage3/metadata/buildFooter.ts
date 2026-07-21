  export function buildFooter(seed: any) {
  if (!seed) return null;

  console.log("[BUILD FOOTER]", {
    seedQR: seed.footer?.qr,
  });

  return {
    rating:
      seed.ratings?.mpaa ??
      seed.ratings?.bbfc ??
      "not-rated",

    runtime:
      seed.runtimeMinutes,

    resolution:
      seed.media?.resolution,

    cc:
      seed.media?.subtitles,

    qr:
      seed.footer?.qr ?? null,

    logo:
  seed.assets?.logo?.src ??
  seed.footer?.logo ??
  null,

logoAnalysis:
  seed.assets?.logo?.analysis ??
  null,

    jbIcon:
      "/assets/meta/jb/jb.png",
  };
}