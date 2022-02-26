import React, { Component } from 'react'
import { Formik } from 'formik'
import {auth} from '../../redux/authActionCreators'
import {connect} from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapDispatchToProps=(dispatch)=>{
    return{
        auth:(email,password,mode)=>dispatch(auth(email,password,mode))
    }
}

const mapStateToProps=(state)=>{
    return{
        authLoading:state.authLoading,
        authErr:state.authErr
    }
}

 class Auth extends Component {
     state={
         mode:'Sign up'
     }

     handleMode=()=>{
         this.setState({
             mode:this.state.mode==='Sign up'? 'Log in':'Sign up'
         })
     }
  render() {
 
      let error=null
      if(this.props.authErr !==null){
          error=<Alert color='danger' className='mt-2'>{this.props.authErr}</Alert>
      }
      let forms=null
      if(this.props.authLoading){
        forms=(
            <Spinner />
        )
      }else{
          forms=(
            <Formik
            initialValues={
                {
                    email:'',
                    password:'',
                    passwordConfirm:''
                }
            }
            onSubmit={
                (values)=>{
                    this.props.auth(values.email,values.password,this.state.mode)
                    
                }
            }
            validate={
                (values)=>{
                    const errors={}
                    if(!values.email){
                        errors.email='required'
                    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
                        errors.email="Invalid email"
                    }

                    if(!values.password){
                        errors.password='required'
                    }else if(values.password.length<6){
                        errors.password='Password must be atleast 6 digit'
                    }

                    if(this.state.mode ==='Sign up'){
                        if(!values.passwordConfirm){
                            errors.passwordConfirm='required'
                        }else if(values.passwordConfirm.length<6){
                            errors.passwordConfirm='Password must be atleast 6 digit'
                        }else if(values.password !== values.passwordConfirm){
                            errors.passwordConfirm='Password didnt match'
                        }
                    }
                    
                    return errors
                }
            }
          >
              {({values,handleSubmit,handleChange,errors})=>(
                  <div  style={{border:'1px solid grey',padding:'15px',
                                borderRadius:'7px', marginTop:'50px'}}>
                        <button style={{width:'100%'}} className='btn btn-lg btn-success' 
                        onClick={this.handleMode}>
                            Switch to {this.state.mode ==='Sign up'? 'Log in' :'Sign up'}
                        </button>
                            <br /> <br />
                            <form onSubmit={handleSubmit}>
                                <input 
                                    name='email'
                                    placeholder='Enter ur email'
                                    className='form-control'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{color:'red'}}>{errors.email}</span>
                                <br/>
                                <input 
                                    name='password'
                                    placeholder='Enter ur mobile number'
                                    className='form-control'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{color:'red'}}>{errors.password}</span>
                                <br/>
                                 {this.state.mode ==='Sign up'? <div>
                                 <input 
                                    name='passwordConfirm'
                                    placeholder='Enter ur mobile number'
                                    className='form-control'
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                />
                                <span style={{color:'red'}}>{errors.passwordConfirm}</span>
                                <br/>
                                 </div>:null}
                                <button type='submit' className='btn btn-success'>
                                    {this.state.mode==='Sign up'?'Sign up':'Log in'}
                                </button>
                      </form>
                  </div>
              )}
          </Formik>
          )
      }
    return (
      <div>
          {error}
         {forms}
      </div>
    )
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (Auth);
