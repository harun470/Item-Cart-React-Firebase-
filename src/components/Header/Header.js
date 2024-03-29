import React, { Component } from 'react';
import {Navbar,NavbarBrand,Nav,NavItem,NavbarToggler,Collapse} from 'reactstrap'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/burger.png'
import './Header.css'
import { connect } from 'react-redux';

const mapStateToProps=(state)=>{
    return{
        token:state.token
    }
}

 class Header extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         isNavOpen:false
      }
    }
    toggle=()=>{
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
  render() {
      let links=null;
      if(this.props.token==null){
          links=(
            <Nav className='ml-auto' navbar>
            <NavItem>
                <NavLink to='/login' className='nav-link'>Login</NavLink>
            </NavItem>
            
        </Nav>
          )
      }else{
          links=(
            <Nav className='ml-auto' navbar>
            <NavItem>
                <NavLink to='/' className='nav-link'>Burger-Builder</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to='/Order' className='nav-link'>Order</NavLink>
            </NavItem>  
            <NavItem>
                <NavLink exact to='/logout' className='nav-link'>Logout</NavLink>
            </NavItem>  
        </Nav>
          )
      }
    return (
        <div>
            <Navbar dark className='nav-bar' expand='sm'>
                <div className='container'>
                <NavbarBrand style={{cursor:'pointer'}}>
                    <img src={Logo} alt='burger' width='80px' />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                    {links}
                </Collapse>
                </div>
                
               
            </Navbar>
        </div>
        );
  }
}

export default connect(mapStateToProps)(Header)