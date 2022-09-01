import React, { useState } from "react";
import ReactDOM from "react-dom";

// import "./styles.css";

export default function Tags(props) {
    const { checked, setChecked, checkList } = props
    // const [checked, setChecked] = useState([]);
    // const checkList = ["Milk", "peanut", "Egg", "soy", "Tree Nut", "Wheat", "Sesame", "Fish"];

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
        <div className="app">
            <div className="checkList">
                <div className="title">Free of:</div>
                <div className="list-container row">
                    {checkList.map((item, index) => (
                        <div key={index} className="col-3 my-1">
                            <input value={item} type="checkbox" onChange={handleCheck} />
                            <span className={isChecked(item)}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                {`Items checked are: ${checkedItems}`}
            </div>
        </div>
    );
}

