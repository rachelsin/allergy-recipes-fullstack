import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions/action';
import { useNavigate } from 'react-router-dom';

export default function DeleteRecipe(props) {
    const { id } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const deleteRecipe = useSelector(state => state.recipe.deleteRecipe)

    useEffect(() => {
        if (deleteRecipe) {
            navigate('/my-recipes')
            dispatch(actions.setSucceededDeleteRecipe(false))
        }
    }, [deleteRecipe])

    const handleClose = () => props.show(false);

    const handleDelete = () => {
        dispatch(actions.deleteRecipe(id))
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>Ara you sure you want to delete this recipe?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete Recipe
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
