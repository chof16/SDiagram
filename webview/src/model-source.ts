import { injectable } from 'inversify';
import { ActionHandlerRegistry, LocalModelSource} from 'sprotty';
import {
    SGraph, SLabel, SNode,SEdge,SCompartment
} from 'sprotty-protocol';

let graph:SGraph;

@injectable()
export class ClassDiagramModelSource extends LocalModelSource {



    expansionState: { [key: string]: boolean };

    constructor() {
        super();
        this.currentRoot = this.initializeModel();
    }

    override initialize(registry: ActionHandlerRegistry): void {
        super.initialize(registry);
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
        graph=localGraph
        return localGraph;
    }

    modifyGraph(ids: any[],labels: any[],srcId: any[],tgtId: any[]) {
        let i=0;
        ids.forEach(element => {
            let node:SNode ={
                id: element,
                type: "node:class",
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
            graph.children.push(node);
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
            graph.children.push(edge);
            i++;
        })

    }
}

