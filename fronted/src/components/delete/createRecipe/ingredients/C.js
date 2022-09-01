import React, { useState } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./A";
import EditableRow from "./B";

export default function IngredientFather(props) {

    const { ingredientData, setIngredientData } = props;
    const [addFormData, setAddFormData] = useState({
        id: "",
        qty: "",
        measurement: "",
        ingredient: "",
    });

    const [editFormData, setEditFormData] = useState({
        id: "",
        qty: "",
        measurement: "",
        ingredient: "",
    });

    

    const [editDataId, setEditDataId] = useState(null);

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

        const newData = {
            id: nanoid(),
            qty: addFormData.qty,
            measurement: addFormData.measurement,
            ingredient: addFormData.ingredient,
        };

        const newIngredientData = [...ingredientData, newData];
        setIngredientData(newIngredientData);
        
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editDataId,
            qty: editFormData.qty,
            measurement: editFormData.measurement,
            ingredient: editFormData.ingredient,
        };

        const newContacts = [...ingredientData];

        const index = ingredientData.findIndex((data) => data.id === editDataId);

        newContacts[index] = editedContact;

        setIngredientData(newContacts);
        setEditDataId(null);
    };

    const handleEditClick = (event, data) => {
        event.preventDefault();
        setEditDataId(data.id);

        const formValues = {
            qty: data.qty,
            measurement: data.measurement,
            ingredient: data.ingredient,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditDataId(null);
    };

    const handleDeleteClick = (dataId) => {
        const newContacts = [...ingredientData];

        const index = ingredientData.findIndex((data) => data.id === dataId);

        newContacts.splice(index, 1);

        setIngredientData(newContacts);
    };

    return (
        <div className="app-container">
            <p> Ingredients: </p>
            <div className="row" >
                <input
                    className="form-control col m-2"
                    type="text"
                    name="qty"
                    required="required"
                    placeholder="Enter a Qty..."
                    onChange={handleAddFormChange}
                />
                <input
                    className="form-control col m-2"
                    type="text"
                    name="measurement"
                    required="required"
                    placeholder="Measurement..."
                    onChange={handleAddFormChange}
                />
                <input
                    className="form-control col m-2"
                    type="text"
                    name="ingredient"
                    required="required"
                    placeholder="Ingredient..."
                    onChange={handleAddFormChange}
                />
                <button
                    className='btn col-1 btn-danger m-2'
                    onClick={handleAddFormSubmit} type="submit">Add</button>
            </div>
            {ingredientData ?
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
                            {ingredientData ?
                                ingredientData.map((data) => (
                                    <>
                                        {editDataId === data.id ? (
                                            <EditableRow
                                                editFormData={editFormData}
                                                handleEditFormChange={handleEditFormChange}
                                                handleCancelClick={handleCancelClick}
                                            />
                                        ) : (
                                            <ReadOnlyRow
                                                data={data}
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

