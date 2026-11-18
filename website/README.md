# Website files

`dist/` contains the complete static website. Edit its HTML, CSS and JavaScript directly; there is no build step.

From the repository root:

```sh
python3 -m http.server 8080 --directory website/dist
node --check website/dist/script.js
```

The homepage links to `impressum.html` and `datenschutz.html`. All assets are local, fonts are system fonts, and the six project photographs use `assets/projects/grade-v1/`. Paths are relative so the site works beneath the GitHub Pages project path as well as a future custom domain.

The repository's manual Pages workflow uploads only `website/dist/`. Raw sources, maintenance scripts, documentation and customer documents are not included in the website artifact. See the [root README](../README.md) and [GitHub setup guide](../docs/github-setup.md).

The homepage and three service pages allow indexing at the owner's request. Legal pages use `noindex,follow` while their remaining details are finalized. Canonicals, JSON-LD, sitemap.xml, robots.txt and llms.txt use the current GitHub Pages URL; update these together when changing domains. A robots.txt under a GitHub project subdirectory does not control the host-root policy. The portrait's small “KI-generiert” link leads to its explanation in the Impressum. Preserve that disclosure and the map attribution.
