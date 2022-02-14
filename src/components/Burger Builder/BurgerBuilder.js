import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls'
import { Button, Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Summary from './Summary/Summary';

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
         totalPrice:80,
         modalOpen:false,
         purchaseAble:false
      }
    }

    updatePurchaseAble=(ingredients)=>{
      const sum=ingredients.reduce((sum,element)=>{
          return sum+element.amount
      },0)
      this.setState({
        purchaseAble: sum>0
      })
    }

    toggleModal=()=>{
      this.setState({
        modalOpen:!this.state.modalOpen
      })
    }

    checkOut=()=>{
      this.props.history.push('/checkOut')
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
      this.updatePurchaseAble(ingredients)
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
      this.updatePurchaseAble(ingredients)
    }
    
  render() {
    return (
        <div>
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={this.state.ingredients} />
                <Controls added={this.addIngrident} remove={this.removeIngrident}
                totalPrice={this.state.totalPrice} toggleModal={this.toggleModal}
                 purchaseAble={this.state.purchaseAble}/>
            </div>
            <Modal isOpen={this.state.modalOpen}>
              <ModalHeader>Order Summary</ModalHeader>
              <ModalBody>
                  <h5>Total Price: {this.state.totalPrice}</h5>
                  <Summary ingredients={this.state.ingredients} />
              </ModalBody>
              <ModalFooter>
                <Button className='btn-success' onClick={this.checkOut}>Continue to checkout</Button>
                <Button className='btn-secondary' onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
        
    );
  }
}
