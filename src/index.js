#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const fetchData = require('../lib/fetchData');
const { jsonToMarkdown } = require('../lib/jsonToMarkdown');
const fs = require('fs');
const flattenObject = require('../lib/flatten');

// CLI definition
yargs(hideBin(process.argv))
    .command(
        'json-to-table',
        'Convert JSON to Markdown table',
        (yargs) => {
            yargs.option('url', {
                describe: 'API URL to fetch JSON',
                type: 'string',
                demandOption: true,
            })
            .option('output', {
                describe: 'Output file for Markdown',
                type: 'string',
                demandOption: true,
            })
            .option('flatten', {
                describe: 'Flatten nested JSON before conversion',
                type: 'boolean',
                default: false,
            });
        },
        async (argv) => {
            try {
                const data = await fetchData.fetchFromUrl(argv.url);

                // Flatten if requested
                const processedData = argv.flatten
                    ? data.map(item => flattenObject(item))
                    : data;

                const markdown = jsonToMarkdown(processedData);
                fs.writeFileSync(argv.output, markdown);

                console.log(`✅ Table saved to: ${argv.output}`);
            } catch (error) {
                console.error(`❌ Error: ${error.message}`);
            }
        }
    )
    .help()
    .argv;
