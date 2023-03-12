/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';

import { RenderingContext, RectangularNodeView, SNode, IViewArgs } from 'sprotty';
import { VNode } from "snabbdom";
import { injectable } from 'inversify';

@injectable()
export class NodeView extends RectangularNodeView {
    override render(node: Readonly<SNode>, context: RenderingContext, args?: IViewArgs): VNode | undefined {
        if (!this.isVisible(node, context)) {
            return undefined;
        }
        return <g>
            <rect class-sprotty-node={true}
                  class-node-nodo={node.type === 'node:nodo'}
                  class-node-hoja={node.type === 'node:hoja'}
                  class-mouseover={node.hoverFeedback} class-selected={node.selected}
                  x="0" y="0" width={Math.max(node.size.width, 0)} height={Math.max(node.size.height, 0)}></rect>
            {context.renderChildren(node)}
        </g>;
    }
}
