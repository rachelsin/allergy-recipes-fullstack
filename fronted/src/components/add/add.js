import React from 'react'

import { connect } from 'react-redux';
import { actions } from '../../redux/actions/action';

const mapStateToProps = (state) => {
    return {
        // recipes: state.publicData.recipes
        // admin: state.publicData.admin,
        recipes: state.public.recipes,
        nameState: state.recipe.nameState
    };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(function Add(props) {
    return (
        <div>
            <p>add</p>

            {/* {console.log(props.recipes[2])} */}
        </div>
    )
}
)
