import createContainer from "./di.config";
import { TYPES } from 'sprotty';
import { ClassDiagramModelSource } from "./model-source";



export function runClassDiagram(): void {

    let sources:string[]=[]
    let i=0
    const container = createContainer('sprotty');
    let ids = document.currentScript.getAttribute("ids").split(",")
    let labels = document.currentScript.getAttribute("labels").split(",")
    //srcId contiene los directorios en la generacion del wprkspace 
    //y los archivos donde se encuentran las clases o funciones de dependencia
    let srcId = document.currentScript.getAttribute("srcIds").split(",")
    let tgtId = document.currentScript.getAttribute("tgtIds").split(",")

    for(let entry of srcId){
        if(!sources.includes(entry)){
            sources[i]=entry
            i++
        }
    }

    console.log(ids)
    console.log(labels)
    console.log(srcId)
    console.log(tgtId)

    const modelSource = container.get<ClassDiagramModelSource>(TYPES.ModelSource);
    modelSource.updateModel();

    modelSource.modifyGraph(ids, labels, srcId, tgtId,sources);
    modelSource.updateModel();
}


