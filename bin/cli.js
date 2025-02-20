#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const fs = require('fs');

// Help content
const showHelp = () => {
    console.log(`
🚀 JSON to Table CLI - Convert JSON to Markdown Tables

Usage:
  json-to-table-cli [options]

Options:
  --url <api-url>     Fetch JSON from an API and convert to Markdown table.
  --file <input.json> Convert a local JSON file to a Markdown table.
  --output <output.md> Save the generated table to a file.
  --help              Show this help message and exit.

Examples:
  json-to-table-cli --url https://jsonplaceholder.typicode.com/users --output table.md
  json-to-table-cli --file data.json --output table.md

✨ For more information, check the README.md
`);
};

(async () => {
    if (args.help || args.h) {
        showHelp();
        process.exit(0);
    }

    let data;

    if (args.url) {
        data = await fetchData.fetchFromUrl(args.url);
    } else if (args.file) {
        data = fetchData.fetchFromFile(args.file);
    } else {
        console.error("❌ Error: Please provide either --url or --file");
        showHelp();
        process.exit(1);
    }

    const markdownTable = jsonToMarkdown(data);

    if (args.output) {
        fs.writeFileSync(args.output, markdownTable);
        console.log(`✅ Table saved to ${args.output}`);
    } else {
        console.log(markdownTable);
    }
})();
