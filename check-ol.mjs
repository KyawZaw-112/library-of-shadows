const main = async () => {
  const url = "https://kyawzaw-112.github.io/library-of-shadows/catalog/";
  try {
    const r = await fetch(url);
    const html = await r.text();
    // Look for cover images and loading state
    const imgs = [...html.matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1]);
    console.log("img tags:", imgs.length);
    imgs.slice(0, 8).forEach((i) => console.log("  ", i));
    console.log("has 'Pulling spines':", html.includes("Pulling spines"));
  } catch (e) {
    console.log("ERR", e?.message || e);
  }
};
main();
