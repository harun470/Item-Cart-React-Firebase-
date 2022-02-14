import React from 'react';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Header from './Header/Header';
import {Route,Switch} from 'react-router-dom'
import Order from './Order/Order';
import checkOut from './Order/checkOut/checkOut';

export default function Main() {
  return (
    <div>
        <Header />
        <div className='container'>
            <Switch>
              <Route path='/' exact component={BurgerBuilder} />
              <Route path='/Order' component={Order} />
              <Route path='/checkOut'  component={checkOut} />
            </Switch>
        </div>
    </div>
  );
}
