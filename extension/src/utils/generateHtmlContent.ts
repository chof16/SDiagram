import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import * as examples from './arraysJsonFiles';
import { resolve } from 'path';

export function getContentFromFile(webview: vscode.Webview, context: vscode.ExtensionContext, file: string): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let datos = readFileSync(file, { encoding: "utf-8", flag: "r" })
    let { ids, labels, srcId, tgtId } = examples.getArrays(datos);

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

export function getContentFromArray(webview: vscode.Webview, context: vscode.ExtensionContext, estructura: any): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let ids: any[] = []
    let labels: any[] = []
    let srcId: any[] = []
    let tgtId: any[] = []
    let i = 0;

    for (let value of estructura.nodes) {
        ids[i] = value["id"]
        labels[i] = value["label"]
        i++
    }
    i = 0;
    for (let value of estructura.edges) {
        srcId[i] = value["srcId"]
        tgtId[i] = value["tgtid"]
        i++
    }

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

export function getDependenciesFromFile(webview: vscode.Webview, context: vscode.ExtensionContext, file: string): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let datos = readFileSync(file, { encoding: "utf-8", flag: "r" })
    let { elements, files } = getDependencies(datos, file);

    let ids: any[] = []
    let labels: any[] = []
    let srcId: any[] = []
    let tgtId: any[] = []
    let idActual = 1;
    let idSource = 1;
    let j = 0
    ids[0] = 0;
    labels[0] = file
    for (let entry of files) {
        ids[idActual] = idActual;
        labels[idActual] = entry
        srcId[j] = 0
        tgtId[j] = idActual
        j++
        idActual++
    }
    for (let entry of elements) {
        let el = entry.split(",")
        for (let e of el) {
            console.log(e)
            ids[idActual] = idActual
            labels[idActual] = e
            srcId[j] = idSource
            tgtId[j] = idActual
            idActual++
            j++
        }
        idSource++
    }

    console.log(ids)
    console.log(labels)
    console.log(srcId)
    console.log(tgtId)


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

function getUris(context: vscode.ExtensionContext, webview: vscode.Webview) {
    const page = vscode.Uri.joinPath(context.extensionUri, "..", "webview", "css", "page.css");
    const bundle = vscode.Uri.joinPath(context.extensionUri, "..", "webview", "resources", "bundle.js");

    const pageUri = webview.asWebviewUri(page);
    const bundleUri = webview.asWebviewUri(bundle);

    return { pageUri, bundleUri }
}

function getDependencies(datos: string, file: string): { elements: any, files: any } {
    let directorio = file.slice(0, file.lastIndexOf("/"))
    var imports = datos.matchAll(/import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g)
    var elements = []
    var files = []
    var i = 0
    for (let entry of imports) {
        if (entry[0].match(/[\.|\.+]\//)) {
            var inicio = entry[0].indexOf("{")
            var salida = entry[0].indexOf("}")
            var sep = entry[0].split("from")
            elements[i] = sep[0].slice(inicio + 1, salida).trim()

            if (elements[i].includes("*"))
                elements[i] = "*";

            else if (elements[i].includes("import"))
                elements[i] = elements[i].replace("import", "")
                
            var filePath
            if (sep[1].match("'")) {
                filePath = sep[1].slice(sep[1].indexOf("'") + 1, sep[1].lastIndexOf("'"))
            }
            else {
                filePath = sep[1].slice(sep[1].indexOf("\"") + 1, sep[1].lastIndexOf("\""))
            }
            files[i] = resolve(directorio, filePath)
            i++
        }
    }
    return { elements, files }
}

