# vscode-lspconfig

A LSP client configuration tool for vscode.

vscode-lspconfig is useful for Docker integration or running your own custom LSP.

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


3. Reload vscode. The language server will start.

## Extension Settings

Include if your extension adds any VS Code settings through the `vscode-lspconfig.serverConfigurations` extension point.

### ServerConfiguration Format
#### name: string
The name of the language server. This should be a unique identifier for the server you are configuring.
#### root_patterns: string[]
An array of file patterns used to determine whether to start the language server. These patterns help the server identify the project's root, ensuring it only activates in the appropriate context.
#### document_selector: DocumentSelector | string[]
A document selector defines the scope of documents the language server will be active on. This can be specified as an array of languages or more complex [DocumentSelector](https://code.visualstudio.com/api/references/document-selector) objects.
#### command: string[]
An array of strings that represent the command to start the language server. This can include the server's executable and any necessary arguments. 

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
