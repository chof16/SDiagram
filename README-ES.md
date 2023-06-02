<!---Titulo-->
<h1 align="center">SDiagram</h1>

<!---Descripcion-->
<center>
<p>
 Herramienta de visualización de código abierto con <a href="https://github.com/eclipse-sprotty/sprotty">Sprotty</a>, para VS Code.
</p>
</center>

<!-- Funciones Principales -->
**Funciones Principales:**

- **Generación de un diagrama mediante un archivo JSON**. Eligiendo un archivo JSON se crea un diagrama.

- **Generaración del diagrama del Espacio de Trabajo**. Tiene como objetivo mostrar la estructura de la carpeta activa en el espacio de trabajo.

- **Generaración del diagrama de dependencias locales de un archivo**. Al seleccionar un archivo que se encuentra dentro del espacio de trabajo, muestra un diagrama con las dependencias de archivos localizados en el mismo proyecto.
  
- **Abrir un archivo desde el diagrama**. Seleccionando un nodo del diagrama, permite abrir el archivo.

<br />

<!--USO-->
## Uso
Primero, se debe descargar la extensión en el marketplace de VS Code.

Una vez instalada, la extensión se encuentra activada automáticamente.

**Generación de un diagrama con un archivo JSON**

Para crearlo, se escribe en la paleta de comandos (`Ctrl+Shift+P`) `Create Diagram`. Se abrirá un dialog, donde se  debe seleccionar un archivo `.json`. El fichero debe tener la siguiente estructura:

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
Es obligatorio, que tenga los atributos nodes y edges. Nodes contiene un array formado por ids y labels, mientras edges tiene un array con srcId y tgtId.

**Generaración del diagrama del Espacio de Trabajo**

Si se tiene activa una carpeta en el espacio de trabajo, a través de la paleta de comandos se escribe `Generate Diagram of Workspace Project`, creándolo automáticamente.

**Generaración del diagrama de dependencias local de un archivo**

Mediante el comando `Generate Diagram Dependencies from a File`  se selecciona un archivo que se encuentra dentro del proyecto, mostrando así sus dependencias con otros ficheros dentro del mismo proyecto.

<!-- Construcción -->
## Construcción

Se necesita tener instalado previamente:

- [Node.js](https://nodejs.org/en/)
- [VS Code](https://code.visualstudio.com/)
- [yarn](https://yarnpkg.com/)

A continuación, descarga o clona el repositorio y en la carpeta raíz ejecuta los siguientes comandos:

```bash
    npm run build
    cd extension 
    npm run build
    cd ../webview
    npm run build
```

Después, la extensión puede ejecutarse a través del botón <kbd>F5</kbd> o el seleccionado `Run ➜ Start Debugging`