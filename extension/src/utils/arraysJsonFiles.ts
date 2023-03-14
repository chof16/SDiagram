const NODES = /"nodes"/;
const EDGES = /"edges"/;

const elementos = /},/

let nodos, flechas;

export function getArrays(datos: string) {
  let comienzoFlecha = datos.match(EDGES);
  let comienzoNodo = datos.match(NODES);

  if (comienzoNodo!.index < comienzoFlecha!.index) {
    nodos = datos.slice(comienzoNodo.index, comienzoFlecha.index - 1)
    flechas = datos.slice(comienzoFlecha.index)
  }
  else {
    flechas = datos.slice(comienzoFlecha.index, comienzoNodo.index - 1)
    nodos = datos.slice(comienzoNodo.index)
  }
  var elementosNodos = nodos.split(elementos);
  var elementosFlechas = flechas.split(elementos);
  var ids = getsIds(elementosNodos)
  var labels = getsLabels(elementosNodos)
  let { srcId, tgtId } = getsRelaciones(elementosFlechas)

  return { ids, labels, srcId, tgtId }
}

function getsIds(elementosNodos: string[]) {
  let ids: string[] = []
  let i = 0;
  elementosNodos.forEach(element => {
    ids[i] = element.match(/\d+/)[0];
    i++;
  });

  return ids;
}

function getsLabels(elementosNodos: any[]) {
  var labels: any[] = []
  var i = 0;
  elementosNodos.forEach(element => {
    var startNumber = element.lastIndexOf(":");
    var endNumber = element.search("\"\n", startNumber)
    var elemntoEntreComillas = element.slice(startNumber, endNumber).trim();
    labels[i] = elemntoEntreComillas.slice(elemntoEntreComillas.indexOf("\"") + 1, elemntoEntreComillas.length);
    i++;
  });

  return labels;
}

function getsRelaciones(elementosFlechas: string[]) {
  var srcId: string[] = []
  var tgtId: string[] = []
  var i = 0;
  elementosFlechas.forEach(element => {
    srcId[i] = element.match(/\d+/)[0];
    tgtId[i] = element.match(/\d+\n/)[0].slice(0, element.match(/\d+\n/)[0].length - 1)
    i++;
  });

  return { srcId, tgtId }
}