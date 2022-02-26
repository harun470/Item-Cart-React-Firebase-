import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredient=(igType)=>{
    return{
        type:actionTypes.ADD_INGREDIENTS,
        payload:igType
    }
}
export const removeIngredient=(igType)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENTS,
        payload:igType
    }
}
export const updatePurchaseAble=()=>{
    return{
        type:actionTypes.UPDATE_PURCHASABLE,
       
    }
}
export const resetIngredients=()=>{
    return{
        type:actionTypes.RESET_INGREDIENTS
    }
}

export const loadOrder=(orders)=>{
    return{
        type:actionTypes.LOAD_ORDER,
        payload:orders
    }
}
export const loadFailed=()=>{
    return{
        type:actionTypes.ORDER_LOAD_FAIL
    }
}

export const fetchOrder=(token,userId)=>{
    return (dispatch)=>{
        const queryParams='&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('https://item-cart-28e70-default-rtdb.firebaseio.com/orders.json?auth=' + token 
        + queryParams)
        .then(response=>{
            dispatch(loadOrder(response.data))
        })
        .catch(err=>{
            dispatch(loadFailed())
        })
    }
}