#!/usr/bin/env node

import { bin } from "specialist";
import color from "tiny-colors";

import { run } from "./run";
import type { Options } from "./types";

bin(
  "c2p",
  "A lightning-fast CLI tool that efficiently converts code files into a format suitable for use as prompts in AI conversations or other applications.",
)
  .autoUpdateNotifier(false)
  .usage(`c2p ${color.yellow("[targets...]")}`)
  .usage(`c2p ${color.yellow("./src/*")} ${color.yellow("./build/*")}`)
  .usage(`c2p ${color.yellow("./src")} ${color.green("--type tsx --type ts")}`)
  .usage(`c2p ${color.yellow("./src")} ${color.green("--type-not svg")}`)
  .usage(`c2p ${color.yellow("./src")} ${color.green("--output output.txt")}`)
  .argument(
    "[targets...]",
    "The files, directories, or glob patterns to convert into prompt",
  )
  .option(
    "--exclude, -e <patterns...>",
    "Exclude files and directories that match the given glob patterns",
  )
  .option("--no-ignore", "Do not respect .gitignore files", { default: true })
  .option("--print", "Print the result to the console")
  .option(
    "--type, -t <extensions...>",
    "Retrieve only files with the given extension",
  )
  .option(
    "--type-not, -T <extensions...>",
    "Exclude files with the given extension",
  )
  .option("--output, -o <path>", "Save the result to a file")
  .action(async (opts, args) => {
    const options = { ...opts } as Options;
    const paths = args.length > 0 ? args : ["."];
    await run(options, paths);
  })
  .run();
