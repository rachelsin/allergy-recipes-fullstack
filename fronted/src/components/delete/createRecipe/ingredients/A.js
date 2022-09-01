import React from "react";

const ReadOnlyRow = ({ data, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={data.id}>
            <td>{data.qty}</td>
            <td>{data.measurement}</td>
            <td>{data.ingredient}</td>
            <td>
                <button
                    className='btn btn-outline-danger btn-sm '
                    type="button"
                    onClick={(event) => handleEditClick(event, data)}
                >
                    Edit
                </button>
                <button
                    className='btn btn-outline-danger mx-2 btn-sm'
                    type="button"
                    onClick={() => handleDeleteClick(data.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow;