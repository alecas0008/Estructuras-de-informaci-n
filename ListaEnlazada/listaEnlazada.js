class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class ListaEnlazada {
    constructor() {
        this.cabeza = null;
        this.actual = null;
        this.tamano = 0;
    }

    esVacia() {
        return this.cabeza === null;
    }

    insertarInicio(dato) {
        const nuevo = new Nodo(dato);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;

        if (this.tamano === 0) {
            this.actual = nuevo;
        }

        this.tamano++;
    }

    insertarFinal(dato) {
        const nuevo = new Nodo(dato);

        if (this.esVacia()) {
            this.cabeza = nuevo;
            this.actual = nuevo;
        } else {
            let temporal = this.cabeza;

            while (temporal.siguiente !== null) {
                temporal = temporal.siguiente;
            }

            temporal.siguiente = nuevo;
        }

        this.tamano++;
    }

    retirarInicio() {
        if (this.esVacia()) {
            throw new Error("No se puede retirar: la lista está vacía");
        }

        const dato = this.cabeza.dato;
        this.cabeza = this.cabeza.siguiente;
        this.tamano--;

        if (this.tamano === 0) {
            this.actual = null;
        }

        return dato;
    }

    retirarFinal() {
        if (this.esVacia()) {
            throw new Error("No se puede retirar: la lista está vacía");
        }

        if (this.cabeza.siguiente === null) {
            const dato = this.cabeza.dato;
            this.cabeza = null;
            this.actual = null;
            this.tamano--;
            return dato;
        }

        let temporal = this.cabeza;

        while (temporal.siguiente.siguiente !== null) {
            temporal = temporal.siguiente;
        }

        const dato = temporal.siguiente.dato;
        temporal.siguiente = null;
        this.actual = temporal;
        this.tamano--;

        return dato;
    }

    recorrer() {
        const elementos = [];
        let temporal = this.cabeza;

        while (temporal !== null) {
            elementos.push(temporal.dato);
            temporal = temporal.siguiente;
        }

        return elementos;
    }

    longitud() {
        return this.tamano;
    }

    consultarActual() {
        if (this.actual === null) {
            return null;
        }

        return this.actual.dato;
    }

    avanzarActual() {
        if (this.actual !== null) {
            this.actual = this.actual.siguiente;
        }
    }
}

const lista = new ListaEnlazada();

console.log("¿Vacía al inicio?", lista.esVacia());

lista.insertarFinal(10);
lista.insertarFinal(20);
lista.insertarFinal(30);
lista.insertarInicio(5);

console.log("Lista completa:", lista.recorrer());
console.log("Longitud:", lista.longitud());
console.log("Elemento actual:", lista.consultarActual());

lista.retirarInicio();
console.log("Después de retirar del inicio:", lista.recorrer());

lista.retirarFinal();
console.log("Después de retirar del final:", lista.recorrer());

console.log("¿Vacía?", lista.esVacia());
console.log("Longitud final:", lista.longitud());
