import * as actionTypes from './actionTypes'

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