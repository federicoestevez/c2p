await Bun.build({
  target: "node",
  outdir: "dist",
  naming: "c2p.[ext]",
  entrypoints: ["./src/cli.ts"],
  minify: true,
});
