import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TitleAndDescription from '../addRecipe/TitleAndDescription';
import Ingredients from '../addRecipe/Ingredients';
import TagsAllergy from '../addRecipe/TagsAllergy';
import Preparation from '../addRecipe/Preparation';
import { toast } from 'react-toastify';

const schema = yup
    .object()
    .shape({
        title: yup
            .string()
            .required("Title is a required field")
            .min(2, "title must be at least 2 characters")
            .max(255),
        description: yup.string().max(1024),
        tagsFreeOf: yup.array().required().min(1, 'Tags must have at least 1 items'),
    })
    .required();


export default function EditRecipe() {

    const recipe = useSelector(state => state.recipe.selectedRecipe)
    const succeededEditRecipe = useSelector(state => state.recipe.succeededEditRecipe)
    const dispatch = useDispatch()
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(actions.getRecipeById(id))
        }
    }, [id])

    useEffect(() => {
        if (succeededEditRecipe === true) {
            toast.success('Your recipe has been successfully updated!', {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            dispatch(actions.setSucceededEditRecipe(stateSucceed));
            setTimeout(() => navigate(-1), 3000)
        } else if (succeededEditRecipe === false) {
            toast.error("Sorry, we couldn't edit your recipe, try again later", {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            dispatch(actions.setSucceededAddRecipe(stateSucceed));
        }
    }, [succeededEditRecipe])

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: recipe.title,
            description: recipe.description,
            tagsFreeOf: recipe.tagsFreeOf,
        },
    });
    const [data, setData] = useState();
    const tags = watch("tagsFreeOf");
    useEffect(() => {
        setValue("tagsFreeOf", recipe.tagsFreeOf)
    }, [])
    const [dataIngredients, setDataIngredients] = useState(recipe.ingredients)
    const [errorIngredients, setErrorIngredients] = useState([])
    const [dataPreparation, setDataPreparation] = useState(recipe.preparation)
    const [errorPreparation, setErrorPreparation] = useState([])
    const [sendErrors, setSendErrors] = useState(false)
    const [next, setNext] = useState(false)
    const ingredientRef = useRef()
    const preparationRef = useRef()


    const onSubmit = data => {
        setData(data)
        // if (next === true) {
        console.log('g');
        let dataRecipe = {
            title: data.title,
            description: data.description,
            tagsFreeOf: data.tagsFreeOf,
            ingredients: dataIngredients,
            preparation: dataPreparation,
            id: id
        }
        dispatch(actions.editRecipe(dataRecipe))
        /*    } else {
               if (errorIngredients && errorPreparation || errorIngredients && !errorPreparation) {
                   ingredientRef.current.focus();
               } else if (!errorIngredients && errorPreparation) {
                   preparationRef.current.focus();
               }
           } */
    }


    return (
        <div className="divBackground" >
            <div className='backgroundInDiv'>
                <h4 className='mx-5' ><i className="bi bi-arrow-left hoverIcon" onClick={() => navigate(-1)} role="button"></i> Edit recipe</h4>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSendErrors(true)
                    handleSubmit(onSubmit)()
                }} autoComplete="off" method="POST" className=''>
                    <div className='cssForm'>
                        <TitleAndDescription register={register} errors={errors} />
                        <TagsAllergy register={register} errors={errors} />
                        <Ingredients dataIngredients={dataIngredients}
                            setDataIngredients={setDataIngredients} errorIngredients={errorIngredients}
                            ingredientRef={ingredientRef} />
                        <Preparation dataPreparation={dataPreparation} setDataPreparation={setDataPreparation} errorPreparation={errorPreparation}
                            preparationRef={preparationRef} />
                    </div>
                    <div className="m-5 px-5">
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            <button className="btn btn-success" type="submit" >
                                Update Recipe
                            </button>
                        </div>
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
