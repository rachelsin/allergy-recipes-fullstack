import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
// import data from "./mock-data.json";
import ReadOnlyRow from "./A";
import EditableRow from "./B";

export default function Ingredientest(props) {

    const { contacts, setContacts } = props;
    // const [contacts, setContacts] = useState("");
    const [addFormData, setAddFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    const [editFormData, setEditFormData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            fullName: editFormData.fullName,
            address: editFormData.address,
            phoneNumber: editFormData.phoneNumber,
            email: editFormData.email,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            fullName: contact.fullName,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            email: contact.email,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    return (
        <div className="app-container">
            <p> Ingredients: </p>
            <div className="row" >
                <input
                    className="form-control col m-2"
                    type="text"
                    name="fullName"
                    required="required"
                    placeholder="Enter a Qty..."
                    onChange={handleAddFormChange}
                />
                <input
                    className="form-control col m-2"
                    type="text"
                    name="address"
                    required="required"
                    placeholder="Measurement..."
                    onChange={handleAddFormChange}
                />
                <input
                    className="form-control col m-2"
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Ingredient..."
                    onChange={handleAddFormChange}
                />
                <button
                    className='btn col-1 btn-danger m-2'
                    onClick={handleAddFormSubmit} type="submit">Add</button>
            </div>
            {contacts ?
                <form onSubmit={handleEditFormSubmit}>
                    <table className="table border table-sm table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Qty</th>
                                <th scope="col-2">measurement</th>
                                <th scope="col-2">Ingredients</th>
                                <th scope="col-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts ?
                                contacts.map((contact) => (
                                    <>
                                        {editContactId === contact.id ? (
                                            <EditableRow
                                                editFormData={editFormData}
                                                handleEditFormChange={handleEditFormChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <ReadOnlyRow
                                                contact={contact}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />
                                        )}
                                    </>
                                ))
                                : null}
                        </tbody>
                    </table>
                </form>
                : null}

        </div>
    );
};

