import React, { Component } from 'react';
import BurgerBuilder from './Burger Builder/BurgerBuilder';
import Header from './Header/Header';
import {Route,Switch,Redirect} from 'react-router-dom'
import Order from './Order/Order';
import checkOut from './Order/checkOut/checkOut';
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import logOut from './Auth/logOut'

const mapStateToProps=(state)=>{
  return{
      token:state.token
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    authCheck:()=>dispatch(authCheck())
  }
}
 class Main extends Component {
   componentDidMount(){
    this.props.authCheck()
   }
   render(){
    let routes=null
    if(this.props.token===null){
       routes=(
             <Switch>
               <Route path='/login'  component={Auth} />
               <Redirect to='/login' />
             </Switch>
       )
    }else{
      routes=(
         <Switch>
           <Route path='/' exact component={BurgerBuilder} />
           <Route path='/Order' component={Order} />
           <Route path='/checkOut'  component={checkOut} />
           <Route path='/logout' component={logOut} />
           <Redirect to='/' />
         </Switch>
      )
    }
   return (
     <div>
         <Header />
         <div className='container'>
             {routes}
         </div>
     </div>
   );
   }
  
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)