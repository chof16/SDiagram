/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/generateHtmlContent.ts":
/*!******************************************!*\
  !*** ./src/utils/generateHtmlContent.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getContentFromArray": () => (/* binding */ getContentFromArray),
/* harmony export */   "getContentFromFile": () => (/* binding */ getContentFromFile),
/* harmony export */   "getDependenciesFromFile": () => (/* binding */ getDependenciesFromFile)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);



function getContentFromFile(webview, context, file) {
    let { pageUri, bundleUri } = getUris(context, webview);
    let datos = (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(file, { encoding: "utf-8", flag: "r" });
    let objetoJson = JSON.parse(datos);
    let srcIds = [];
    let tgtIds = [];
    let ids = [];
    let labels = [];
    objetoJson.nodes.forEach((element) => {
        ids.push(element.id);
        labels.push(element.label);
    });
    objetoJson.edges.forEach((element) => {
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
    
    </html>`;
}
function getContentFromArray(webview, context, estructura) {
    let { pageUri, bundleUri } = getUris(context, webview);
    let ids = [];
    let labels = [];
    let srcId = [];
    let tgtId = [];
    let i = 0;
    for (let value of estructura.nodes) {
        ids[i] = value["id"];
        labels[i] = value["label"];
        i++;
    }
    i = 0;
    for (let value of estructura.edges) {
        srcId[i] = value["srcId"];
        tgtId[i] = value["tgtId"];
        i++;
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
    
    </html>`;
}
function getDependenciesFromFile(webview, context, file) {
    let { pageUri, bundleUri } = getUris(context, webview);
    let datos = (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(file, { encoding: "utf-8", flag: "r" });
    let { elements, files } = getDependencies(datos, file);
    let ids = [];
    let labels = [];
    let srcId = [];
    let tgtId = [];
    let idActual = 1;
    let idSource = 1;
    let j = 0;
    ids[0] = 0;
    labels[0] = file;
    for (let entry of files) {
        ids[idActual] = idActual;
        labels[idActual] = entry;
        srcId[j] = 0;
        tgtId[j] = idActual;
        j++;
        idActual++;
    }
    for (let entry of elements) {
        let el = entry.split(",");
        for (let e of el) {
            ids[idActual] = idActual;
            labels[idActual] = e;
            srcId[j] = idSource;
            tgtId[j] = idActual;
            idActual++;
            j++;
        }
        idSource++;
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
    
    </html>`;
}
function getUris(context, webview) {
    const page = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(context.extensionUri, "media", "page.css");
    const bundle = vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.joinPath(context.extensionUri, "media", "bundle.js");
    const pageUri = webview.asWebviewUri(page);
    const bundleUri = webview.asWebviewUri(bundle);
    return { pageUri, bundleUri };
}
function getDependencies(datos, file) {
    let directorio = file.slice(0, file.lastIndexOf("/"));
    //Regex para conseguir los imports de cada 
    var imports = datos.matchAll(/import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g);
    var elements = [];
    var files = [];
    var j = 0;
    for (let entry of imports) {
        //Si son de ruta relativa
        if (entry[0].match(/[\.|\.+]\//)) {
            //Comprobar si tienen llaves
            var inicio = entry[0].indexOf("{");
            var salida = entry[0].indexOf("}");
            //Comprobar si tienen la palabra from
            var sep = entry[0].split("from");
            var elemento = sep[0].slice(inicio + 1, salida).trim();
            if (!elemento.includes("*")) {
                elements[j] = elemento;
                //Quitar la plabara import si se encuentra en la etiqueta
                if (elements[j].includes("import"))
                    elements[j] = elements[j].replace("import", "");
                j++;
            }
            var filePath;
            if (sep.length == 1) {
                if (sep[0].match("'")) {
                    filePath = sep[0].slice(sep[0].indexOf("'") + 1, sep[0].lastIndexOf("'"));
                }
                else {
                    filePath = sep[0].slice(sep[0].indexOf("\"") + 1, sep[0].lastIndexOf("\""));
                }
            }
            else {
                if (sep[1].match("'")) {
                    filePath = sep[1].slice(sep[1].indexOf("'") + 1, sep[1].lastIndexOf("'"));
                }
                else {
                    filePath = sep[1].slice(sep[1].indexOf("\"") + 1, sep[1].lastIndexOf("\""));
                }
            }
            files.push((0,path__WEBPACK_IMPORTED_MODULE_2__.resolve)(directorio, filePath));
        }
    }
    return { elements, files };
}


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activate": () => (/* binding */ activate),
/* harmony export */   "deactivate": () => (/* binding */ deactivate)
/* harmony export */ });
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vscode */ "vscode");
/* harmony import */ var vscode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vscode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_generateHtmlContent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/generateHtmlContent */ "./src/utils/generateHtmlContent.ts");
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below





// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
let file;
var idGlobal;
function activate(context) {
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand('diagram.open', () => {
        const options = {
            title: "Selecciona un archivo json",
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: true,
            canSelectFolders: false
        };
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                file = fileUri[0].fsPath;
                if (!file.includes(".json")) {
                    vscode__WEBPACK_IMPORTED_MODULE_0__.window.showErrorMessage('File must be .json');
                    return;
                }
                const panel = vscode__WEBPACK_IMPORTED_MODULE_0__.window.createWebviewPanel('Diagrama', 'Diagrama Json', vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.One, {
                    enableScripts: true,
                    localResourceRoots: [vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.file(path__WEBPACK_IMPORTED_MODULE_1__.join(context.extensionPath, "media"))]
                });
                // And set its HTML content
                panel.webview.html = (0,_utils_generateHtmlContent__WEBPACK_IMPORTED_MODULE_3__.getContentFromFile)(panel.webview, context, file);
            }
        });
        ;
    }));
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand('diagrama.workspace', () => {
        const panel = vscode__WEBPACK_IMPORTED_MODULE_0__.window.createWebviewPanel('Diagrama', 'Diagrama Workspace', vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.file(path__WEBPACK_IMPORTED_MODULE_1__.join(context.extensionPath, "media"))]
        });
        let estructura = {
            nodes: [],
            edges: []
        };
        idGlobal = 1;
        let directorios = [];
        let uriWorkSpace = vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders[0].uri;
        //Archivos y directorios del workspace raiz
        let files = (0,fs__WEBPACK_IMPORTED_MODULE_2__.readdirSync)(uriWorkSpace.fsPath);
        estructura.nodes.push({ id: 0, label: uriWorkSpace.fsPath });
        files.forEach(function (file) {
            let obj = {};
            obj.path = (uriWorkSpace.fsPath + "/" + file);
            obj.id = idGlobal;
            if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.lstatSync)(obj.path).isDirectory() && checkRightFolder(file)) {
                directorios.push(obj);
                estructura.nodes.push({ id: idGlobal, label: file });
                estructura.edges.push({ srcId: 0, tgtId: idGlobal });
                idGlobal++;
            }
            else if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.lstatSync)(obj.path).isFile() && checkRightFile(file)) {
                estructura.nodes.push({ id: idGlobal, label: file });
                estructura.edges.push({ srcId: 0, tgtId: idGlobal });
                idGlobal++;
            }
        });
        if (directorios.length != 0) {
            estructura = leerDirectorios(estructura, directorios);
        }
        // And set its HTML content
        panel.webview.html = (0,_utils_generateHtmlContent__WEBPACK_IMPORTED_MODULE_3__.getContentFromArray)(panel.webview, context, estructura);
        //Si recibe un mensaje de la webview
        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'abrirArchivo':
                    abrirArchivo(message.text);
            }
        });
    }));
    context.subscriptions.push(vscode__WEBPACK_IMPORTED_MODULE_0__.commands.registerCommand('diagram.dependencies', () => {
        const options = {
            title: "Selecciona un archivo .ts o .js",
            canSelectMany: false,
            openLabel: 'Select',
            canSelectFiles: true,
            canSelectFolders: false
        };
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showOpenDialog(options).then(fileUri => {
            if (fileUri && fileUri[0]) {
                file = fileUri[0].fsPath;
                if (!file.includes(vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders[0].uri.path) || (!file.includes(".ts") && !file.includes(".js"))) {
                    vscode__WEBPACK_IMPORTED_MODULE_0__.window.showErrorMessage('File must be .js or .ts and  must be located on active workspace');
                    return;
                }
                const panel = vscode__WEBPACK_IMPORTED_MODULE_0__.window.createWebviewPanel('Diagrama', 'Diagrama Dependencias', vscode__WEBPACK_IMPORTED_MODULE_0__.ViewColumn.One, {
                    enableScripts: true,
                    localResourceRoots: [vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.file(path__WEBPACK_IMPORTED_MODULE_1__.join(context.extensionPath, "media"))]
                });
                // And set its HTML content
                panel.webview.html = (0,_utils_generateHtmlContent__WEBPACK_IMPORTED_MODULE_3__.getDependenciesFromFile)(panel.webview, context, file);
                //Si recibe un mensaje de la webview
                panel.webview.onDidReceiveMessage(message => {
                    switch (message.command) {
                        case 'abrirArchivo':
                            abrirArchivo(message.text);
                    }
                });
            }
        });
        ;
    }));
}
// This method is called when your extension is deactivated
async function deactivate() {
}
function checkRightFolder(directory) {
    return (directory != ".git" && directory != ".vscode" && directory != "node_modules" && directory != "lib");
}
function checkRightFile(file) {
    return (file != "yarn.lock" && file != "package-lock.json");
}
function leerDirectorios(estructura, directorios) {
    directorios.forEach(function (dir) {
        let directoriosLocales = [];
        let files = (0,fs__WEBPACK_IMPORTED_MODULE_2__.readdirSync)(dir["path"]);
        files.forEach(function (file) {
            let obj = {};
            obj.path = (dir["path"] + "/" + file);
            obj.id = idGlobal;
            if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.lstatSync)(obj.path).isDirectory() && checkRightFolder(file)) {
                directoriosLocales.push(obj);
                estructura.nodes.push({ id: idGlobal, label: file });
                estructura.edges.push({ srcId: dir["id"], tgtId: idGlobal });
                idGlobal++;
            }
            else if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.lstatSync)(obj.path).isFile() && checkRightFile(file)) {
                estructura.nodes.push({ id: idGlobal, label: file });
                estructura.edges.push({ srcId: dir["id"], tgtId: idGlobal });
                idGlobal++;
            }
        });
        if (directoriosLocales.length != 0) {
            estructura = leerDirectorios(estructura, directoriosLocales);
        }
    });
    return estructura;
}
function abrirArchivo(archivo) {
    let ruta = (0,path__WEBPACK_IMPORTED_MODULE_1__.resolve)(vscode__WEBPACK_IMPORTED_MODULE_0__.workspace.workspaceFolders[0].name, archivo);
    if (!ruta.includes(".ts") && !ruta.includes(".js") && !ruta.match(/\.+/)) {
        let rutaType = ruta + ".ts";
        let rutaJavaScript = ruta + ".js";
        if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(rutaJavaScript))
            vscode__WEBPACK_IMPORTED_MODULE_0__.window.showTextDocument(vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse(rutaJavaScript), { preview: false });
        else
            vscode__WEBPACK_IMPORTED_MODULE_0__.window.showTextDocument(vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse(rutaType), { preview: false });
    }
    else
        vscode__WEBPACK_IMPORTED_MODULE_0__.window.showTextDocument(vscode__WEBPACK_IMPORTED_MODULE_0__.Uri.parse(ruta), { preview: false });
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=main.js.map