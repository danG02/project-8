import './App.css';
//Importing bootstrap after doing npm install --save bootstrap 
//Importing styled componet after doing npm install --save styled-componets 
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
//Imported npm install --save react-router-dom
//Installs React Router
//Browser Info, Switch, Route, Link
//With new React update, Switch,Route is now Routes,Route and componet is now element as shown in the Route tags
import { Routes,Route } from 'react-router-dom';
import Navbar from './Componets/Navbar';
import ProductList from './Componets/ProductList';
import Details from './Componets/Details';
import Cart from './Componets/Cart';
import Default from './Componets/Default';
import Model from './Componets/Model';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductList/>} />
          <Route path="/details" element={<Details/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route element={<Default/>} />
        </Routes>
        <Model />
      </React.Fragment>
    );
  }
}

export default App;
