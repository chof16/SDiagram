import { injectable, inject } from "inversify";
import {
    TYPES, IModelFactory, IPopupModelProvider
} from 'sprotty';
import { PreRenderedElement, RequestPopupModelAction, SModelElement, SModelRoot } from "sprotty-protocol";
import { ClassNode } from "./model";

@injectable()
export class PopupModelProvider implements IPopupModelProvider {

    @inject(TYPES.IModelFactory) modelFactory: IModelFactory;

    getPopupModel(request: RequestPopupModelAction, element?: SModelElement): SModelRoot | undefined {
        if (element !== undefined && element.type === 'node:class') {
            const node = this.modelFactory.createElement(element) as ClassNode;
            return {
                type: 'html',
                id: 'popup',
                children: [
                    <PreRenderedElement> {
                        type: 'pre-rendered',
                        id: 'popup-title',
                        code: `<div class="sprotty-popup-title"><span class="fa fa-info-circle"/> Class ${node.name}</div>`
                    },
                    <PreRenderedElement> {
                        type: 'pre-rendered',
                        id: 'popup-body',
                        code: '<div class="sprotty-popup-body">But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.</div>'
                    }
                ]
            };
        }
        return undefined;
    }

}