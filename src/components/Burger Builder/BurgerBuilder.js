import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls'
import { Button, Modal,ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Summary from './Summary/Summary';
import { connect } from 'react-redux';
import { addIngredient,removeIngredient,updatePurchaseAble } from '../../redux/actionCreators';

const mapStateToProps=(state)=>{
  return{
    ingredients:state.ingredients,
    totalPrice:state.totalPrice,
    purchaseAble:state.purchaseAble
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    addIngredient:(igType)=>dispatch(addIngredient(igType)),
    removeIngredient:(igType)=>dispatch(removeIngredient(igType)),
    updatePurchaseAble:()=>dispatch(updatePurchaseAble())
  }
}

 class BurgerBuilder extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         modalOpen:false,
        
      }
    }

    toggleModal=()=>{
      this.setState({
        modalOpen:!this.state.modalOpen
      })
    }

    checkOut=()=>{
      this.props.history.push('/checkOut')
    }

    addIngridentHandle=(type)=>{
      this.props.addIngredient(type)
      this.props.updatePurchaseAble()
    }

    removeIngridentHandle=(type)=>{
      this.props.removeIngredient(type)
      this.props.updatePurchaseAble()
    }
    
  render() {
    return (
        <div>
            <div className='d-flex flex-md-row flex-column'>
                <Burger ingredients={this.props.ingredients} />
                <Controls added={this.addIngridentHandle} remove={this.removeIngridentHandle}
                totalPrice={this.props.totalPrice} toggleModal={this.toggleModal}
                 purchaseAble={this.props.purchaseAble}/>
            </div>
            <Modal isOpen={this.state.modalOpen}>
              <ModalHeader>Order Summary</ModalHeader>
              <ModalBody>
                  <h5>Total Price: {this.props.totalPrice}</h5>
                  <Summary ingredients={this.props.ingredients} />
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

export default connect(mapStateToProps,mapDispatchToProps) (BurgerBuilder)