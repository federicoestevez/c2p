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
  .usage(`c2p ${color.yellow("<dir>")}`)
  .argument("[target]", "The files or directories to convert into prompt")
  .option(
    "--exclude",
    "Exclude files and directories that match the given pattern",
  )
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
    const options: Options = opts satisfies Options;
    const path = args[0] ?? ".";

    await run(options, path);
  })
  .run();
