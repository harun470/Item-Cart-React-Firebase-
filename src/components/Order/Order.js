import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../../redux/actionCreators'
import OrderSolo from './orderSolo/OrderSolo'
import Spinner from '../Spinner/Spinner'

const mapStateToProps=(state)=>{
  return{
    order:state.order,
    orderLoading:state.orderLoading,
    orderErr:state.orderErr,
    token:state.token,
    userId:state.userId
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
  fetchOrder:(token,userId)=>dispatch(fetchOrder(token,userId))
  }
}

 class Order extends Component {
   componentDidMount(){
     this.props.fetchOrder(this.props.token,this.props.userId)
   }
  
 
  render() {
    let orderArr=null
    if(this.props.orderErr){
      orderArr=<p className='border rounded border-secondary p-2 mr-2 mt-5'>Order loading failed!</p>
    }else{
      if(this.props.order.length===0){
        orderArr=<p className='border rounded border-secondary p-2 mr-2 mt-5'>You have no order!</p>
      }else{
        orderArr= this.props.order.map(item=>{
          return <OrderSolo order={item} key={item.id} />
      })
      }
     
    }
   

    return (
      <div>{this.props.orderLoading? <Spinner /> :orderArr}</div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Order);