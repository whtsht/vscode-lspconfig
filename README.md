# vscode-lspconfig

A LSP client configuration tool for vscode

## Quickstart

1. Install a language server, e.g. gopls (Go language server)

```bash
go install golang.org/x/tools/gopls@latestg 
```

2. Add the LSP configuration in vscode workspace settings (`.vscode/settings.json`)

```json
{
    "vscode-lspconfig.serverConfigurations": [
        {
            "name": "gopls",
            "document_selector": [
                {
                    "language": "go"
                }
            ],
            "command": [
                "gopls"
            ]
        }
    ]
}
```


3. Reload vscode. The langage server will start.

## Extension Settings

Include if your extension adds any VS Code settings through the `vscode-lspconfig.serverConfigurations` extension point.

### ServerConfiguration Format [wip]
#### name: string
#### root_patterns: string[]
#### document_selector: DocumentSelector | string[]
#### command: string[]

### Examples
```json
{
    "vscode-lspconfig.serverConfigurations": [
        {
            "name": "pyright",
            "root_patterns": [
                ".git"
            ],
            "document_selector": [
                {
                    "language": "python"
                }
            ],
            "command": [
                "pyright"
            ]
        },
        {
            "name": "rubocop",
            "root_patterns": [
                ".git",
                "Gemfile"
            ],
            "document_selector": [
                {
                    "language": "ruby"
                }
            ],
            // You can also run the server on Docker!
            "command": [
                "docker",
                "compose",
                "run",
                "--rm",
                "rails",
                "bundle",
                "exec",
                "rubocop",
                "--lsp"
            ]
        }
    ],
}
```