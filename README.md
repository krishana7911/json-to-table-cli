# JSON to Table CLI

A simple and lightweight CLI tool to convert JSON data (from files or API responses) into a human-readable Markdown table format. Perfect for documentation or quick data viewing.

## Features
- Convert a local JSON file to a Markdown table.
- Fetch JSON data directly from an API and convert it to a table.
- Output the table to a `.md` file for easy documentation integration.

## Installation

To use this CLI tool, you can either install it globally or run it with `npx` without installation.

### Using `npx` (No Installation Required)
Simply run the following command to execute the tool:

```bash
npx json-to-table-cli --url <api-url> --output <output-file.md>
```

### Install Globally
```
npm install -g json-to-table-cli
```

### Command list
```
json-to-table-cli --url <api-url> --output <output-file.md>
```
