# c2p (Code to Prompt)

A lightning-fast CLI tool that efficiently converts code files into a format suitable for use as prompts in AI conversations or other applications.

## ✨ Features

- 🚀 **Blazingly Fast** - Optimized for speed and low resource usage
- 🎯 **Smart Filtering** - Automatically excludes binary files and respects .gitignore patterns
- 🔧 **Flexible Selection** - Support for files, directories, and glob patterns
- 📋 **Multiple Output Options** - Copy to clipboard, print to console, or save to file
- 🎨 **Clean Format** - Outputs files in markdown code blocks with proper syntax highlighting
- ⚡ **Efficient Processing** - Parallel processing for handling large codebases

## 📦 Installation

```bash
npm install -g @federicoestevez/c2p
```

## 🚀 Usage

### Basic Usage

```bash
# Convert current directory to prompt format (copies to clipboard)
c2p

# Convert specific files
c2p file1.ts file2.js

# Convert specific directories
c2p ./src ./tests

# Convert using glob patterns
c2p ./src/**/*.ts ./docs/*.md
```

### Common Use Cases

```bash
# Convert TypeScript files only
c2p ./src --type ts --type tsx

# Exclude specific file types
c2p ./src --type-not svg --type-not png

# Save output to file instead of clipboard
c2p ./src --output prompt.txt

# Print to console for piping
c2p ./src --print

# Exclude specific patterns
c2p ./src --exclude "*.test.*" --exclude "*.spec.*"

# Include hidden files and ignore .gitignore
c2p ./src --no-ignore
```

## ⚙️ Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--type` | `-t` | Include only files with specified extensions | `c2p --type ts --type js` |
| `--type-not` | `-T` | Exclude files with specified extensions | `c2p --type-not svg --type-not png` |
| `--exclude` | `-e` | Exclude files/directories matching glob patterns | `c2p --exclude "*.test.*"` |
| `--output` | `-o` | Save output to specified file path | `c2p --output result.txt` |
| `--print` | | Print output to console instead of clipboard | `c2p --print` |
| `--no-ignore` | | Ignore .gitignore files (include all files) | `c2p --no-ignore` |

### Detailed Option Explanations

#### `--type` / `-t`
Filters files to include only those with the specified file extensions. You can specify multiple extensions by repeating the option.

```bash
# Include only TypeScript and JavaScript files
c2p ./src --type ts --type tsx --type js --type jsx

# Include only Python files
c2p ./scripts --type py
```

#### `--type-not` / `-T`
Excludes files with the specified file extensions. Useful for filtering out unwanted file types.

```bash
# Exclude image and video files
c2p ./assets --type-not png --type-not jpg --type-not mp4

# Exclude test files
c2p ./src --type-not spec --type-not test
```

#### `--exclude` / `-e`
Excludes files and directories that match the given glob patterns. Supports standard glob syntax.

```bash
# Exclude all test files and node_modules
c2p . --exclude "*.test.*" --exclude "node_modules/**"

# Exclude specific directories
c2p . --exclude "dist/**" --exclude "build/**"
```

#### `--output` / `-o`
Saves the formatted output to a specified file instead of copying to clipboard.

```bash
# Save to a text file
c2p ./src --output codebase.txt

# Save to a markdown file
c2p ./docs --output documentation.md
```

#### `--print`
Prints the output directly to the console instead of copying to clipboard. Useful for piping to other commands or viewing output immediately.

```bash
# Print to console
c2p ./src --print

# Pipe to other commands
c2p ./src --print | head -50
```

#### `--no-ignore`
By default, c2p respects .gitignore files and excludes ignored files. This option disables that behavior.

```bash
# Include all files, even those in .gitignore
c2p . --no-ignore
```

## 📝 Output Format

c2p formats each file as a markdown code block with the relative file path as the identifier:

````markdown
```src/components/Button.tsx
import React from 'react';

export const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
```

```src/styles/button.css
.button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
```
````

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
