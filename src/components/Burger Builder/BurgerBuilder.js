import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls'

const INGREDIENT_PRICE={
  Cheese:50,
  Meat:80,
  Salad:20
}

export default class BurgerBuilder extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         ingredients:[
            {type:'Cheese', amount:0},
            {type:'Meat', amount:0},
            {type:'Salad', amount:0},

         ],
         totalPrice:80
      }
    }

    addIngrident=(type)=>{
      let ingredients=[...this.state.ingredients]
      let newPrice=this.state.totalPrice+INGREDIENT_PRICE[type]
      for(let item of ingredients){
        if(item.type===type){
          item.amount++
        }
      }
      this.setState({
        ingredients:ingredients,
        totalPrice:newPrice
      })
    }

    removeIngrident=(type)=>{
      let ingredients=[...this.state.ingredients]
      let newPrice=this.state.totalPrice-INGREDIENT_PRICE[type]
      for(let item of ingredients){
        if(item.type===type){
          if(item.amount<=0){
            return;
          }
          item.amount--
        }
      }
      this.setState({
        ingredients:ingredients,
        totalPrice:newPrice
      })
    }
    
  render() {
    return (
        <div className='d-flex flex-md-row flex-column'>
            <Burger ingredients={this.state.ingredients} />
            <Controls added={this.addIngrident} remove={this.removeIngrident}
             totalPrice={this.state.totalPrice} />
        </div>
    );
  }
}
