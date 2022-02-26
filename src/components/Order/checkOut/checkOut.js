import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Button,Modal,ModalBody } from 'reactstrap'
import Spinner from '../../Spinner/Spinner'
import {resetIngredients} from '../../../redux/actionCreators'

const mapStateToProps=(state)=>{
    return{
      ingredients:state.ingredients,
      totalPrice:state.totalPrice,
      purchageable:state.purchageable,
      token:state.token,
      userId:state.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    resetIngredients:()=>dispatch(resetIngredients())
  }
  
}

class checkOut extends Component {
  state={
    values:{
      deliveryAddress:'',
      phone:'',
      paymentType:'Cash on delivery'
    },
    isLoading:false,
    isModalOpen:false,
    modalMsg:''
  }


  goBack=()=>{
    this.props.history.push("/")
  }


  handleSubmit=(token)=>{
    this.setState({
      isLoading:true
    })
    const order={
      ingredients:this.props.ingredients,
      customer:this.state.values,
      totalPrice:this.props.totalPrice,
      time: new Date(),
      userId:this.props.userId
    }
    axios.post("https://item-cart-28e70-default-rtdb.firebaseio.com/orders.json?auth=" + token,order)
    .then(response=>{
      if(response.status===200){
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Order placed successfully"
        })
        this.props.resetIngredients()
      }else{
        this.setState({
          isLoading:false,
          isModalOpen:true,
          modalMsg:"Order placed unsuccessful! Place again"
        })
      }
    })
    .catch(err=>{
      console.log(err.response)
      this.setState({
        isLoading:false,
        isModalOpen:true,
          modalMsg:"Something went wrong! Place try again"
      })
    })
    
  }

  inputHandler=(e)=>{
    this.setState({
      values:{
        ...this.state.values,
        [e.target.name]:e.target.value
      }
    })
  }
  render() {
    const form=(<div>
        <h4 className='mt-5 border rounded border-secondary p-3'>
          Total Price : {this.props.totalPrice} BDT</h4>
        <form className='mt-5 border rounded border-secondary p-4'>
          <textarea name="deliveryAddress" value={this.state.deliveryAddress}
          placeholder='Delivery address' className='form-control' onChange={(e)=>this.inputHandler(e)} />
          <br />
          <input name='phone' value={this.state.phone} placeholder='Enter phone number'
          className='form-control'onChange={(e)=>this.inputHandler(e)} />
          <br />

          <select name='paymentType' value={this.state.paymentType} className='form-control'
          onChange={(e)=>this.inputHandler(e)} >
              <option value='Cash on delivery'>Cash on delivery</option>
              <option value='Bkash'>Bkash</option>
          </select>
          <br />
          <Button color='primary' onClick={()=>this.handleSubmit(this.props.token)} >Place Order</Button>
          <Button color='secondary' className=' ml-2' onClick={this.goBack}>Cancel</Button>
        </form>
    </div>)
    return (
      <div>
        {this.state.isLoading ? <Spinner />:form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
          <ModalBody>{this.state.modalMsg}</ModalBody>
        </Modal>
      </div>
    )

  }
}
export default connect(mapStateToProps,mapDispatchToProps) (checkOut);
