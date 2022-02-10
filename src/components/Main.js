import React from 'react';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Header from './Header/Header';


export default function Main() {
  return (
    <div>
        <Header />
        <div className='container'>
            <BurgerBuilder />
        </div>
    </div>
  );
}
