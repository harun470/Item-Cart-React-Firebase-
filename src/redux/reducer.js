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
     order:[],
     orderLoading:true,
     orderErr:false,
     totalPrice:80,
     purchaseAble:false,
     token:null,
     userId:null,
     authLoading:false,
     authErr:null
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
                case actionType.RESET_INGREDIENTS:
                    return{
                        ...state,
                        ingredients:[
                            {type:'Cheese', amount:0},
                            {type:'Meat', amount:0},
                            {type:'Salad', amount:0},
                    
                         ],
                         totalPrice:80,
                         purchaseAble:false
                    }  
                case actionType.LOAD_ORDER:
                    let order=[]
                    for(let key in action.payload){
                        order.push({
                            ...action.payload[key],
                            id:key
                        }) 
                    }
                  
                    return{
                        ...state,
                        order:order,
                        orderLoading:false
                    }
                case actionType.ORDER_LOAD_FAIL:
                    return{
                        ...state,
                        orderErr:true,
                        orderLoading:false
                    }
                case actionType.AUTH_SUCCESS:
                    return{
                        ...state,
                        token:action.payload.token,
                        userId:action.payload.userId
                    }
                case actionType.AUTH_LOGOUT:
                    return{
                        ...state,
                        token:null,
                        userId:null,
                        authErr:null
                    }
                case actionType.AUTH_LOADING:
                    return{
                        ...state,
                        authLoading:action.payload
                    }
                case actionType.AUTH_FAILED:
                    return{
                        ...state,
                        authErr:action.payload
                       
                    }
            default:
                return state
        }
  }