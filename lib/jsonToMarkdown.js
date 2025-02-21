const flattenObject = require('./flatten');

/**
 * Converts JSON array into a Markdown table.
 *
 * @param {Array} jsonData - JSON array to convert.
 * @returns {string} Markdown table.
 */
function jsonToMarkdown(jsonData) {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
        throw new Error('Invalid or empty JSON data.');
    }

    // Flatten each JSON object
    const flattenedData = jsonData.map(item => flattenObject(item));

    // Collect all unique headers
    const headers = Array.from(new Set(flattenedData.flatMap(Object.keys)));

    // Create table header
    let markdown = `| ${headers.join(' | ')} |\n`;
    markdown += `| ${headers.map(() => '---').join(' | ')} |\n`;

    // Add table rows
    flattenedData.forEach(item => {
        const row = headers.map(header => item[header] ?? '');
        markdown += `| ${row.join(' | ')} |\n`;
    });

    return markdown;
}

module.exports = { jsonToMarkdown };
