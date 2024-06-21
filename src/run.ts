import type { Options, Target } from "./types";

import {
  comparePaths,
  copyToClipboard,
  createCounterPromise,
  getFiles,
  getPathExtension,
  getRelativePath,
  isBinary,
  isString,
  resolveTarget,
  saveToFile,
} from "./utils";

export async function run(options: Options, target: string): Promise<void> {
  const onTarget = (target: Target) => getTargetContent(options, target);

  const outputs = await processTarget(target, options, onTarget);
  const outputSeparator = options.print ? "\n" : "\n\n";

  if (options.print) {
    process.stdout.write(outputs.join(outputSeparator));
  } else if (options.output?.length) {
    await saveToFile(options.output, outputs.join(outputSeparator));
  } else {
    await copyToClipboard(outputs.join(outputSeparator));
  }

  process.exitCode = outputs.length ? 0 : 1;
  process.exit();
}

async function processTarget(
  glob: string,
  options: Options,
  onTarget: (target: Target) => Promise<string | undefined>,
): Promise<string[]> {
  let files = await getFiles(glob, options);

  // Filter by type if specified
  if (options.type?.length || options.typeNot?.length) {
    const allowed = new Set(options.type ?? []);
    const disallowed = new Set(options.typeNot ?? []);
    files = files.filter((filePath) => {
      const ext = getPathExtension(filePath);

      if (allowed.size && !allowed.has(ext)) {
        return false;
      }

      if (disallowed.size && disallowed.has(ext)) {
        return false;
      }

      return true;
    });
  }

  // Filter binary files
  files = files.filter((filePath) => !isBinary(filePath));

  // Convert files into Targets
  const cwd = process.cwd();
  const targets: Target[] = files.map((filePath) => ({
    name: getRelativePath(cwd, filePath),
    path: filePath,
  }));

  const counter = createCounterPromise();
  targets.forEach((target) => {
    counter.increment();
    onTarget(target).then((result) => {
      if (isString(result)) {
        target.result = result;
      }
      counter.decrement();
    });
  });

  await counter.promise;

  // TODO: Support different sorting?
  targets.sort((a, b) => comparePaths(a.path, b.path));

  const results = targets.map(({ result }) => result || "");

  return results;
}

const getTargetContent = async (
  _options: Options,
  target: Target,
): Promise<string | undefined> => {
  const content = await resolveTarget(target);

  if (!content) {
    return;
  }

  const output = printTarget(target, content);

  return output;
};

const printTarget = (target: Target, content: string): string => {
  return `\`\`\`${target.name}\n${content}\n\`\`\`\n`;
};
