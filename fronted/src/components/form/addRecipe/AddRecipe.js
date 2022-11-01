import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify';
import TitleAndDescription from './TitleAndDescription';
import Image from './image';
import Ingredients from './Ingredients';
import TagsAllergy from './TagsAllergy';
import Preparation from './Preparation';
import './addRecipe.css'

const schema = yup
    .object()
    .shape({
        title: yup
            .string()
            .required("Title is a required field")
            .min(2, "title must be at least 2 characters")
            .max(255),
        description: yup.string().max(1024),
        image: yup
            .mixed()
            .notRequired()
            .test("fileSize", "The file is too large", (value) => {
                if (!!value) {
                    return value && value[0]?.size < 2000000;
                }
                return true;
            })
            .test("type", "We only support jpeg or png", (value) => {
                if (!!value) {
                    return value && value[0]?.type === "image/jpeg";
                }
                return true;
            }),
        tagsFreeOf: yup.array().required().min(1, 'Tags must have at least 1 items'),
    })
    .required();


export default function AddRecipe() {
    const succeededAddRecipe = useSelector(state => state.recipe.succeededAddRecipe)
    const dispatch = useDispatch()

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            tagsFreeOf: [],
        },
    });

    const [data, setData] = useState();
    const imageUploud = watch("image");
    const [dataIngredients, setDataIngredients] = useState([])
    const [errorIngredients, setErrorIngredients] = useState(null)
    const [dataPreparation, setDataPreparation] = useState([])
    const [errorPreparation, setErrorPreparation] = useState(null)
    const [sendErrors, setSendErrors] = useState(false)
    const [next, setNext] = useState(false)
    const navigate = useNavigate();
    const ingredientRef = useRef()
    const preparationRef = useRef()

    useEffect(() => {
        if (succeededAddRecipe === true) {
            toast.success('Added a new recipe!', {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            dispatch(actions.setSucceededAddRecipe(stateSucceed));

            setTimeout(() => navigate('/'), 3000)
        } else if (succeededAddRecipe === false) {
            toast.error("Sorry, we couldn't add your recipe, try again later", {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            dispatch(actions.setSucceededAddRecipe(stateSucceed));
        }
    }, [succeededAddRecipe])

    useEffect(()=>{
        if (dataIngredients.length >= 2 && dataPreparation.length >= 1){
            setNext(true)  
        }else{
            setNext(false);
        }
    }, [dataIngredients, dataPreparation])

    useEffect(() => {
        if (sendErrors === true) {
            dataIngredients.length < 2 ?
                setErrorIngredients("Ingredients must be at least 2 ingredients") : setErrorIngredients(null);
            dataPreparation.length < 1 ?
                setErrorPreparation("Preparation must be at least 1 preparation") : setErrorPreparation(null);
            errorIngredients === null && errorPreparation === null ?
                setNext(true) : setNext(false);
        }
    }, [sendErrors, dataIngredients, dataPreparation, errorIngredients, errorPreparation, next])

    const handleGoBack = () => {
        navigate(-1)
    }
    const deleteImage = () => {
        setValue("image", null)
    }

    const onSubmit = data => {
        setData(data)
        if (next === true) {
            let dataRecipe = {
                title: data.title,
                description: data.description,
                image: imageUploud[0] ? imageUploud[0] : "https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg",
                tagsFreeOf: data.tagsFreeOf,
                ingredients: dataIngredients,
                preparation: dataPreparation
            }
            dispatch(actions.addNewRecipe(dataRecipe))
        } else {
            if (errorIngredients && errorPreparation || errorIngredients && !errorPreparation) {
                ingredientRef.current.focus();
            } else if (!errorIngredients && errorPreparation) {
                preparationRef.current.focus();
            }
        }
    }

    return (
        <div className="divBackground" >
            <div className='backgroundInDiv'>
                <h4 className='mx-5' ><i className="bi bi-arrow-left hoverIcon" onClick={handleGoBack} role="button"></i> Add recipe</h4>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSendErrors(true)
                    handleSubmit(onSubmit)()
                }} autoComplete="off" method="POST" className=''>
                    <div className='cssForm'>
                        <TitleAndDescription register={register} errors={errors} />
                        <Image register={register} errors={errors} deleteImage={deleteImage} imageUploud={imageUploud} />
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
                                Add Recipe
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

