const express = require("express");
const router = express.Router();
const { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact, 
 } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// router.route("/").get((req, res) => {
//     res.send("Get all contacts");
// });

// Este código configura un router en Express con varias rutas para manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) 
// en una API de "contactos". Cada ruta responde con un mensaje JSON indicando la acción que realiza. Aquí va un desglose:

// Define la ruta GET en la raíz ("/") del router. Responde con un mensaje "Get all contacts", que se usa para obtener todos los contactos.
// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Get all contacts" });
// });

// router.route("/").get(getContacts);

// Define la ruta POST en la raíz ("/"). Responde con el mensaje "Create Contact", que indica la creación de un nuevo contacto.
// router.route("/").post((req, res) => {
//     res.status(200).json({ message: "Create Contact" });
// });

// router.route("/").post(createContact);

// Define la ruta GET en "/:id", donde :id es un parámetro de la URL que representa el ID de un contacto específico. 
// Devuelve un mensaje "Get contact for {id}" indicando que se ha solicitado un contacto por su ID.
// router.route("/:id").get((req, res) => {
//     res.status(200).json({ message: `Get contact for ${req.params.id}` });
// });

// router.route("/:id").get(getContact);

// Define la ruta PUT en "/:id". Devuelve el mensaje "Update contact for {id}", usado para actualizar un contacto específico.
// router.route("/:id").put((req, res) => {
//     res.status(200).json({ message: `Update contact for ${req.params.id}` });
// });

// router.route("/:id").put(updateContact);

// Define la ruta DELETE en "/:id". Devuelve el mensaje "Delete contact for {id}", indicando que se está eliminando un contacto específico.
// router.route("/:id").delete((req, res) => {
//     res.status(200).json({ message: `Delete contact for ${req.params.id}` });
// });

// router.route("/:id").delete(deleteContact);

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;

// Escribimos en Thunder: http://localhost:5001/api/contacts/
// Dando PUT entonces: http://localhost:5001/api/contacts/1

// Dando a POST vamos a Body y escribimos:

// {
//     "name":"Dipesh",
//     "email":"dipesh@gmail.com",
//     "phone": "0987654321"
// }