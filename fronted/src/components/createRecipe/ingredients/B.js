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
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td >
                <input
                    className="form-control m-2 form-control-sm "
                    type="text"
                    required="required"
                    placeholder="Measurement..."
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td >
                <input
                    className="form-control m-2 form-control-sm"
                    type="text"
                    required="required"
                    placeholder="Ingredient..."
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
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