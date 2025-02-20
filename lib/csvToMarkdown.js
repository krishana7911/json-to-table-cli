const fs = require('fs');
const { parse } = require('csv-parse/sync');

/**
 * Convert CSV file to a Markdown table.
 * @param {string} filePath - Path to the CSV file.
 * @returns {string} Markdown table.
 */
function csvToMarkdown(filePath) {
    // Read CSV file
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const csvContent = fs.readFileSync(filePath, 'utf-8');

    // Parse CSV
    const records = parse(csvContent, { columns: true, skip_empty_lines: true });

    if (!records.length) {
        throw new Error('CSV is empty or not properly formatted.');
    }

    // Generate Markdown table
    const headers = Object.keys(records[0]);
    const table = [];

    // Header row
    table.push(`| ${headers.join(' | ')} |`);
    table.push(`| ${headers.map(() => '---').join(' | ')} |`);

    // Data rows
    records.forEach(row => {
        const values = headers.map(header => row[header] ?? ''); // Handle missing values
        table.push(`| ${values.join(' | ')} |`);
    });

    return table.join('\n');
}

module.exports = { csvToMarkdown };
