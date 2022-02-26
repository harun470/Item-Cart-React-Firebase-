import * as actionTypes from './actionTypes'

import axios from "axios"



export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        payload:{
            token:token,
            userId:userId
        }
    }
}
export const authLoading=(isLoading)=>{
    return{
        type:actionTypes.AUTH_LOADING,
        payload:isLoading
    }
}
export const authErr=(errMsg)=>{
    return{
        type:actionTypes.AUTH_FAILED,
        payload:errMsg
    }
}


export const  auth=(email,password,mode)=>dispatch=>{
        dispatch(authLoading(true))
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let authURL=null;
        if(mode==='Sign up'){
            authURL="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
        }else{
            authURL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
        }
        const API_KEY="AIzaSyCM59ksNIXR3k-xmJlM_OnvQ7xwQ_iJywI";
        axios.post(authURL + API_KEY,authData)
        .then(response=>{
            dispatch(authLoading(false))
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('userId',response.data.localId)
            const expirationTime= new Date(new Date().getTime()+ response.data.expiresIn*1000)
            localStorage.setItem('expirationTime',expirationTime)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
        })
        .catch(err=>{
            dispatch(authLoading(false))
            dispatch(authErr(err.response.data.error.message))
        })
    }

    export const authLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationTime')
        return{
            type:actionTypes.AUTH_LOGOUT
        }
    }

    export const authCheck=()=>{
        return (dispatch)=>{
            const token=localStorage.getItem('token')
            const userId=localStorage.getItem('userId')
            const expirationTime= new Date(localStorage.getItem('expirationTime'))
            if(!token){
                //logout
                dispatch(authLogout())
            }else if(expirationTime<=new Date()){
                //logout
                dispatch(authLogout())
            }else{
                dispatch(authSuccess(token,userId))
            }
        }
    }


