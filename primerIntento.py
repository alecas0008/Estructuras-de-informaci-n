"""
Taller #1 - Listas Enlazadas Simples
Implementación en Python (equivalente conceptual a una clase Java con
una clase interna Nodo).
"""


class Nodo:
    """Representa un nodo de la lista: un dato + un puntero al siguiente."""

    def __init__(self, dato):
        self.dato = dato      
        self.siguiente = None  


class ListaEnlazada:
    """Lista enlazada simple con inserción/retiro solo al inicio y al final."""

    def __init__(self):
        # Construir / inicializar la lista
        self.cabeza = None    
        self.actual = None    
        self.tamano = 0       

    def es_vacia(self):
        #Determinar si la lista está vacía
        return self.cabeza is None

    def insertar_inicio(self, dato):
        # Insertar al PRINCIPIO
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo
        if self.tamano == 0:
            self.actual = nuevo
        self.tamano += 1

    def insertar_final(self, dato):
        # Insertar al FINAL
        nuevo = Nodo(dato)
        if self.es_vacia():
            self.cabeza = nuevo
            self.actual = nuevo
        else:
            temp = self.cabeza
            while temp.siguiente is not None:
                temp = temp.siguiente
            temp.siguiente = nuevo
        self.tamano += 1

    def retirar_inicio(self):
        # Retirar del PRINCIPIO
        if self.es_vacia():
            raise Exception("No se puede retirar: la lista está vacía")
        dato = self.cabeza.dato
        self.cabeza = self.cabeza.siguiente
        self.tamano -= 1
        if self.tamano == 0:
            self.actual = None
        elif self.actual is None:
            self.actual = self.cabeza
        return dato

    def retirar_final(self):
        # Retirar del FINAL
        if self.es_vacia():
            raise Exception("No se puede retirar: la lista está vacía")

        if self.cabeza.siguiente is None:
            dato = self.cabeza.dato
            self.cabeza = None
            self.actual = None
        else:
            temp = self.cabeza
            while temp.siguiente.siguiente is not None:
                temp = temp.siguiente
            dato = temp.siguiente.dato
            temp.siguiente = None
            self.actual = temp

        self.tamano -= 1
        return dato

    def recorrer(self):
        # Consultar la lista completa (recorrido)
        elementos = []
        temp = self.cabeza
        while temp is not None:
            elementos.append(temp.dato)
            temp = temp.siguiente
        return elementos

    def longitud(self):
        # Determinar el número de elementos
        return self.tamano

    def consultar_actual(self):
        # Consultar el elemento actual
        if self.actual is None:
            return None
        return self.actual.dato

    def avanzar_actual(self):
        """Mueve el puntero 'actual' un nodo hacia adelante (útil para recorrer paso a paso)."""
        if self.actual is not None:
            self.actual = self.actual.siguiente


# ------------------ Programa de prueba ------------------
if __name__ == "__main__":
    lista = ListaEnlazada()

    print("¿Vacía al inicio?", lista.es_vacia())

    lista.insertar_final(10)
    lista.insertar_final(20)
    lista.insertar_final(30)
    lista.insertar_inicio(5)

    print("Lista completa:", lista.recorrer())
    print("Longitud:", lista.longitud())
    print("Elemento actual:", lista.consultar_actual())

    lista.retirar_inicio()
    print("Después de retirar del inicio:", lista.recorrer())

    lista.retirar_final()
    print("Después de retirar del final:", lista.recorrer())

    print("¿Vacía?", lista.es_vacia())
    print("Longitud final:", lista.longitud())