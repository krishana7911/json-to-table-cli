#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const { csvToMarkdown } = require('../lib/csvToMarkdown');
const fs = require('fs');

// Display help
const showHelp = () => {
    console.log(`
🚀 JSON to Table CLI - Convert JSON/CSV to Markdown Tables

Usage:
  json-to-table-cli [options]

Options:
  --url <api-url>     Fetch JSON from an API and convert to Markdown.
  --file <input.json> Convert a local JSON file to Markdown.
  --csv <input.csv>   Convert a local CSV file to Markdown.
  --output <output.md> Save the generated table to a file.
  --flatten           Flatten nested JSON into a table.
  --help              Show this help message and exit.

Examples:
  json-to-table-cli --url https://jsonplaceholder.typicode.com/users --output table.md --flatten
  json-to-table-cli --file data.json --output table.md --flatten
  json-to-table-cli --csv data.csv --output table.md

✨ For more information, check the README.md.
`);
};

(async () => {
    if (args.help || args.h) {
        showHelp();
        process.exit(0);
    }

    let data;
    let markdownTable;

    try {
        if (args.url) {
            data = await fetchData.fetchFromUrl(args.url);
            markdownTable = jsonToMarkdown(data);
        } else if (args.file) {
            data = fetchData.fetchFromFile(args.file);
            markdownTable = jsonToMarkdown(data);
        } else if (args.csv) {
            markdownTable = csvToMarkdown(args.csv);
        } else {
            console.error("❌ Error: Please provide --url, --file, or --csv.");
            showHelp();
            process.exit(1);
        }

        // Write output
        if (args.output) {
            fs.writeFileSync(args.output, markdownTable);
            console.log(`✅ Table saved to ${args.output}`);
        } else {
            console.log(markdownTable);
        }
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
})();
