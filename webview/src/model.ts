import {
    Expandable, RectangularNode, Nameable, SLabel, WithEditableLabel, isEditableLabel
} from 'sprotty';

export class ClassNode extends RectangularNode implements Expandable, Nameable, WithEditableLabel {
    expanded: boolean = false;

    get editableLabel() {
        const headerComp = this.children.find(element => element.type === 'comp:header');
        if (headerComp) {
            const label = headerComp.children.find(element => element.type === 'label:heading');
            if (label && isEditableLabel(label)) {
                return label;
            }
        }
        return undefined;
    }

    get name() {
        if (this.editableLabel) {
            return this.editableLabel.text;
        }
        return this.id;
    }
}

export class ClassLabel extends SLabel { }
export class PropertyLabel extends SLabel { }
