import React from 'react';
import Bottom from '../../../assets/images/bottom.png'
import Cheese from '../../../assets/images/cheese.png'
import Meat from '../../../assets/images/meat.png'
import Salad from '../../../assets/images/salad.png'
import Top from '../../../assets/images/top.png'
import './Ingredient.css'

export default function Ingredient(props) {
    let ingredients=null;
    switch(props.type){
        case 'Bottom':
            ingredients=<div><img src={Bottom} alt='Bottom' /></div>
            break;
            case 'Cheese':
                ingredients=<div><img src={Cheese} alt='Cheese' /></div>
                break;
            case 'Meat':
                ingredients=<div><img src={Meat} alt='Meat' /></div>
                 break;
            case 'Salad':
                ingredients=<div><img src={Salad} alt='Salad' /></div>
                break;
            case 'Top':
                ingredients=<div><img src={Top} alt='Top' /></div>
                 break;
        
        default:
            ingredients=null
    }
  return (
    <div className='Ingredient'>
        {ingredients}
    </div>
    );
}

