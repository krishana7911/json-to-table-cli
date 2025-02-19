#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const fs = require('fs');

(async () => {
    let data;

    if (args.url) {
        data = await fetchData.fetchFromUrl(args.url);
    } else if (args.input) {
        data = fetchData.fetchFromFile(args.input);
    } else {
        console.error("Error: Please provide either --url or --input");
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
