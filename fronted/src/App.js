import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from "./redux/store/store";
import { Provider } from 'react-redux'
// import PrivateRoute from './services/privateRoute';
import Signup from './components/form/signup/Signup'
import Home from './components/home/Home';
import Login from './components/form/login/Login';
import NavbarTop from './components/navbar/NavbarTop';
import NavTop from './components/navbar/NavTop';
import RecipePage from './components/recpiePage/RecipePage';
import AddRecipe from './components/form/addRecipe/AddRecipe';
import Logout from './services/logout'
// import Test from './components/signup/Test';
// import Testsearch from './components/search/testparams';
// import Add from './components/add/add';
// import CreateRecipe from './components/createRecipe/CreateRecipe';



function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <header>
          {/* <NavbarTop /> */}
          <NavTop />
        </header>
        <main>
          {/* <div className="App"> */}
          <Routes>

            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/recpies/:id' element={<RecipePage />} />
            <Route path='/' element={<Home />} />
            <Route path='/logout' element={<Logout />} />
            {/* <Route exact path='/' element={<PrivateRoute />}> */}
            <Route path='/addRecipe' element={<AddRecipe />} />
            {/* </Route> */}
            {/* <Route path='/test' element={<Test />} /> */}
            {/* <Route path='/testsearch' element={<Testsearch />} /> */}
            {/* <Route path='/createRecipe' element={<CreateRecipe />} /> */}
          </Routes>
          {/* </div> */}
        </main>
        <footer>

        </footer>
      </Router>
      {/* <div className="App"> <Signup />  </div> */}
    </Provider>
  );
}

export default App;
