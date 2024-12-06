// Importa el módulo express, que es un framework para construir aplicaciones web y APIs en Node.js de forma rápida y fácil.
const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
// Importa y configura el módulo dotenv, que permite cargar variables de entorno desde un archivo .env en process.env. 
// Esto es útil para almacenar configuraciones como el puerto, claves de API y otras configuraciones que no se deben escribir directamente en el código.
const dotenv = require("dotenv").config();

connectDb(); // Precaucion: Desconectar la VPN para que pueda conectarse a nuestra base de datos.

// Crea una instancia de la aplicación Express. app es el objeto principal que usas para definir rutas, manejar solicitudes, y configurar el servidor.
const app = express();

// Define el puerto en el cual el servidor escuchará las solicitudes. Primero intenta leer el valor de PORT desde las variables de entorno, y si no está definido, 
// usará 5000 como valor por defecto.
const port = process.env.PORT || 5000;

// Configura un middleware que permite al servidor interpretar datos en formato JSON que se envían en el cuerpo de las solicitudes HTTP.
app.use(express.json());

// Define una ruta GET en "/api/contacts" que, al ser accedida, responde con el mensaje "Get all contacts". 
// Es decir, cuando alguien visita esa ruta, el servidor devuelve ese texto como respuesta.
// app.get();

// El método app.use() en Express se utiliza para aplicar middleware a una aplicación. Los middlewares son funciones que tienen acceso al objeto de solicitud (req), 
// al objeto de respuesta (res), y a la función next, que permite pasar el control al siguiente middleware en la pila.
app.use("/api/contacts", require("./routes/contactRoutes"));
// Vamos a registrar al usuario y luego vamos a tener un usuario de inicio de sesión.
app.use("/api/users", require("./routes/userRoutes"));

// En una aplicación Express se utiliza para registrar un middleware de manejo de errores, app.use: Este método se utiliza para agregar middleware a la aplicación Express. 
// Los middleware son funciones que pueden interceptar y modificar las solicitudes y respuestas HTTP.

// errorHandler: Este es el nombre del middleware que se encarga de manejar errores en la aplicación. Generalmente, 
// es una función que toma cuatro parámetros: err, req, res, y next.

app.use(errorHandler);

// Inicia el servidor en el puerto especificado. La función de callback en listen se ejecuta una vez que el servidor está en funcionamiento.
app.listen(port, () => {
    // Muestra un mensaje en la consola indicando que el servidor está ejecutándose y en qué puerto.
    console.log(`Server running on port ${port}`);
});