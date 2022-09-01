import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import TitleAndDescription from './TitleAndDescription';
import Img from './Img';
import Ingredients from './Ingredients';
import TagsAllergy from './TagsAllergy';
import Preparation from './Preparation';
import { toast } from 'react-toastify';
import './addRecipe.css'

function mapStateToProps(state) {
    return {
        succeededAddRecipe: state.recipe.succeededAddRecipe,
    };
}

const mapDispatchToProps = (dispatch) => ({
    addRecipe: (dataRecipe) => dispatch(actions.addNewRecipe(dataRecipe)),
    setSucceededAddRecipe: (stateSucceed) => dispatch(actions.setSucceededAddRecipe(stateSucceed)),
})

export default connect(mapStateToProps, mapDispatchToProps)(function AddRecipe(props) {

    const { succeededAddRecipe } = props;
    const navigate = useNavigate();
    useEffect(() => {
        if (succeededAddRecipe === true) {
            toast.success('sucsses Add a recipe  !', {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            props.setSucceededAddRecipe(stateSucceed);

            setTimeout(() => navigate('/'), 6000)

        } else if (succeededAddRecipe === false) {
            toast.success('not sucsses add recipe  !', {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null
            props.setSucceededAddRecipe(stateSucceed);

        }
    }, [succeededAddRecipe])

    const schema = yup
        .object()
        .shape({
            title: yup.string().required().min(2).max(255),
            description: yup.string().required().min(2).max(1024),
            image: yup.string(),
            tagsFreeOf: yup.array().required().min(1),
        })
        .required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            tagsFreeOf: [],
        },
    });
    const [data, setData] = useState()
    const [dataIngredients, setDataIngredients] = useState([])
    const [errorIngredients, setErrorIngredients] = useState([])
    const [dataPreparation, setDataPreparation] = useState([])
    const [errorPreparation, setErrorPreparation] = useState([])
    const [next, setNext] = useState(false)
    // const [continue, setContinue] = useState()


    useEffect(() => {
        if (dataIngredients.length < 2) {
            setErrorIngredients("must be at least 2 ingredients")
        } else {
            setErrorIngredients(null)
        }
    }, [dataIngredients])

    useEffect(() => {
        if (dataPreparation.length < 1) {
            setErrorPreparation(" must be at least 1 preparation")
        } else {
            setErrorPreparation(null)
        }
    }, [dataPreparation])
    useEffect(() => {
        if (errorIngredients === null && errorIngredients === null) {
            setNext(true)
        }
    }, [errorIngredients, errorIngredients])

    const onSubmit = data => {
        setData(data)
        console.log(data, data.image[0]);
        console.log(dataIngredients, dataPreparation);
        if (next === true) {
            console.log("contine");
            let dataRecipe = {
                nameRecipe: data.title,
                recipeImage: "https://cdn.pixabay.com/photo/2016/11/23/18/31/pasta-1854245_960_720.jpg",
                // recipeImage: data.image[0],
                tagsFreeOf: data.tagsFreeOf,
                description: data.description,
                ingredients: dataIngredients,
                preparation: dataPreparation
            }
            console.log(dataRecipe);
            props.addRecipe(dataRecipe)

        } else {
            console.log("not contineu");
        }
    }
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <>
            <div className="divBackground" >
                <div className='backgroundInDiv'>
                    <h4 className='mx-5' ><i className="bi bi-arrow-left" onClick={handleGoBack} role="button"></i> Add recipe</h4>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" method="POST" className='cssForm'>
                        <TitleAndDescription register={register} errors={errors} />
                        <Img register={register} errors={errors} />
                        <TagsAllergy register={register} errors={errors} />
                        <Ingredients dataIngredients={dataIngredients}
                            setDataIngredients={setDataIngredients} errorIngredients={errorIngredients} />
                        <Preparation dataPreparation={dataPreparation} setDataPreparation={setDataPreparation} errorPreparation={errorPreparation} />
                        <br />
                        <button
                            className="btn btn-danger"
                            type="submit"
                        >
                            ADD RECIPE
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
})

