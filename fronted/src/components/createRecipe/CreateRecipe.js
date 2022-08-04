import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';
import Ingredients from './ingredients/Ingredients';
import NameAndDescrip from './NameAndDescrip';
import Preparation from './Preparation';
import RecipeImage from './RecipeImage';
import Tags from './Tags';
import IngredientFather from "./ingredients/C";
import Image from './Image';

function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (data) => dispatch(actions.addRecipe(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function CreateRecipe(props) {
    // ingredients
    const [ingredientData, setIngredientData] = useState("");
    // image
    const recipeImageRef = useRef("")
    // Preparation
    const [datapre, setDatapre] = useState([])
    const stepRef = useRef('')
    // checkbox Free of
    const [checked, setChecked] = useState([]);
    const checkList = ["milk", "peanut", "egg", "soy", "tree nut", "wheat", "sesame", "fish"];


    const [dataIngredients, setDataIngredients] = useState([])


    ///////////////
    const recipeNameRef = useRef('');
    const descriptionRef = useRef('');

    async function handleSubmit(e) {
        e.preventDefault();
        let data = {
            nameRecipe: recipeNameRef.current.value,
            recipeImage: recipeImageRef.current.value,
            tagsFreeOf: checked,
            description: descriptionRef.current.value,
            // ingredients: contacts,
            ingredients: dataIngredients,
            preparation: datapre
        };
        console.log(data);
        try {
            await props.addRecipe(data);
        } catch (err) {
            console.log('error', err);
        }
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
                            {/*   <IngredientFather
                                ingredientData={ingredientData}
                                setIngredientData={setIngredientData} /> */}
                            <Image />
                        </div>
                    </div>
                    <div className='row'>
                        <button className="btn btn-danger col-2 align-self-end m-auto" type="submit" onClick={handleSubmit}>ADD RECIPE</button>
                    </div>
                </div>
                {/* <div className="row bg-light text-dark">
                    <div className="col-md-8 col-sm-6 m-auto">
                        <div className="center">
                             <form onSubmit={handleSubmit} autoComplete="off" method="POST" className='row'> 
                            <NameAndDescrip
                                    recipeNameRef={recipeNameRef}
                                    descriptionRef={descriptionRef} />
                            <Ingredients
                                    dataIngredients={dataIngredients}
                                    setDataIngredients={setDataIngredients}
                                    qtyRef={qtyRef}
                                    measurementRef={measurementRef}
                                    ingredientRef={ingredientRef}
                                />
                            <Preparation
                                    datapre={datapre}
                                    setDatapre={setDatapre}
                                    stepRef={stepRef} />
                            <Tags
                                    checked={checked}
                                    setChecked={setChecked}
                                    checkList={checkList} />
                            <div className='row'>
                                    <button className="btn btn-lg btn-danger col align-self-end" type="submit">ADD RECIPE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
})

