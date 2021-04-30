# MasterClicker
[https://master-clicker-artur-alcoverro.herokuapp.com/](https://master-clicker-artur-alcoverro.herokuapp.com/)

## Mostrar los clicks hechos por el usuario
Esta funcionalidad se podría haber implementado perfectamente en el entorno del cliente, pero como he implementado un ranking y guardo las puntuaciones de los usuarios desconectados he decidido guardar cada puntuación en el servidor.
En mi aplicación se muestra en el campo _Your score_ de la navbar.

<br>

## Mostrar los clicks totales
Los click totales se tienen que guardar en el servidor.
En mi aplicación se muestra en grande en el centro de la pantalla

<br>

## Mostrar la media de clicks por usuario
Esta funcionalidad la he implementado en el cliente, calculándola a partir de solo los usuarios que están conectados.
En mi aplicación se muestra en el campo _AVG_ de la navbar.
<br>
Para mostrar si el usuario esta por encima o no de la media lo que hago es pintar el campo _Your score_ de la siguiente manera:

- **Rojo** para mostrar que esta por debajo de la media,
- **Naranja** para mostrar que está en la media.
- **Verde** para mostrar que esta por encima de la media.


<br>

## Mostrar la cantidad de usuarios conectados.
Funcionalidad del servidor.
En mi aplicación se muestra en el campo _Connected_ de la navbar.


<br>

## Añadir un botón o mecanismo para reiniciar el contador.
Esta funcionalidad tiene que estar en servidor, ya que hay que avisar a todos los usuarios.
En mi aplicación se puede activar mediante el boton _Reset_ de la navbar. Al apretar-lo aviso al servidor y este resetea las puntuaciones del ranking, elimina los usuarios desconectados y avisa a todos los clientes.


<br>

# Bonus:

## Mover el botón del click por pantalla para darle más vidilla al juego.
Funcionalidad del cliente a través de una animación hecha con CSS.

<br>

## Deshabilitar el intro para que no se puedan hacer trampas.
Funcionalidad del cliente a través de JS.

<br>

## Mostrar el número de clicks de todos los usuarios en una lista.
Toda la información de cada usuario la guardo en el servidor mediante la siguiente estructura

    user = {
        name: username,
        score: score,
        connected: true
    }

<br>

## Mover los usuarios en la lista ordenándolos por número de clicks.
Esta funcionalidad está implementada en el cliente a través de un `sort()` en JS

<br>

# Extra:
He aprovechado la estructura del ranking para guardar si un usuario está conectado o no.
En mi aplicación se muestra un círculo en el ranking que indica si el usuario está conectado (verde) o no (rojo).

