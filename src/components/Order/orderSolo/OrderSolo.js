import React from 'react'

export default function OrderSolo(props) {
    let ingredientsArr=props.order.ingredients.map(item=>{
        return (
            <span className='border rounded border-secondary p-2 mr-2' >{item.type} X {item.amount}</span>
        )
    })
  return (
    <div className='mt-5 border rounded border-secondary p-3' >
        <p>Order Number: {props.order.id}</p>
        <p>Delivery Address: {props.order.customer.deliveryAddress}</p>
        <hr />
            {ingredientsArr}
        <hr />

        <p>Total Price : {props.order.totalPrice}</p>

    </div>
  )
}
