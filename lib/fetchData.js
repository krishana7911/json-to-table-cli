const fs = require('fs');
// const fetch = require('node-fetch');

module.exports = {
    fetchFromFile: (file) => {
        try {
            const data = fs.readFileSync(file, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error(`Failed to read file or parse JSON from: ${file}`);
        }
    },

    fetchFromUrl: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data from URL: ${url}`);
            }
            return await response.json();
        } catch (err) {
            throw new Error(`Error fetching JSON data: ${err.message}`);
        }
    }
};
