import createContainer from "./di.config";
import { TYPES } from 'sprotty';
import { ClassDiagramModelSource } from "./model-source";

const vscode=acquireVsCodeApi();

export function runClassDiagram(): void {


    let sources:string[]=[]
    let i=0
    const container = createContainer('sprotty');
    let ids = document.currentScript.getAttribute("ids").split(",")
    let labels = document.currentScript.getAttribute("labels").split(",")
    //srcId contiene los directorios en la generacion del workspace 
    //y los archivos donde se encuentran las clases o funciones de dependencia
    let srcId = document.currentScript.getAttribute("srcIds").split(",")
    let tgtId = document.currentScript.getAttribute("tgtIds").split(",")
    let opcion=document.currentScript.getAttribute("opcion")

    for(let entry of srcId){
        if(!sources.includes(entry)){
            sources[i]=entry
            i++
        }
    }

    const modelSource = container.get<ClassDiagramModelSource>(TYPES.ModelSource);
    modelSource.updateModel();

    modelSource.modifyGraph(ids, labels, srcId, tgtId,sources,opcion);
    modelSource.updateModel();
}

export function enviarMensaje(texto:string){
    vscode.postMessage({
        command : "abrirArchivo",
        text:texto
    })
}
