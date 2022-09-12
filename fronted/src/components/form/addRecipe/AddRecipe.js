import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/actions/action';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TitleAndDescription from './TitleAndDescription';
import Img from './Img';
import Img2 from './img2';
import Ingredients from './Ingredients';
import TagsAllergy from './TagsAllergy';
import Preparation from './Preparation';
import { toast } from 'react-toastify';
import './addRecipe.css'
import ImageRecipe from './ImagRecipe';

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
            toast.success('sucsses Add a recipe!', {
                position: toast.POSITION.TOP_RIGHT
            });
            let stateSucceed = null;
            props.setSucceededAddRecipe(stateSucceed);
            setTimeout(() => navigate('/'), 6000)
        } else if (succeededAddRecipe === false) {
            toast.error('not sucsses add recipe  !', {
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
            description: yup.string().max(1024),
            imageRecipe: yup.string(),
            image: yup.string(),
            tagsFreeOf: yup.array().required().min(1,'Tags must have at least 1 items'),
        })
        .required();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            imageRecipe: "",
            tagsFreeOf: [],
            radio: 'A'
        },
    });
    const [data, setData] = useState();
    const radio = watch("radio")
    const imageUploud = watch("image");
    const imageLink = watch("imageRecipe");
    const [dataIngredients, setDataIngredients] = useState([])
    const [errorIngredients, setErrorIngredients] = useState([])
    const [dataPreparation, setDataPreparation] = useState([])
    const [errorPreparation, setErrorPreparation] = useState([])
    const [next, setNext] = useState(false)
    const [errorSendRecipe, setErrorSendRecipe] = useState()
   
    useEffect(() => {
        if (dataIngredients.length < 2) {
            setErrorIngredients("must be at least 2 ingredients")
        } else {
            setErrorIngredients(null)
        }
    }, [dataIngredients])

    useEffect(() => {
        if (dataPreparation.length < 1) {
            setErrorPreparation("must be at least 1 preparation")
        } else {
            setErrorPreparation(null)
        }
    }, [dataPreparation])
    useEffect(() => {
        if (errorIngredients === null && errorPreparation === null) {
            setNext(true)
        }
    }, [errorIngredients, errorPreparation])
    useEffect(() => {
        if (errorSendRecipe) {
            if (!errorIngredients && errorPreparation) {
                setErrorSendRecipe("must be at least 1 Preparation");
            } else if (!errorIngredients && !errorPreparation) {
                setErrorSendRecipe(null)
            }
        }
    }, [errorSendRecipe, errorIngredients, errorPreparation])
    const chooseRadio = () => {
        if (radio === 'A') {
            if (imageUploud !== '') {
                return imageUploud[0]
            } else {
                return 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg'
            }
        } else if (radio === 'B') {
            if (imageLink) {
                return imageLink
            } else {
                return 'https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg'
            }
        }
    }

    const onSubmit = data => {
        setData(data)
        const image = imageUploud[0];
        // console.log(dataIngredients, dataPreparation);
        if (next === true) {
            console.log("contine");
            let dataRecipe = {
                nameRecipe: data.title,
                // recipeImage: data.imageRecipe ? data.imageRecipe : "https://cdn.pixabay.com/photo/2015/12/03/08/50/paper-1074131_960_720.jpg",
                recipeImage: chooseRadio(),
                tagsFreeOf: data.tagsFreeOf,
                description: data.description,
                ingredients: dataIngredients,
                preparation: dataPreparation
            }
            console.log('data recipe', dataRecipe);
            props.addRecipe(dataRecipe)

        } else {
            if (errorIngredients && errorPreparation) {
                setErrorSendRecipe("must be at least 2 ingredients")
            } else if (!errorIngredients && errorPreparation) {
                setErrorSendRecipe("must be at least 1 Preparation")
            } else if (errorIngredients && !errorPreparation) {
                setErrorSendRecipe("must be at least 2 ingredients")
            }
        }
    }
    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <div className="divBackground" >
            <div className='backgroundInDiv'>
                <h4 className='mx-5' ><i className="bi bi-arrow-left" onClick={handleGoBack} role="button"></i> Add recipe</h4>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" method="POST" className=''>
                    <div className='cssForm'>
                        <TitleAndDescription register={register} errors={errors} />
                        <Img register={register} errors={errors} radio={radio} />
                        {/* <ImageRecipe register={register} errors={errors} /> */}

                        <TagsAllergy register={register} errors={errors} />
                        <Ingredients dataIngredients={dataIngredients}
                            setDataIngredients={setDataIngredients} errorIngredients={errorIngredients} />
                        <Preparation dataPreparation={dataPreparation} setDataPreparation={setDataPreparation} errorPreparation={errorPreparation} />
                    </div>
                    <div className="m-5 px-5">
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            <button className="btn btn-success" type="submit" >
                                Add Recipe
                            </button>
                        </div>
                        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                            {
                                errorSendRecipe &&
                                <span className='errorSpan'>{errorSendRecipe}</span>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
})

