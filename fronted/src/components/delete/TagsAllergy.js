import React from 'react'

export default function TagsAllergy({ checked, setChecked }) {

    const checkList = ["milk", "peanut", "egg", "soya", "nuts", "wheat", "sesame", "fish"];

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Generate string of checked items
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    // Return classes based on whether item is checked
    let isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    return (
        <>
            <label><h5>Free of</h5></label>
            {checkList.map((item, index) => (
                <div key={index} className="col-3 my-1">
                    <input value={item} type="checkbox" onChange={handleCheck} />
                    <span className={isChecked(item)}>{item}</span>
                </div>
            ))}


            <div>
                {`Items checked are: ${checkedItems}`}
            </div>
            <span className="errorSpan">Please give this recipe a title</span>

        </>
    );
}
