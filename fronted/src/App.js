import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './redux/actions/action';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PrivateRoute from './services/privateRoute';
import Signup from './components/form/signup/Signup'
import Home from './components/home/Home';
import Login from './components/form/login/Login';
import NavTop from './components/navbar/NavTop';
import RecipePage from './components/recpiePage/RecipePage';
import AddRecipe from './components/form/addRecipe/AddRecipe';
import Logout from './services/logout'
import MyRecipes from './components/myRecipes/MyRecipes';
import MyFavorites from './components/myFavorites/MyFavorites';
import EditRecipe from './components/editRecipe/EditRecipe';




function App() {
  const dispatch = useDispatch()



  return (
    <>
      <ToastContainer />
      <Router>
        <header>
          <NavTop />
        </header>
        <main>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/add-recipe' element={<AddRecipe />} />
              <Route path='/my-recipes' element={<MyRecipes />} />
              <Route path='/my-favorites' element={<MyFavorites />} />
              <Route path='/my-recipes/edit/:id' element={<EditRecipe />} />
            </Route>
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/recpies/:id' element={<RecipePage />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/logout' element={<Logout />} />
          </Routes>
        </main>
        <footer>

        </footer>
      </Router>
    </>
  );
}

export default App;
