import { injectable } from 'inversify';
import { ActionHandlerRegistry, LocalModelSource} from 'sprotty';
import {
    SGraph, SLabel, SNode,SEdge,SCompartment, Action,SelectAction
} from 'sprotty-protocol';
import { enviarMensaje } from './standalone';

@injectable()
export class ClassDiagramModelSource extends LocalModelSource {

    expansionState: { [key: string]: boolean };
    graph: SGraph;

    constructor() {
        super();
        this.currentRoot = this.initializeModel();
        this.graph
    }

    override initialize(registry: ActionHandlerRegistry): void {
        super.initialize(registry);
        registry.register(SelectAction.KIND,this)
    }

    override handle(action: Action): void {
        switch (action.kind){
            case SelectAction.KIND:
            this.handleSelection(action as SelectAction)
            break;
        }
    }

    protected handleSelection(action:SelectAction){
        let id =action.selectedElementsIDs;
        let nodo=this.graph.children.filter(h => h.id == id[0])
        let comp=nodo[0].children[0]
        let label=comp.children[0]
        enviarMensaje(label.text);
    }

    initializeModel(): SGraph {
        const localGraph: SGraph = {
            id: 'graph',
            type: 'graph',
            children: [],
            layoutOptions: {
                hGap: 5,
                hAlign: 'left',
                paddingLeft: 7,
                paddingRight: 7,
                paddingTop: 7,
                paddingBottom: 7
            }
        };
        this.graph=localGraph
        return localGraph;
    }

    modifyGraph(ids: any[],labels: any[],srcId: any[],tgtId: any[],source:any[]) {
        let i=0;
        ids.forEach(element => {
            let node:SNode ={
                id: element,
                type: deducirTipo(element,source),
                layout: 'vbox',
                children: [
                    <SCompartment>{
                    id: 'node'+i+'_header',
                    type: 'comp:header',
                    layout: 'hbox',
                        children :[
                            <SLabel>{
                                id:"node"+i+"header",
                                type: 'label:heading',
                                text: labels[i]
                            }
                        ]
                    },
                ]
            };
            this.graph.children.push(node);
            i++;
        });
        i=0;
        srcId.forEach(element =>{
            let edge:SEdge={
                id:"edge"+i,
                type:"edge:straight",
                sourceId :element,
                targetId:tgtId[i]
            }
            this.graph.children.push(edge);
            i++;
        })

    }
}

function deducirTipo(element: any, source: any[]): string {
    if(source.includes(element))
        return "node:nodo"

    return "node:hoja"
}   
