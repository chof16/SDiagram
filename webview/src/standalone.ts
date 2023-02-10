import createContainer from "./di.config";
import { TYPES, LocalModelSource } from 'sprotty';

export default function runClassDiagram() {
    const container = createContainer('sprotty');
    const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
    modelSource.updateModel();
}