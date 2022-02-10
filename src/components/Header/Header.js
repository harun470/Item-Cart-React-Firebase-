import React, { Component } from 'react';
import {Navbar,NavbarBrand,Nav,NavItem,NavLink,NavbarToggler,Collapse} from 'reactstrap'
import Logo from '../../assets/burger.png'
import './Header.css'


export default class Header extends Component {
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
    return (
        <div>
            <Navbar dark className='nav-bar' expand='sm'>
                <div className='container'>
                <NavbarBrand style={{cursor:'pointer'}}>
                    <img src={Logo} alt='burger' width='80px' />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav className='ml-auto' navbar>
                    <NavItem>
                        <NavLink className='nav-link'>Burger</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link'>LogIn</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link'>LogOut</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
                </div>
                
               
            </Navbar>
        </div>
        );
  }
}

