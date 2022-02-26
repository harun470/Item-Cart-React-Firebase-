import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authLogout } from '../../redux/authActionCreators'

const mapDispatchToProps=(dispatch)=>{
    return{
        authLogout:()=>dispatch(authLogout())
    }
}

 class logOut extends Component {
    componentDidMount(){
        this.props.authLogout()
    }
    render() {
        return (
            <div>
                <Redirect to='/' />
            </div>
        )
    }
}

export default connect(null,mapDispatchToProps) (logOut);