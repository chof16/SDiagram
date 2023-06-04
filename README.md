<!---Title-->
<h1 align="center">SDiagram</h1>

<!---Description-->
<center>
<p>
 Open-source visualization tool with <a href="https://github.com/eclipse-sprotty/sprotty">Sprotty</a>, for VS Code.
</p>
</center>

<!-- Main Features -->
**Main features:**

- **Generation of a diagram from JSON file**. Choosing a JSON file, it creates a diagram.

- **Generation of the diagram from workspace**. The objective is to show the structure of the active folder at the workspace.

- **Generation of the diagram of local dependencies of a file** By selecting a file from the workspace, it shows a diagram with the dependencies file dependencies, those files which belongs to the project.

- **Open a file from the diagram**. By selecting a node of the diagram, the extension allows opening the file.

<br />

<!--Usage-->
## Usage
First, download and install the extension from the VS Code Marketplace.

After installation, the extension is enabled automatically.

**Generation of a diagram from JSON file**
To create it, the user writes on the command palette (`Ctrl+Shift+P`) `Create Diagram`. It opens a dialog box, where the user must choose a `.json` file. The file has to contain the following structure:

```json
{
    "nodes": [
        {
            "id":  1,
            "label": "Class1"
        },
        {
            "id": 2,
            "label": "Class2"
        },
        {
            "id": 3,
            "label": "Class3"
        },
        {
            "id": 4,
            "label": "Class4"
        } 
    ],
    "edges": [
        {
            "srcId": 1,
            "tgtId": 2
        },
        {
            "srcId": 2,
            "tgtId": 4
        }
      ]
 }
```

The file must contain only the attribute nodes and edges. Nodes contains an array with fields called ids and labels, while edges has an array with fields called srcId and tgtId.

**Generation of the diagram from workspace**

If a folder is active on the workspace, through the command palette the user has to write `Generate Diagram of Workspace Project`, and the extension creates it  automatically.

**Generation of the diagram of local dependencies of a file**

Through the command `Generate Diagram Dependencies from a File`, the user selects a file that belongs to the project, showing its dependencies with other files inside the same project.

<!-- Build -->
## Build

**Prerequisites**

- [Node.js](https://nodejs.org/en/)
- [VS Code](https://code.visualstudio.com/)
- [yarn](https://yarnpkg.com/)

Next, download or clone the repository and in the root folder execute the following commands:

```bash
    npm run build
    cd extension 
    npm run build
    cd ../webview
    npm run build
```

After building the project, the extension can be run in VS Code by pressing <kbd>F5</kbd> or selecting `Run ➜ Start Debugging` from the menu.
