// src/index.js
const yargs = require('yargs');

// Define the CLI options
yargs.command({
  command: 'json-to-table',
  describe: 'Convert JSON to a Markdown table',
  builder: {
    url: {
      describe: 'API URL to fetch data from',
      demandOption: true, // make it required
      type: 'string',
    },
    output: {
      describe: 'Output file to save the table',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    console.log(`Fetching data from ${argv.url}`);
    console.log(`Saving the table to ${argv.output}`);
  },
});

yargs.parse();
