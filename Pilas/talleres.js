// Este archivo contiene las estructuras de datos y conecta sus operaciones
// con los botones de talleres.html.

// Una pila solo permite trabajar por la parte superior (regla LIFO).
class Pila {
    constructor() {
        this.elementos = [];
    }

    apilar(valor) {
        this.elementos.push(valor);
    }

    desapilar() {
        return this.elementos.pop();
    }

    // La cima es el último elemento almacenado en la pila.
    consultarCima() {
        return this.elementos[this.elementos.length - 1];
    }

    // Devuelve todos los elementos desde la base hasta la cima.
    recorrer() {
        return [...this.elementos];
    }

    longitud() {
        return this.elementos.length;
    }

    estaVacia() {
        return this.elementos.length === 0;
    }
}

// Un nodo conoce su dato y el nodo que viene después.
class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

// La lista enlazada conserva el primer nodo en "cabeza".
class ListaEnlazada {
    constructor() {
        this.cabeza = null;
    }

    insertarInicio(dato) {
        const nuevoNodo = new Nodo(dato);
        nuevoNodo.siguiente = this.cabeza;
        this.cabeza = nuevoNodo;
    }

    insertarFinal(dato) {
        const nuevoNodo = new Nodo(dato);

        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
            return;
        }

        let nodoActual = this.cabeza;
        while (nodoActual.siguiente !== null) {
            nodoActual = nodoActual.siguiente;
        }
        nodoActual.siguiente = nuevoNodo;
    }

    retirarFinal() {
        if (this.cabeza === null) {
            return null;
        }

        if (this.cabeza.siguiente === null) {
            const dato = this.cabeza.dato;
            this.cabeza = null;
            return dato;
        }

        let nodoActual = this.cabeza;
        while (nodoActual.siguiente.siguiente !== null) {
            nodoActual = nodoActual.siguiente;
        }

        const dato = nodoActual.siguiente.dato;
        nodoActual.siguiente = null;
        return dato;
    }

    recorrer() {
        const datos = [];
        let nodoActual = this.cabeza;

        while (nodoActual !== null) {
            datos.push(nodoActual.dato);
            nodoActual = nodoActual.siguiente;
        }
        return datos;
    }
}

const pila = new Pila();
const lista = new ListaEnlazada();

const valorPila = document.getElementById("valor-pila");
const resultadoPila = document.getElementById("resultado-pila");
const pilaVisual = document.getElementById("pila-visual");
const valorLista = document.getElementById("valor-lista");
const resultadoLista = document.getElementById("resultado-lista");
const listaVisual = document.getElementById("lista-visual");

function dibujarPila() {
    pilaVisual.innerHTML = pila.elementos
        .map((elemento) => `<div class="elemento">${elemento}</div>`)
        .join("");
    resultadoPila.textContent = pila.estaVacia()
        ? "La pila está vacía."
        : `Cima: ${pila.elementos[pila.elementos.length - 1]}`;
}

function dibujarLista() {
    const datos = lista.recorrer();
    listaVisual.innerHTML = datos.length === 0
        ? ""
        : datos.map((dato) => `<span class="elemento">${dato}</span>`).join('<span class="flecha">→</span>');
    resultadoLista.textContent = datos.length === 0
        ? "La lista está vacía."
        : `La lista tiene ${datos.length} nodo(s).`;
}

document.getElementById("apilar").addEventListener("click", () => {
    const valor = valorPila.value.trim();
    if (!valor) return;
    pila.apilar(valor);
    valorPila.value = "";
    dibujarPila();
});

document.getElementById("desapilar").addEventListener("click", () => {
    const valor = pila.desapilar();
    resultadoPila.textContent = valor === undefined
        ? "No se puede desapilar: la pila está vacía."
        : `Se retiró ${valor} de la cima.`;
    dibujarPila();
});

document.getElementById("consultar-cima").addEventListener("click", () => {
    const cima = pila.consultarCima();
    resultadoPila.textContent = cima === undefined
        ? "La pila está vacía; no existe una cima."
        : `La cima o tope de la pila es: ${cima}.`;
});

document.getElementById("recorrer-pila").addEventListener("click", () => {
    const recorrido = pila.recorrer();
    resultadoPila.textContent = recorrido.length === 0
        ? "La pila está vacía; no hay elementos para recorrer."
        : `Recorrido desde la base hasta la cima: ${recorrido.join(" → ")}.`;
});

document.getElementById("longitud-pila").addEventListener("click", () => {
    resultadoPila.textContent = `La pila tiene ${pila.longitud()} elemento(s).`;
});

document.getElementById("vacia-pila").addEventListener("click", () => {
    resultadoPila.textContent = pila.estaVacia()
        ? "La pila sí está vacía."
        : "La pila no está vacía.";
});

document.getElementById("insertar-inicio").addEventListener("click", () => {
    const valor = valorLista.value.trim();
    if (!valor) return;
    lista.insertarInicio(valor);
    valorLista.value = "";
    dibujarLista();
});

document.getElementById("insertar-final").addEventListener("click", () => {
    const valor = valorLista.value.trim();
    if (!valor) return;
    lista.insertarFinal(valor);
    valorLista.value = "";
    dibujarLista();
});

document.getElementById("retirar-final").addEventListener("click", () => {
    const valor = lista.retirarFinal();
    resultadoLista.textContent = valor === null
        ? "No se puede retirar: la lista está vacía."
        : `Se retiró ${valor} del final.`;
    dibujarLista();
});

dibujarPila();
dibujarLista();