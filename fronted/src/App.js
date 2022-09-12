import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "./redux/store/store";
import { Provider } from 'react-redux'
import PrivateRoute from './services/privateRoute';
import Signup from './components/form/signup/Signup'
import Home from './components/home/Home';
import Login from './components/form/login/Login';
import NavTop from './components/navbar/NavTop';
import RecipePage from './components/recpiePage/RecipePage';
import AddRecipe from './components/form/addRecipe/AddRecipe';
import Logout from './services/logout'
import AddImage from './components/form/addRecipe/AddImage';
// import Test from './components/signup/Test';
// import Testsearch from './components/search/testparams';
// import Add from './components/add/add';
// import CreateRecipe from './components/createRecipe/CreateRecipe';
// import NavbarTop from './components/navbar/NavbarTop';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <header>
          <NavTop />
        </header>
        <main>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/addRecipe' element={<AddRecipe />} />
            </Route>

            <Route exact path='/addImage' element={<AddImage />} />
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
    </Provider>
  );
}

export default App;
