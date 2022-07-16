import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import store from "./redux/store/store";
import { Provider } from 'react-redux'
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import Login from './components/login/Login';
import NavbarTop from './components/navbar/NavbarTop';
import CreateRecipe from './components/createRecipe/CreateRecipe';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <header>
          <NavbarTop />
        </header>
        <main>
          {/* <div className="App"> */}
          <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createRecipe' element={<CreateRecipe />} />
            <Route path='/' element={<Home />} />
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
