import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css'

export default function Burger(props) {
    let ingredientArr=props.ingredients.map(item=>{
        let amountArr=[...Array(item.amount).keys()]
        return amountArr.map(_=>{
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
    .reduce((arr,element)=>{
        return arr.concat(element)
    },[])
    if(ingredientArr.length===0){
        ingredientArr=<div><p>Please Add Some Ingrediens!</p></div>
    }
  return (
    <div className='Burger'>
        <Ingredient type='Top' />
        {ingredientArr}
        <Ingredient type='Bottom' />
    </div>
    );;
}

