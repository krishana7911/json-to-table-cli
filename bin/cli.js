#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const { csvToMarkdown } = require('../lib/csvToMarkdown'); // New import for CSV
const fs = require('fs');

// Display help message
const showHelp = () => {
    console.log(`
🚀 JSON to Table CLI - Convert JSON/CSV to Markdown Tables

Usage:
  json-to-table-cli [options]

Options:
  --url <api-url>     Fetch JSON from an API and convert to a Markdown table.
  --file <input.json> Convert a local JSON file to a Markdown table.
  --csv <input.csv>   Convert a local CSV file to a Markdown table.
  --output <output.md> Save the generated table to a file.
  --help              Show this help message and exit.

Examples:
  json-to-table-cli --url https://jsonplaceholder.typicode.com/users --output table.md
  json-to-table-cli --file data.json --output table.md
  json-to-table-cli --csv data.csv --output table.md

✨ For more information, check the README.md.
`);
};

(async () => {
    // Show help if --help or -h is passed
    if (args.help || args.h) {
        showHelp();
        process.exit(0);
    }

    let data;
    let markdownTable;

    try {
        // Handle JSON from API or file
        if (args.url) {
            data = await fetchData.fetchFromUrl(args.url);
            markdownTable = jsonToMarkdown(data);
        } else if (args.file) {
            data = fetchData.fetchFromFile(args.file);
            markdownTable = jsonToMarkdown(data);
        }
        // Handle CSV input
        else if (args.csv) {
            markdownTable = csvToMarkdown(args.csv);
        }
        else {
            console.error("❌ Error: Please provide --url, --file, or --csv.");
            showHelp();
            process.exit(1);
        }

        // Output result
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
