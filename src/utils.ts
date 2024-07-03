import type { Options, Target } from "./types";

import readdir, { type Result } from "tiny-readdir-glob-gitignore";
import isBinaryPath from "is-binary-path";
import fs, { promises as fsp } from "node:fs";
import path from "node:path";

export function isBinary(targetPath: string) {
  return isBinaryPath(targetPath);
}

export async function copyToClipboard(text: string) {
  const clipboardy = (await import("clipboardy")).default;
  await clipboardy.write(text);
}

export async function saveToFile(filePath: string, content: string) {
  await fsp.writeFile(filePath, content);
}

export function isFile(targetPath: string): boolean {
  try {
    const stats = fs.statSync(targetPath);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}

export async function getFiles(
  globs: string[],
  options: Options,
): Promise<string[]> {
  const cwd = process.cwd();
  const [fileGlobs, dirGlobs] = globs.reduce<[string[], string[]]>(
    ([files, dirs], glob) => {
      isFile(path.resolve(cwd, glob)) ? files.push(glob) : dirs.push(glob);
      return [files, dirs];
    },
    [[], []],
  );

  if (dirGlobs.length === 0) {
    return fileGlobs;
  }

  const { files: dirFiles } = await getReaddir(dirGlobs, options);

  return [...fileGlobs, ...dirFiles];
}

export function getReaddir(globs: string[], options: Options): Promise<Result> {
  return readdir(globs, {
    cwd: process.cwd(),
    limit: Number.POSITIVE_INFINITY,
    ignoreFiles: options.ignore ? [".gitignore"] : [],
    ignoreFilesFindAbove: false,
    ignoreFilesFindBetween: false,
    followSymlinks: false,
    ignore: (filePath) => {
      if (options.hidden) return false;
      const hiddenRegex = /[\\\/]\.[^\\\/]*$/;
      const isHidden = hiddenRegex.test(filePath);
      return isHidden;
    },
  });
}

export async function resolveTarget(target: Target): Promise<string> {
  return await fsp.readFile(target.path, "utf8");
}

export function getPathExtension(filePath: string): string {
  const regex = /\.([^\\\/\.]+)$/;
  const match = filePath.match(regex);

  if (!match) return "";

  return match[1];
}

export function getRelativePath(fromPath: string, toPath: string) {
  if (toPath.startsWith(fromPath)) {
    if (toPath[fromPath.length] === path.sep) {
      return toPath.slice(fromPath.length + 1);
    }
  }

  return path.relative(fromPath, toPath);
}

export function createCounterPromise(initialCount = 0): {
  promise: Promise<void>;
  increment: () => void;
  decrement: () => void;
  isPending: () => boolean;
} {
  let count = initialCount;
  let resolve: () => void;
  let isPending = true;

  const promise = new Promise<void>((res) => {
    resolve = res;
  });

  const checkCompletion = () => {
    if (count === 0) {
      isPending = false;
      resolve();
    }
  };

  return {
    promise,
    increment: () => {
      count++;
    },
    decrement: () => {
      count--;
      checkCompletion();
    },
    isPending: () => isPending,
  };
}

export function comparePaths(a: string, b: string): -1 | 0 | 1 {
  for (let i = 0, al = a.length, bl = b.length; i < al; i++) {
    if (i >= bl) return 1;

    const ac = a.charCodeAt(i);
    const bc = b.charCodeAt(i);

    if (ac === bc) continue;
    if (ac === 47 || ac === 92) return -1; // / or \
    if (bc === 47 || bc === 92) return 1; // / or \
    if (ac < bc) return -1;
    if (ac > bc) return 1;
  }

  return 0;
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}
