import "reflect-metadata";
import "reflect-metadata";
import {runClassDiagram, createDiagram } from "./src/standalone";


const appDiv = document.getElementById('sprotty-app')
if (appDiv) {
    const appMode = appDiv.getAttribute('data-app');
    if (appMode === 'class-diagram')
        runClassDiagram();
    else if (appMode === 'class-diagram-workspace')
        createDiagram()
    else
        throw new Error('Dunno what to do :-(');
}

