// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path'
import { readdirSync, lstatSync, existsSync } from 'fs';
import { getContentFromArray, getContentFromFile, 
  getDependenciesFromFile } from './utils/generateHtmlContent';
import { resolve } from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

let file: string;
var idGlobal: number;

export function activate(context: vscode.ExtensionContext) {

  console.log("extension activada");

  context.subscriptions.push(
    vscode.commands.registerCommand('diagram.open', () => {
      const options: vscode.OpenDialogOptions = {
        title: "Selecciona un archivo json",
        canSelectMany: false,
        openLabel: 'Select',
        canSelectFiles: true,
        canSelectFolders: false
      };
      vscode.window.showOpenDialog(options).then(fileUri => {
        if (fileUri && fileUri[0]) {
          file = fileUri[0].fsPath;
          if(!file.includes(".json")){
            vscode.window.showErrorMessage('File must be .json');
            return
          }
          console.log("File:" + file);
          const panel = vscode.window.createWebviewPanel(
            'Diagrama',
            'Diagrama Json',
            vscode.ViewColumn.One,

            {
              enableScripts: true,
              localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "..", "webview",))]
            }
          );
          // And set its HTML content
          panel.webview.html = getContentFromFile(panel.webview, context,file);
        }
      });;
    })
  );


  context.subscriptions.push(
    vscode.commands.registerCommand('diagrama.workspace', () => {
      const panel = vscode.window.createWebviewPanel(
        'Diagrama',
        'Diagrama Workspace',
        vscode.ViewColumn.One,

        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "..", "webview",))]
        }
      );

      let estructura: any = {
        nodes: [],
        edges: []
      }
      idGlobal = 1
      let directorios: any = []
      let uriWorkSpace = vscode.workspace.workspaceFolders[0].uri
      console.log(uriWorkSpace)

      //Archivos y directorios del workspace raiz
      let files = readdirSync(uriWorkSpace.fsPath)
      let obj: any = {}
      obj.path = (uriWorkSpace.fsPath)
      obj.id = 0
      estructura.nodes.push({ id: 0, label: uriWorkSpace.fsPath })

      files.forEach(function (file) {
        let obj: any = {}
        obj.path = (uriWorkSpace.fsPath + "/" + file)
        obj.id = idGlobal
        if (lstatSync(obj.path).isDirectory() && checkRightFolder(file)) {

          directorios.push(obj)

          estructura.nodes.push({ id: idGlobal, label: file })
          estructura.edges.push({ srcId: 0, tgtid: idGlobal })
          idGlobal++
        }
        else if (lstatSync(obj.path).isFile() && checkRightFile(file)) {

          estructura.nodes.push({ id: idGlobal, label: file })
          estructura.edges.push({ srcId: 0, tgtid: idGlobal })
          idGlobal++
        }
      })
      if (directorios.length != 0) {
        estructura = leerDirectorios(estructura, directorios)
      }


      console.log(estructura)
      // And set its HTML content
      panel.webview.html = getContentFromArray(panel.webview, context, estructura);
      panel.webview.onDidReceiveMessage(
        message => {
          switch(message.command){
            case 'abrirArchivo':
              abrirArchivo(message.text)
          }
        }
      )
    }
    )
  )

  context.subscriptions.push(vscode.commands.registerCommand('diagram.dependencies',()=>{
    const options: vscode.OpenDialogOptions = {
      title: "Selecciona un archivo .ts o .js",
      canSelectMany: false,
      openLabel: 'Select',
      canSelectFiles: true,
      canSelectFolders: false
    };
    vscode.window.showOpenDialog(options).then(fileUri => {
      if (fileUri && fileUri[0]) {
        file = fileUri[0].fsPath;
        if(!file.includes(".ts") && !file.includes(".js")){
          vscode.window.showErrorMessage('FIle must be .js or .ts');
          return
        }
        console.log("File:" + file);
        const panel = vscode.window.createWebviewPanel(
          'Diagrama',
          'Diagrama Dependencias',
          vscode.ViewColumn.One,

          {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "..", "webview",))]
          }
        );
        // And set its HTML content
        panel.webview.html = getDependenciesFromFile(panel.webview, context,file);
        panel.webview.onDidReceiveMessage(
          message => {
            switch(message.command){
              case 'abrirArchivo':
                abrirArchivo(message.text)
            }
          }
        )
      }
    });;
  }))

}

// This method is called when your extension is deactivated
export async function deactivate(): Promise<void> {

}

function checkRightFolder(directory: string) {
  return (directory != ".git" && directory != ".vscode" && directory != "node_modules" && directory != "lib")
}

function checkRightFile(file: string) {
  return (file != "yarn.lock" && file != "package-lock.json")
}

function leerDirectorios(estructura: any, directorios: any[]) {
  directorios.forEach(function (dir) {
    let directoriosLocales: any = []

    let files = readdirSync(dir["path"])
    files.forEach(function (file) {
      let obj: any = {}
      obj.path = (dir["path"] + "/" + file)
      obj.id = idGlobal
      if (lstatSync(obj.path).isDirectory() && checkRightFolder(file)) {

        directoriosLocales.push(obj)

        estructura.nodes.push({ id: idGlobal, label: file })
        estructura.edges.push({ srcId: dir["id"], tgtid: idGlobal })
        idGlobal++
      }
      else if (lstatSync(obj.path).isFile() && checkRightFile(file)) {

        estructura.nodes.push({ id: idGlobal, label: file })
        estructura.edges.push({ srcId: dir["id"], tgtid: idGlobal })
        idGlobal++
      }
    })
    if (directoriosLocales.length != 0) {
      estructura = leerDirectorios(estructura, directoriosLocales)
    }

  })
  return estructura
}
function abrirArchivo(archivo: any) {

  let ruta=resolve(vscode.workspace.workspaceFolders[0].name,archivo)
  if(!ruta.includes(".ts") && !ruta.includes(".js") && !ruta.match(/\.+/)){
    let rutaType=ruta+".ts"
    let rutaJavaScript=ruta+".js"
    if(existsSync(rutaJavaScript))
     vscode.window.showTextDocument(vscode.Uri.parse(rutaJavaScript),{preview:false})
    
    else
    vscode.window.showTextDocument(vscode.Uri.parse(rutaType),{preview:false})
  }

  else
  vscode.window.showTextDocument(vscode.Uri.parse(ruta),{preview:false})

}

