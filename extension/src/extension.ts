// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path'
import { readFileSync } from 'fs';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let file: string;
const NODES = /"nodes"/;
const EDGES = /"edges"/;

const elementos = /},/

let nodos, flechas;



export function activate(context: vscode.ExtensionContext) {

  console.log("extension activada");

  context.subscriptions.push(
    vscode.commands.registerCommand('diagram.open', () => {
      const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Select',
        canSelectFiles: true,
        canSelectFolders: false
      };
      vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
          file = fileUri[0].fsPath;
          console.log("File:" + file);
          const panel = vscode.window.createWebviewPanel(
            'Diagrama',
            'Diagrama Ejemplo',
            vscode.ViewColumn.One,

            {
              enableScripts: true,
              localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "..", "webview",))]
            }
          );

          // And set its HTML content
          panel.webview.html = getContentFromFile(panel.webview, context);
        }
      });;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('diagrama.workspace', () => {
      let estructura: any = {
        nodes: [],
        edges: []
      }
      let idGlobal = 1
      let directorios: any = []
      let uriWorkSpace = vscode.workspace.workspaceFolders[0].uri
      console.log(uriWorkSpace)
      //Archivos y directorios del workspace raiz
      vscode.workspace.fs.readDirectory(uriWorkSpace)
        .then(function (files) {
          files.forEach(function (file) {
            let obj: any = {}
            if (file[1] == 2 && checkRightFolder(file[0])) {
              obj.path = (uriWorkSpace + "/" + file[0])
              obj.id = idGlobal
              directorios.push(obj)
              console.log(file[0])
              estructura.nodes.push({ id: idGlobal, label: file[0] })
              estructura.edges.push({ srcId: 0, tgtid: idGlobal })
              idGlobal++
            }
            else if (file[1] == 1 && checkRightFile(file[0])) {
              console.log(file[0])
              estructura.nodes.push({ id: idGlobal, label: file[0] })
              estructura.edges.push({ srcId: 0, tgt: idGlobal })
              idGlobal++
            }
          })
          if (directorios.length != 0) {
            estructura = leerDirectorios(estructura, idGlobal, directorios)
          }
        })

      console.log(estructura)
    }
    )
  )

}

// This method is called when your extension is deactivated
export async function deactivate(): Promise<void> {

}
function getContentFromFile(webview: vscode.Webview, context: vscode.ExtensionContext): string {

  const page = vscode.Uri.joinPath(context.extensionUri, "..", "webview", "css", "page.css");
  const bundle = vscode.Uri.joinPath(context.extensionUri, "..", "webview", "resources", "bundle.js");

  const pageUri = webview.asWebviewUri(page);
  const bundleUri = webview.asWebviewUri(bundle);

  let datos = readFileSync(file, { encoding: "utf-8", flag: "r" })
  let { ids, labels, srcId, tgtId } = getArrays(datos);

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
      <script src="${bundleUri}" ids="${ids}", labels="${labels}", srcIds="${srcId}", tgtIds="${tgtId}"></script>
  </body>
  
  </html>`
}

function getArrays(datos: string) {
  let comienzoFlecha = datos.match(EDGES);
  let comienzoNodo = datos.match(NODES);

  if (comienzoNodo!.index < comienzoFlecha!.index) {
    nodos = datos.slice(comienzoNodo.index, comienzoFlecha.index - 1)
    flechas = datos.slice(comienzoFlecha.index)
  }
  else {
    flechas = datos.slice(comienzoFlecha.index, comienzoNodo.index - 1)
    nodos = datos.slice(comienzoNodo.index)
  }
  var elementosNodos = nodos.split(elementos);
  var elementosFlechas = flechas.split(elementos);
  var ids = getsIds(elementosNodos)
  var labels = getsLabels(elementosNodos)
  let { srcId, tgtId } = getsRelaciones(elementosFlechas)

  return { ids, labels, srcId, tgtId }
}

function getsIds(elementosNodos: any[]) {
  let ids: any[] = []
  let i = 0;
  elementosNodos.forEach(element => {
    ids[i] = element.match(/\d+/)[0];
    i++;
  });

  return ids;
}

function getsLabels(elementosNodos: any[]) {
  var labels: any[] = []
  var i = 0;
  elementosNodos.forEach(element => {
    var startNumber = element.lastIndexOf(":");
    var endNumber = element.search("\"\n", startNumber)
    var elemntoEntreComillas = element.slice(startNumber, endNumber).trim();
    labels[i] = elemntoEntreComillas.slice(elemntoEntreComillas.indexOf("\"") + 1, elemntoEntreComillas.length);
    i++;
  });

  return labels;
}

function getsRelaciones(elementosFlechas: any[]) {
  var srcId: any[] = []
  var tgtId: any[] = []
  var i = 0;
  elementosFlechas.forEach(element => {
    srcId[i] = element.match(/\d+/)[0];
    tgtId[i] = element.match(/\d+\n/)[0].slice(0, element.match(/\d+\n/)[0].length - 1)
    i++;
  });

  return { srcId, tgtId }
}

function checkRightFolder(directory: string) {
  return (directory != ".git" && directory != ".vscode" && directory != "node_modules" && directory != "lib")
}

function checkRightFile(file: string) {
  return (file != "yarn.lock" && file != "package-lock.json")
}

function leerDirectorios(estructura: any, idGlobal: number, directorios: any[]) {
  directorios.forEach(function (dir) {
    let directoriosLocales: any = []

    console.log("dir:" + dir["path"])
    vscode.workspace.fs.readDirectory(vscode.Uri.parse(dir["path"]))
      .then(function (files) {
        files.forEach(file => {
          let obj: any = {}
          if (file[1] == 2 && checkRightFolder(file[0])) {
            obj.path = dir["path"] + "/" + file[0]
            obj.id = idGlobal
            console.log("Path"+obj.path)
            directoriosLocales.push(obj)
            estructura.nodes.push({ id: idGlobal, label: file[0] })
            estructura.edges.push({ srcId: dir["id"], tgtid: idGlobal })

            idGlobal++
          }
          else if (file[1] == 1 && checkRightFile(file[0])) {
            console.log(dir["path"]+ "/" + file[0])
            estructura.nodes.push({ id: idGlobal, label: file[0] })
            estructura.edges.push({ srcId: dir["id"], tgt: idGlobal })
            idGlobal++
          }
        })
        if (directoriosLocales.length != 0) {
          estructura = leerDirectorios(estructura, idGlobal, directoriosLocales)
        }
      })

  })
  return estructura
}