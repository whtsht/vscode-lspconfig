'use strict';

import { ExtensionContext, Uri, window as Window, workspace } from 'vscode';
import {
	DocumentSelector,
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';
import { existsSync } from "fs";

interface LSPSetting {
	name?: string;
	command?: string[];
	root_patterns?: string[];
	document_selector?: DocumentSelector | string[];
}

const clients: LanguageClient[] = [];

async function startLanguageClient(setting: LSPSetting, workspaceUri: Uri): Promise<void> {
	if (!isRootPatternMatched(setting, workspaceUri)) return;
	const bin = setting.command?.[0];
	if (!bin) return;

	const serverOptions: ServerOptions = {
		command: bin,
		args: setting.command?.slice(1),
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: setting.document_selector,
		progressOnInitialization: true,
	};

	const name = setting.name || "unnamed";
	try {
		const client = new LanguageClient(`vscode-lspconfig: ${name}`, `${name}`, serverOptions, clientOptions);
		clients.push(client);
		await client.start();
	} catch (error) {
		Window.showErrorMessage(`Failed to start server [${name}]. See the output panel for details.`);
	}
}

export function isRootPatternMatched(setting: LSPSetting, workspaceUri: Uri): boolean {
	return !setting.root_patterns ||
		setting
			.root_patterns
			.some(pattern => existsSync(Uri.joinPath(workspaceUri, pattern).fsPath));
}

export async function activate(_: ExtensionContext): Promise<void> {
	const workspaceUri = workspace.workspaceFolders?.[0].uri;
	if (!workspaceUri) return;

	const config = workspace.getConfiguration('vscode-lspconfig');
	const lspSettings = config.get('serverConfigurations') as LSPSetting[];

	Promise.all(lspSettings.map(setting => startLanguageClient(setting, workspaceUri)))
}

export async function deactivate(): Promise<void> {
	const stopPromises = clients.map(client => client.stop());
	await Promise.all(stopPromises);
	clients.splice(0)
}