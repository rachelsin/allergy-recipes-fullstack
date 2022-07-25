import React from "react";

const EditableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    return (
        <tr className="">
            <td >
                <input
                    className="form-control m-2 form-control-sm"
                    type="text"
                    required="required"
                    placeholder="Qty..."
                    name="qty"
                    value={editFormData.qty}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td >
                <input
                    className="form-control m-2 form-control-sm "
                    type="text"
                    required="required"
                    placeholder="Measurement..."
                    name="measurement"
                    value={editFormData.measurement}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td >
                <input
                    className="form-control m-2 form-control-sm"
                    type="text"
                    required="required"
                    placeholder="Ingredient..."
                    name="ingredient"
                    value={editFormData.ingredient}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <button className='btn btn-outline-danger btn-sm '
                    type="submit">Save</button>
                <button className='btn btn-outline-danger btn-sm' type="button" onClick={handleCancelClick}>
                    Cancel
                </button>
            </td>
        </tr>
    );
};

export default EditableRow;