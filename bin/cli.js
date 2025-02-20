#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const fs = require('fs');

/**
 * Display help instructions for using the CLI.
 */
const showHelp = () => {
    console.log(`
🚀 JSON to Table CLI - Convert JSON to Markdown Tables

Usage:
  json-to-table-cli [options]

Options:
  --url <api-url>     Fetch JSON from an API and convert it to a Markdown table.
  --file <input.json> Convert a local JSON file to a Markdown table.
  --output <output.md> Save the generated table to a file.
  --help              Show this help message and exit.

Examples:
  json-to-table-cli --url https://jsonplaceholder.typicode.com/users --output table.md
  json-to-table-cli --file data.json --output table.md

✨ For more information, check the README.md.
`);
};

(async () => {
    // Display help if --help or -h is passed
    if (args.help || args.h) {
        showHelp();
        process.exit(0); // Exit successfully after showing help
    }

    let data;

    try {
        // 🟢 Step 1: Fetch JSON data from the provided source (URL or local file)
        if (args.url) {
            // Fetch from API if --url is provided
            data = await fetchData.fetchFromUrl(args.url);
        } else if (args.file) {
            // Read from local file if --file is provided
            data = fetchData.fetchFromFile(args.file);
        } else {
            // Exit if neither source is provided
            throw new Error("Please provide either --url or --file.");
        }

        // 🔍 Step 2: Validate fetched JSON
        if (Array.isArray(data)) {
            // Ensure the array is not empty
            if (data.length === 0) {
                throw new Error("The JSON array is empty.");
            }
        } else if (typeof data === 'object' && data !== null) {
            // Convert a single object into an array for consistency
            data = [data];
        } else {
            // Exit if the data is neither an array nor an object
            throw new Error("Invalid JSON format. Expected an array or object.");
        }

        // 📄 Step 3: Convert JSON to Markdown table
        const markdownTable = jsonToMarkdown(data);

        // 📝 Step 4: Output the result (to file or console)
        if (args.output) {
            // Write to specified output file
            fs.writeFileSync(args.output, markdownTable);
            console.log(`✅ Table successfully saved to: ${args.output}`);
        } else {
            // Display in the terminal if no output file is provided
            console.log(markdownTable);
        }
    } catch (error) {
        // ❌ Handle errors and provide user-friendly feedback
        console.error(`❌ Error: ${error.message}`);
        showHelp(); // Show usage instructions for easier debugging
        process.exit(1); // Exit with an error code
    }
})();
