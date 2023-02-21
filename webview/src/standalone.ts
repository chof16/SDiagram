import createContainer from "./di.config";
import { TYPES } from 'sprotty';
import { ClassDiagramModelSource } from "./model-source";



export  function runClassDiagram(): void {

    const container = createContainer('sprotty');
    let ids=document.currentScript.getAttribute("ids").split(",")
    let labels=document.currentScript.getAttribute("labels").split(",")
    let srcId=document.currentScript.getAttribute("srcIds").split(",")
    let tgtId=document.currentScript.getAttribute("tgtIds").split(",")

    console.log(ids)
    console.log(labels)
    console.log(srcId)
    console.log(tgtId)

    const modelSource = container.get<ClassDiagramModelSource>(TYPES.ModelSource);
    modelSource.updateModel();





modelSource.modifyGraph(ids,labels,srcId,tgtId);
    modelSource.updateModel();
}

export function createDiagram(): void{

}
