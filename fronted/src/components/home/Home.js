import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

import RecipeCard from './RecipeCard'
import Pagination from './pagination/Pagination'

import { Row } from 'react-bootstrap';


const mapStateToProps = (state) => {
    return {
        recipes: state.public.recipes,
        nameState: state.recipe.nameState
    };
}

const mapDispatchToProps = (dispatch) => ({
    getRecipes: () => dispatch(actions.getAllRecipes()),

})

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {

    const { recipes, nameState } = props;

    useEffect(() => {
        props.getRecipes()
    }, []);

    return (
        <div className='container mt-4'>
            {/* <h4 className='mx-5' >Recently uploaded recipes</h4> */}

            <div className='mt-5'>
                <div className='m-auto'>
                    <Row className="justify-content-md-center">
                        {recipes.length > 0 &&
                            recipes.map(recip => {
                                return (
                                    <RecipeCard key={recip._id} recip={recip} />
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
            <div className="col-md-3 m-auto">
                <div className="center">
                    <Pagination />
                </div>
            </div>



        </div>
    )
})
