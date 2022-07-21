import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import Ingredients from './ingredients/Ingredients';
import NameAndDescrip from './NameAndDescrip';
import Preparation from './Preparation';
import RecipeImage from './RecipeImage';
import Tags from './Tags';
import C from "./ingredients/C";

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (data) => dispatch(actions.addRecipe(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function CreateRecipe(props) {

    const [contacts, setContacts] = useState("");


    const recipeImageRef = useRef("")

    const [datapre, setDatapre] = useState([])
    const stepRef = useRef('')

    const [checked, setChecked] = useState([]);
    const checkList = ["Milk", "peanut", "Egg", "soy", "Tree Nut", "Wheat", "Sesame", "Fish"];

    const [dataIngredients, setDataIngredients] = useState([])
    const qtyRef = useRef('')
    const measurementRef = useRef('')
    const ingredientRef = useRef('')

    ///////////////
    const recipeNameRef = useRef('');
    const descriptionRef = useRef('');

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            nameRecipe: recipeNameRef.current.value,
            recipeImage: recipeImageRef.current.value,
            tagsFreeOf: checked,
            recipe: {
                description: descriptionRef.current.value,
                // ingredients: contacts,
                ingredients: dataIngredients,
                preparation: datapre
            }
        };
        console.log(data);
        try {
            await props.addRecipe(data);
            recipeNameRef.current.value = ""
            descriptionRef.current.value = ""

        } catch (err) {
            console.log('error', err);
        }
    }

    function handleAddLine() {

    }

    return (
        <>

            <div className="container mt-4" >


                <h4 className='mx-5' >Submit New Recipe</h4>
                <p className="text-muted mx-5"> Write down the details of the recipe </p>
                <div onSubmit={handleSubmit} autoComplete="off" method="POST">
                    <div className="row bg-light text-dark">
                        <div className='col-6 border'>
                            <NameAndDescrip
                                recipeNameRef={recipeNameRef}
                                descriptionRef={descriptionRef} />
                        </div>
                        <div className='col-6 border'>
                            <Tags
                                checked={checked}
                                setChecked={setChecked}
                                checkList={checkList} />
                        </div>
                    </div>
                    <div className="row bg-light text-dark">
                        <div className='col-6 border'>
                            <Ingredients
                                dataIngredients={dataIngredients}
                                setDataIngredients={setDataIngredients}
                                qtyRef={qtyRef}
                                measurementRef={measurementRef}
                                ingredientRef={ingredientRef}
                            />
                        </div>
                        <div className='col-6 border'>
                            <RecipeImage recipeImageRef={recipeImageRef} />
                        </div>
                    </div>
                    <div className="row bg-light text-dark">
                        <div className='col-6 border'>
                            <Preparation
                                datapre={datapre}
                                setDatapre={setDatapre}
                                stepRef={stepRef} />
                        </div>
                        <div className='col-6 border'>
                            <C contacts={contacts} setContacts={setContacts} />
                        </div>
                    </div>
                    <div className='row'>
                        <button className="btn btn-danger col-2 align-self-end m-auto" type="submit" onClick={handleSubmit}>ADD RECIPE</button>
                    </div>
                </div>
                <div className="row bg-light text-dark">
                    <div className="col-md-8 col-sm-6 m-auto">
                        <div className="center">
                            {/* <form onSubmit={handleSubmit} autoComplete="off" method="POST" className='row'> */}
                            {/* <NameAndDescrip
                                    recipeNameRef={recipeNameRef}
                                    descriptionRef={descriptionRef} /> */}
                            {/* <Ingredients
                                    dataIngredients={dataIngredients}
                                    setDataIngredients={setDataIngredients}
                                    qtyRef={qtyRef}
                                    measurementRef={measurementRef}
                                    ingredientRef={ingredientRef}
                                /> */}
                            {/* <Preparation
                                    datapre={datapre}
                                    setDatapre={setDatapre}
                                    stepRef={stepRef} /> */}
                            {/* <Tags
                                    checked={checked}
                                    setChecked={setChecked}
                                    checkList={checkList} /> */}
                            {/* <div className='row'>
                                    <button className="btn btn-lg btn-danger col align-self-end" type="submit">ADD RECIPE</button>
                                </div> */}
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

