import { Container, ContainerModule } from "inversify";
import {
    TYPES, configureViewerOptions, SGraphView, SLabelView, SCompartmentView, JumpingPolylineEdgeView,
    ConsoleLogger, LogLevel, loadDefaultModules, HtmlRootView, PreRenderedView, ExpandButtonView,
    SRoutingHandleView, PreRenderedElement, HtmlRoot, SGraph, configureModelElement,
    SCompartment, SEdge, SButton, SRoutingHandle, RevealNamedElementActionProvider,
    CenterGridSnapper, expandFeature, nameFeature, withEditLabelFeature, editLabelFeature,
    RectangularNode, BezierCurveEdgeView, SBezierCreateHandleView, SBezierControlHandleView
} from 'sprotty';
import edgeIntersectionModule from "sprotty/lib/features/edge-intersection/di.config";
import { NodeView} from "./views";
import {PopupModelProvider} from "./popup"
import { ClassDiagramModelSource } from './model-source';
import { ClassNode, ClassLabel, PropertyLabel } from "./model";
import { BezierMouseListener } from 'sprotty/lib/features/routing/bezier-edge-router';

export default (containerId: string) => {

    require("../css/diagram.css");

    const classDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
        bind(TYPES.ModelSource).to(ClassDiagramModelSource).inSingletonScope();
        rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
        rebind(TYPES.LogLevel).toConstantValue(LogLevel.log);
        bind(TYPES.IPopupModelProvider).to(PopupModelProvider);
        bind(TYPES.ICommandPaletteActionProvider).to(RevealNamedElementActionProvider);
        bind(TYPES.ISnapper).to(CenterGridSnapper);
        bind(BezierMouseListener).toSelf().inSingletonScope();
        bind(TYPES.MouseListener).toService(BezierMouseListener);

        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraph, SGraphView);
        configureModelElement(context, 'node:package', RectangularNode, NodeView);
        configureModelElement(context, 'node:class', ClassNode, NodeView, {
            enable: [expandFeature, nameFeature, withEditLabelFeature]
        });
        configureModelElement(context, 'label:heading', ClassLabel, SLabelView, {
            enable: [editLabelFeature]
        });
        configureModelElement(context, 'label:text', PropertyLabel, SLabelView, {
            enable: [editLabelFeature]
        });
        configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView);
        configureModelElement(context, 'comp:header', SCompartment, SCompartmentView);
        configureModelElement(context, 'comp:pkgcontent', SCompartment, SCompartmentView);
        configureModelElement(context, 'edge:straight', SEdge, JumpingPolylineEdgeView);
        configureModelElement(context, 'edge:bezier', SEdge, BezierCurveEdgeView);
        configureModelElement(context, 'html', HtmlRoot, HtmlRootView);
        configureModelElement(context, 'pre-rendered', PreRenderedElement, PreRenderedView);
        configureModelElement(context, 'button:expand', SButton, ExpandButtonView);
        configureModelElement(context, 'routing-point', SRoutingHandle, SRoutingHandleView);
        configureModelElement(context, 'volatile-routing-point', SRoutingHandle, SRoutingHandleView);
        configureModelElement(context, 'bezier-create-routing-point', SRoutingHandle, SBezierCreateHandleView);
        configureModelElement(context, 'bezier-remove-routing-point', SRoutingHandle, SBezierCreateHandleView);
        configureModelElement(context, 'bezier-routing-point', SRoutingHandle, SBezierControlHandleView);


        configureViewerOptions(context, {
            needsClientLayout: true,
            baseDiv: containerId
        });
    });

    const container = new Container();
    loadDefaultModules(container);
    container.load(edgeIntersectionModule);
    container.load(classDiagramModule);
    return container;
};