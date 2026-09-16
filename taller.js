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
        this.ultimo = null;
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
            this.ultimo = nuevo;
        }

        this.tamano++;
    }

    insertarFinal(dato) {
        const nuevo = new Nodo(dato);

        if (this.esVacia()) {
            this.cabeza = nuevo;
            this.actual = nuevo;
            this.ultimo = nuevo;
        } else {
            this.ultimo.siguiente= nuevo;
            this.ultimo = nuevo;
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
            this.ultimo = null;
        }

        return dato;
    }

    retirarFinal() {
        if (this.esVacia()) {
        throw new Error("No se puede retirar: la lista está vacía");
    }

    // Caso: solo hay 1 elemento
    if (this.cabeza === this.ultimo) {
        const dato = this.cabeza.dato;

        this.cabeza = null;
        this.ultimo = null;
        this.actual = null;
        this.tamano--;

        return dato;
    }

    
    let temporal = this.cabeza; // hallar el penúltimo nodo

    while (temporal.siguiente !== this.ultimo) {
        temporal = temporal.siguiente;
    }

    // Guardar el nodo que se va a retirar
  
    const dato = this.ultimo.dato;

    // Desconectar el último nodo
    temporal.siguiente = null;
    this.ultimo = temporal;

    // Si actual apuntaba al nodo retirado, pasa a la nueva cola
    if (this.actual === this.ultimo) {
        this.actual = this.temporal;
    }

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
       if (this.actual === null)return null;

    const dato = this.actual.dato;
    this.actual = this.actual.siguiente;

    return dato;       
    }


}





        let miLista = null;

        // Referencias al DOM (HTML)
        const selectMenu = document.getElementById('opcion-menu');
        const areaInputs = document.getElementById('area-inputs');
        const btnEjecutar = document.getElementById('btn-ejecutar');
        const msgSistema = document.getElementById('mensaje-sistema');
        const vistaLista = document.getElementById('vista-lista');

        // Función para cambiar los campos de entrada según la opción del menú
        function actualizarInputs() {
            const opcion = selectMenu.value;
            areaInputs.innerHTML = ''; // Limpiar área

            if (opcion === '2') {
                areaInputs.innerHTML = `
                    <label>Valor a insertar: <input type="text" id="input-valor" placeholder="Ej: 50"></label>
                    <div class="radios">
                        <label><input type="radio" name="posicion-insertar" value="inicio" checked> Al principio</label>
                        <label><input type="radio" name="posicion-insertar" value="final"> Al final</label>
                    </div>
                `;
            } else if (opcion === '3') {
                areaInputs.innerHTML = `
                    <div class="radios">
                        <label><input type="radio" name="posicion-retirar" value="inicio" checked> Del principio</label>
                        <label><input type="radio" name="posicion-retirar" value="final"> Del final</label>
                    </div>
                `;
            }
            // Las demás opciones (1, 4, 5, 6, 7) no requieren campos extra
        }

        // Función para dibujar la lista en pantalla usando tu método recorrer()
        function dibujarLista() {
            if (!miLista) {
                vistaLista.innerHTML = "Inexistente";
                return;
            }
            const elementos = miLista.recorrer();
            if (elementos.length === 0) {
                vistaLista.innerHTML = "NULL";
            } else {
                vistaLista.innerHTML = elementos.join(' &rarr; ') + " &rarr; NULL";
            }
        }

        // Función para mostrar mensajes de éxito o error
        function mostrarMensaje(texto, tipo = "exito") {
            msgSistema.textContent = texto;
            msgSistema.className = "mensaje " + tipo;
        }

        // Evento: Escuchar cuando el usuario cambia la opción del menú
        selectMenu.addEventListener('change', actualizarInputs);

        // Evento: Clic en Ejecutar
        btnEjecutar.addEventListener('click', () => {
            const opcion = selectMenu.value;

            // Validación: Prevenir operaciones si la lista no existe (excepto la opción 1)
            if (!miLista && opcion !== '1') {
                mostrarMensaje("Error: ¡Primero debes construir/inicializar la lista (Opción 1)!", "error");
                return;
            }

            try {
                switch (opcion) {
                    case '1': // Inicializar
                        miLista = new ListaEnlazada();
                        mostrarMensaje("Lista inicializada correctamente.");
                        break;

                    case '2': // Insertar
                        const valor = document.getElementById('input-valor').value;
                        if(valor.trim() === '') {
                            mostrarMensaje("Por favor ingresa un valor.", "error");
                            return;
                        }
                        const posInsertar = document.querySelector('input[name="posicion-insertar"]:checked').value;
                        
                        if (posInsertar === 'inicio') {
                            miLista.insertarInicio(valor);
                            mostrarMensaje(`Elemento [${valor}] insertado al principio.`);
                        } else {
                            miLista.insertarFinal(valor);
                            mostrarMensaje(`Elemento [${valor}] insertado al final.`);
                        }
                        break;

                    case '3': // Retirar
                        const posRetirar = document.querySelector('input[name="posicion-retirar"]:checked').value;
                        let valorRetirado;
                        
                        if (posRetirar === 'inicio') {
                            valorRetirado = miLista.retirarInicio();
                            mostrarMensaje(`Se retiró el elemento del principio: [${valorRetirado}].`);
                        } else {
                            valorRetirado = miLista.retirarFinal();
                            mostrarMensaje(`Se retiró el elemento del final: [${valorRetirado}].`);
                        }
                        break;

                    case '4': // Consultar/Recorrer
                        const recorrido = miLista.recorrer();
                        mostrarMensaje(`Recorrido completado. Elementos en la lista: ${recorrido.length}`);
                        break;

                    case '5': // Longitud
                        const tam = miLista.longitud();
                        mostrarMensaje(`La longitud actual de la lista es: ${tam}`);
                        break;

                    case '6': // Es Vacía
                        const vacia = miLista.esVacia();
                        if (vacia) {
                            mostrarMensaje("La lista SÍ está vacía.");
                        } else {
                            mostrarMensaje("La lista NO está vacía.");
                        }
                        break;

                    case '7': // Elemento actual
                        const actual = miLista.consultarActual();
                        if (actual === null) {
                            mostrarMensaje("El elemento actual es nulo (no asignado o lista vacía).", "neutro");
                        } else {
                            mostrarMensaje(`El elemento actual es: [${actual}]`);
                        }
                        break;
                }
                
                // Siempre actualizar la vista de la lista después de cada operación
                dibujarLista();

            } catch (error) {
                // Captura de errores (por ejemplo, los throws en retirarInicio/Final)
                mostrarMensaje(error.message, "error");
            }
        });

        // Inicializar la interfaz visualmente sin campos al cargar la página
        actualizarInputs();
