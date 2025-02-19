# JSON to Table CLI

A simple and lightweight CLI tool to convert JSON data (from files or API responses) into a human-readable Markdown table format. Perfect for documentation or quick data viewing.

## 🚀 Features
- 📁 Convert a local JSON file to a Markdown table.
- 🌐 Fetch JSON data directly from an API and convert it to a table.
- 📝 Output the table to a `.md` file for easy documentation integration.
- ❌ Error handling for invalid JSON input or missing parameters.

## 📦 Installation

You can either install the CLI globally or run it with `npx` without installation.

### Using `npx` (No Installation Required)
Run the following command to execute the tool:

```bash
npx json-to-table-cli --url <api-url> --output <output-file.md>
```

### Install Globally
To install the tool globally:

```bash
npm install -g json-to-table-cli
```

## 📝 Usage

### 1. Convert JSON from an API to Markdown Table
```bash
json-to-table-cli --url https://jsonplaceholder.typicode.com/users --output users-table.md
```

### 2. Convert a Local JSON File to Markdown Table
```bash
json-to-table-cli --file ./data/users.json --output users-table.md
```

### 3. Display Help
```bash
json-to-table-cli --help
```

## 📊 Example Output

Given the following JSON:

```json
[
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com" }
]
```

The generated `users-table.md` will look like this:

```markdown
| ID  | Name        | Email             |
| --- | ----------- | ----------------- |
| 1   | John Doe    | john@example.com  |
| 2   | Jane Smith  | jane@example.com  |
```

## 🛠️ Error Handling

If something goes wrong, you'll get a clear error message. Common issues include:
- Invalid JSON format.
- Missing `--url` or `--file` parameter.
- File path or API endpoint not accessible.

## 🤝 Contributing

Contributions are welcome! If you'd like to add new features or improve the code, feel free to fork the repo and submit a pull request.

## 📜 License

This project is licensed under the MIT License.

