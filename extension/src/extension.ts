// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path'


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  console.log("extension activada");

  context.subscriptions.push(
    vscode.commands.registerCommand('diagram.open', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'Diagrama',
        'Diagrama Ejemplo',
        vscode.ViewColumn.One,
        
        {enableScripts:true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath,"..","webview",))]
      }
      );

      // And set its HTML content
      panel.webview.html = getContent(panel.webview,context);
    })
  );

}

// This method is called when your extension is deactivated
export async function deactivate(): Promise<void> {

}
function getContent(webview:vscode.Webview,context: vscode.ExtensionContext): string {

  const page=vscode.Uri.joinPath(context.extensionUri,"..","webview","css","page.css");
  const bundle=vscode.Uri.joinPath(context.extensionUri,"..","webview","resources","bundle.js");

  const pageUri=webview.asWebviewUri(page);
  const bundleUri=webview.asWebviewUri(bundle);
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Sprotty Class Diagram Example</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="${pageUri}">
  </head>
  
  <body>
      <div class="container">
          <div class="row" id="sprotty-app" data-app="class-diagram">
              <div class="col-md-10">
                  <h1>Sprotty Diagram Example</h1>
              </div>
          </div>
          <div class="row">
              <div class="col-md-12">
                  <div id="sprotty" class="sprotty" />
              </div>
              <div class="copyright">
                  &copy; 2021 <a href="https://www.typefox.io/">TypeFox GmbH</a>.
              </div>
          </div>
      </div>
      <script src="${bundleUri}"></script>
  </body>
  
  </html>`
}

