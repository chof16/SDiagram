import { injectable } from 'inversify';
import { ActionHandlerRegistry, LocalModelSource, Expandable } from 'sprotty';
import {
    Action, CollapseExpandAction, CollapseExpandAllAction, SCompartment, SEdge, SGraph, SLabel,
    SModelElement, SModelIndex, SModelRoot, SNode
} from 'sprotty-protocol';

@injectable()
export class ClassDiagramModelSource extends LocalModelSource {

    expansionState: {[key: string]: boolean};

    constructor() {
        super();
        this.currentRoot = this.initializeModel();
    }

    override initialize(registry: ActionHandlerRegistry): void {
        super.initialize(registry);
        registry.register(CollapseExpandAction.KIND, this);
        registry.register(CollapseExpandAllAction.KIND, this);
    }

    override handle(action: Action) {
        switch (action.kind) {
            case CollapseExpandAction.KIND:
                this.handleCollapseExpandAction(action as CollapseExpandAction);
                break;
            case CollapseExpandAllAction.KIND:
                this.handleCollapseExpandAllAction(action as CollapseExpandAllAction);
                break;
            default: super.handle(action);
        }
    }

    protected handleCollapseExpandAction(action: CollapseExpandAction): void {
        action.expandIds.forEach(id => this.expansionState[id] = true );
        action.collapseIds.forEach(id => this.expansionState[id] = false );
        this.applyExpansionState();
        this.updateModel();
    }

    protected handleCollapseExpandAllAction(action: CollapseExpandAllAction): void {
        // tslint:disable-next-line:forin
        for (const id in this.expansionState)
            this.expansionState[id] === action.expand;
        this.applyExpansionState();
        this.updateModel();
    }

    protected applyExpansionState() {
        const index = new SModelIndex();
        index.add(this.currentRoot);
        // tslint:disable-next-line:forin
        for (const id in this.expansionState) {
            const element = index.getById(id);
            if (element && element.children) {
                const expanded = this.expansionState[id];
                (element as any).expanded = expanded;
                element.children = element.children.filter(child => child.type !== 'comp:comp');
                if (expanded)
                    this.addExpandedChildren(element);
            }
        }
    }

    protected addExpandedChildren(element: SModelElement) {
        if (!element.children)
            return;
        switch (element.id) {
            case 'node0':
                element.children.push(<SCompartment> {
                    id: 'node0_attrs',
                    type: 'comp:comp',
                    layout: 'vbox',
                    children: [
                        <SLabel> {
                            id: 'node0_op2',
                            type: 'label:text',
                            text: 'name: string'
                        }
                    ],
                });
                element.children.push(<SModelElement> {
                    id: 'node0_ops',
                    type: 'comp:comp',
                    layout: 'vbox',
                    children: [
                        <SLabel> {
                            id: 'node0_op0',
                            type: 'label:text',
                            text: '+ foo(): integer'
                        }, {
                            id: 'node0_op1',
                            type: 'label:text',
                            text: '# bar(x: string): void'
                        }
                    ],
                });
                break;
            case 'node1':
                element.children.push(<SCompartment> {
                    id: 'node1_attrs',
                    type: 'comp:comp',
                    layout: 'vbox',
                    children: [
                        <SLabel> {
                            id: 'node1_op2',
                            type: 'label:text',
                            text: 'name: string'
                        }
                    ],
                });
                element.children.push(<SCompartment> {
                    id: 'node1_ops',
                    type: 'comp:comp',
                    layout: 'vbox',
                    children: [
                        <SLabel> {
                            id: 'node1_op0',
                            type: 'label:text',
                            text: '+ foo(): Foo'
                        }
                    ]
                });
                break;
        }
    }

    initializeModel(): SModelRoot {
        const node0: SNode & Expandable = {
            id: 'node0',
            type: 'node:class',
            expanded: false,
            position: {
                x: 100,
                y: 100
            },
            layout: 'vbox',
            children: [
                <SCompartment>{
                    id: 'node0_header',
                    type: 'comp:header',
                    layout: 'hbox',
                    children: [
                        <SLabel>{
                            id: 'node0_classname',
                            type: 'label:heading',
                            text: 'Foo'
                        },
                        {
                            id: 'node0_expand',
                            type: 'button:expand'
                        }
                    ]
                }
            ]
        };
        const node1: SNode & Expandable = {
            id: 'node1',
            type: 'node:class',
            expanded: false,
            position: {
                x: 300,
                y: 300
            },
            layout: 'vbox',
            children: [
                <SCompartment>{
                    id: 'node1_header',
                    type: 'comp:header',
                    layout: 'hbox',
                    children: [
                        <SLabel>{
                            id: 'node1_classname',
                            type: 'label:heading',
                            text: 'Bar'
                        },
                        {
                            id: 'node1_expand',
                            type: 'button:expand'
                        }
                    ]
                }
            ]
        };
        const edge0 = {
            id: 'edge0',
            type: 'edge:straight',
            sourceId: node0.id,
            targetId: node1.id,
            children: [
                <SLabel> {
                    id: 'edge0_label_on',
                    type: 'label:text',
                    text: 'on',
                    edgePlacement:  {
                        position: 0.5,
                        side: 'on',
                        rotate: false
                    }
                },
                <SLabel> {
                    id: 'edge0_label_top',
                    type: 'label:text',
                    text: 'top',
                    edgePlacement:  {
                        position: 0.3,
                        side: 'top',
                        rotate: false
                    }
                },
                <SLabel> {
                    id: 'edge0_label_bottom',
                    type: 'label:text',
                    text: 'bottom',
                    edgePlacement:  {
                        position: 0.3,
                        side: 'bottom',
                        rotate: false
                    }
                },
                <SLabel> {
                    id: 'edge0_label_left',
                    type: 'label:text',
                    text: 'left',
                    edgePlacement:  {
                        position: 0.7,
                        side: 'left',
                        rotate: false
                    }
                },
                <SLabel> {
                    id: 'edge0_label_right',
                    type: 'label:text',
                    text: 'right',
                    edgePlacement:  {
                        position: 0.7,
                        side: 'right',
                        rotate: false
                    }
                }
            ]
        } as SEdge;
        const graph: SGraph = {
            id: 'graph',
            type: 'graph',
            children: [node0, node1, edge0  ],
            layoutOptions: {
                hGap: 5,
                hAlign: 'left',
                paddingLeft: 7,
                paddingRight: 7,
                paddingTop: 7,
                paddingBottom: 7
            }
        };
        this.expansionState = {
            node0: false,
            node1: false,
        };
        return graph;
    }
}