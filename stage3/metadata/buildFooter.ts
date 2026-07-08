export function buildFooter(seed: any) {
  if (!seed) return null;

console.log("[BUILD FOOTER]", {
    seedQR: seed.footer?.qr,
});


  return {
    rating:
      seed.ratings?.mpaa ??
      seed.ratings?.bbfc ??
      null,

    runtime:
      seed.runtimeMinutes ??
      null,

    resolution:
      seed.media?.resolution ??
      null,

    cc:
      seed.media?.subtitles ??
      false,

    qr:
      seed.footer?.qr ??
      null,

    logo:
      seed.assets?.logo ??
      null,

    jbIcon:
      "/assets/meta/jb/jb.png",

      
  };


}