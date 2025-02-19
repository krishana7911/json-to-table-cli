function jsonToMarkdown(data) {
  if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty JSON data.');
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(header => obj[header] ?? '').join(' | '));

  const table = [
      headers.join(' | '),
      headers.map(() => '---').join(' | '),
      ...rows
  ];

  return table.join('\n');
}

module.exports = { jsonToMarkdown };  // <-- Export as an object
