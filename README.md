# Yaak Array-value plugin

Adds a small template function to Yaak that lets you pick a value from a comma-separated list by index.

## Template function

### `array.value(data, key?)`

- **data**: Comma-separated values (required)
- **key**: Zero-based index to return (optional, defaults to `0`)

Returns the selected item as a string (trimmed), or `null` if the index is out of range.

## Usage example

Given this list:

- `data`: `first, second, third`

You can select values like:

```text
${[ array.value(data: "first, second, third") ]}
// first
```

Select a specific index:

```text
${[ array.value("first, second, third", "2") ]}
// third
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Licence

MIT
