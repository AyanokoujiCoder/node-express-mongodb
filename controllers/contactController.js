const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler (async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler (async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});

// const createContact = (req, res) => { ... }
// Define una función de flecha que toma dos parámetros: req (la solicitud) y res (la respuesta). 
// Esta función será llamada cuando se haga una solicitud para crear un contacto.

// console.log("The request body is :", req.body);
// Imprime en la consola el cuerpo de la solicitud (req.body), que contiene los datos enviados por el cliente 
// (normalmente en formato JSON). Esto es útil para depurar y ver qué datos se están recibiendo.

// const { name, email, phone } = req.body;
// Utiliza desestructuración para extraer las propiedades name, email y phone del objeto req.body. 
// Esto permite acceder a estos valores directamente sin tener que referirse a req.body.name, req.body.email, etc.

// if (!name || !email || !phone) { ... }
// Verifica si alguno de los campos requeridos (name, email o phone) no está presente (es decir, si es undefined o null).

// res.status(400);
// Si falta alguno de los campos, establece el código de estado de la respuesta a 400 Bad Request, lo que indica que la solicitud es incorrecta.

// throw new Error("All fields are mandatory !");
// Lanza un error con un mensaje que indica que todos los campos son obligatorios. 
// Esto puede ser capturado por un middleware de manejo de errores (si está definido en tu aplicación).

// res.status(201).json({ message: "Create contact" });
// Si todos los campos están presentes, establece el código de estado de la respuesta a 201 Created e envía un objeto JSON 
// con un mensaje que indica que se ha creado el contacto.

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts:id
//@access private

const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = { 
    getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact, 
};