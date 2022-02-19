import * as actionType from './actionTypes'

const INGREDIENT_PRICE={
    Cheese:50,
    Meat:80,
    Salad:20
  }

  const Initial_State={
    ingredients:[
        {type:'Cheese', amount:0},
        {type:'Meat', amount:0},
        {type:'Salad', amount:0},

     ],
     totalPrice:80,
     purchaseAble:false
  }

  export const reducer=(state=Initial_State,action)=>{
         let ingredients=[...state.ingredients]
        switch(action.type){
            case actionType.ADD_INGREDIENTS:
                for(let item of ingredients){
                    if(item.type===action.payload){
                         item.amount++
                    }
                }
                return{
                    ...state,
                    ingredients:ingredients,
                    totalPrice:state.totalPrice+INGREDIENT_PRICE[action.payload]
                }
                case actionType.REMOVE_INGREDIENTS:
                    for(let item of ingredients){
                        if(item.type===action.payload){
                            if(item.amount<=0){
                                return state
                            }
                             item.amount--
                        }
                    }
                    return{
                        ...state,
                        ingredients:ingredients,
                        totalPrice:state.totalPrice-INGREDIENT_PRICE[action.payload]
                    }
                case actionType.UPDATE_PURCHASABLE:
                        const sum=state.ingredients.reduce((sum,element)=>{
                            return sum+element.amount
                        },0)
                        return{
                            ...state,
                            purchaseAble:sum>0
                        }   
            default:
                return state
        }
  }