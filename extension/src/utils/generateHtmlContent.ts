import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export function getContentFromFile(webview: vscode.Webview, context: vscode.ExtensionContext, file: string): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let datos = readFileSync(file, { encoding: "utf-8", flag: "r" })

    let objetoJson=JSON.parse(datos)

    let srcIds:string[]=[];
    let tgtIds:string[]=[];
    let ids: string[]=[];
    let labels: string[]=[];

    objetoJson.nodes.forEach((element: {
        id: string; label: string; 
}) => {
        ids.push(element.id);
        labels.push(element.label);
    });

    objetoJson.edges.forEach((element: {
        tgtId: string; srcId: string; 
}) => {
        srcIds.push(element.srcId);
        tgtIds.push(element.tgtId);
    });

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Diagrama del archivo json"</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="${pageUri}">
    </head>
    
    <body>
        <div class="container">
            <div class="row" id="sprotty-app" data-app="class-diagram">
                <div class="col-md-10">
                    <h1>Diagrama del archivo: "${file}"</h1>
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
        <script src="${bundleUri}" ids="${ids}", labels="${labels}", srcIds="${srcIds}", tgtIds="${tgtIds}", opcion=1></script>
    </body>
    
    </html>`
}

export function getContentFromArray(webview: vscode.Webview, context: vscode.ExtensionContext, estructura: any): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let ids: string[] = []
    let labels: string[] = []
    let srcId: string[] = []
    let tgtId: string[] = []
    let i = 0;

    for (let value of estructura.nodes) {
        ids[i] = value["id"]
        labels[i] = value["label"]
        i++
    }

    i = 0;
    for (let value of estructura.edges) {
        srcId[i] = value["srcId"]
        tgtId[i] = value["tgtId"]
        i++
    }

    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Diagrama del Espacio de Trabajo</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="${pageUri}">
    </head>
    
    <body>
        <div class="container">
            <div class="row" id="sprotty-app" data-app="class-diagram">
                <div class="col-md-10">
                    <h1>Diagrama del Espacio de Trabajo</h1>
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
        <script src="${bundleUri}" ids="${ids}", labels="${labels}", srcIds="${srcId}", tgtIds="${tgtId}", opcion=2></script>
    </body>
    
    </html>`
}

export function getDependenciesFromFile(webview: vscode.Webview, context: vscode.ExtensionContext, file: string): string {

    let { pageUri, bundleUri } = getUris(context, webview)

    let datos = readFileSync(file, { encoding: "utf-8", flag: "r" })
    let { elements, files } = getDependencies(datos, file);

    let ids: number[] = []
    let labels: String[] = []
    let srcId: number[] = []
    let tgtId: number[] = []
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
            ids[idActual] = idActual
            labels[idActual] = e
            srcId[j] = idSource
            tgtId[j] = idActual
            idActual++
            j++
        }

        idSource++
    }

 
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Diagrama de dependencias de un archivo</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/balloon-css/0.5.0/balloon.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="${pageUri}">
    </head>
    
    <body>
        <div class="container">
            <div class="row" id="sprotty-app" data-app="class-diagram">
                <div class="col-md-10">
                    <h1>Diagrama de dependencias del archivo: "${file}"</h1>
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
        <script src="${bundleUri}" ids="${ids}", labels="${labels}", srcIds="${srcId}", tgtIds="${tgtId}", opcion=3></script>
    </body>
    
    </html>`
}

function getUris(context: vscode.ExtensionContext, webview: vscode.Webview) {

    const page = vscode.Uri.joinPath(context.extensionUri, "media", "page.css");
    const bundle = vscode.Uri.joinPath(context.extensionUri, "media", "bundle.js");

    const pageUri = webview.asWebviewUri(page);
    const bundleUri = webview.asWebviewUri(bundle);

    return { pageUri, bundleUri }
}

function getDependencies(datos: string, file: string): { elements: any, files: any } {


    let directorio = file.slice(0, file.lastIndexOf("/"))
    //Regex para conseguir los imports de cada 
    var imports = datos.matchAll(/import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g)
    var elements = []
    var files = []
    var j = 0

    for (let entry of imports) {
        //Si son de ruta relativa
        if (entry[0].match(/[\.|\.+]\//)) {
            //Comprobar si tienen llaves
            var inicio = entry[0].indexOf("{")
            var salida = entry[0].indexOf("}")
            //Comprobar si tienen la palabra from
            var sep = entry[0].split("from")
            var elemento = sep[0].slice(inicio + 1, salida).trim()

            if (!elemento.includes("*")) {
                elements[j] = elemento

                //Quitar la plabara import si se encuentra en la etiqueta
                if (elements[j].includes("import"))
                    elements[j] = elements[j].replace("import", "")
                j++
            }

            var filePath
            
            if (sep.length == 1) {

                if (sep[0].match("'")) {
                    filePath = sep[0].slice(sep[0].indexOf("'") + 1, sep[0].lastIndexOf("'"))
                }
                else {
                    filePath = sep[0].slice(sep[0].indexOf("\"") + 1, sep[0].lastIndexOf("\""))
                }

            }
            else {

                if (sep[1].match("'")) {
                    filePath = sep[1].slice(sep[1].indexOf("'") + 1, sep[1].lastIndexOf("'"))
                }
                else {
                    filePath = sep[1].slice(sep[1].indexOf("\"") + 1, sep[1].lastIndexOf("\""))
                }

            }

            files.push(resolve(directorio, filePath))

        }
    }
    return { elements, files }
}

