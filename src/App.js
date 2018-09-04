import React, { Component, Fragment  } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./routing/Routes";
import './App.css';
import {apiRequest} from "./constants";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userType: "",
      name: ""
    };
  }

  componentDidMount() {
    try {
      //chek user exist
      let token = localStorage.getItem('myToken');
      let name = localStorage.getItem('myName');
      if(token && token !== ""){
        this.userHasAuthenticated(true);
        this.setState({userType: token, name: name});
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    localStorage.removeItem('myToken');
    localStorage.removeItem('myName');
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  makeLogin = (token, email) =>{
    localStorage.setItem('myToken', token);
    this.userHasAuthenticated(true);
    this.setState({userType: token});

    let qs = "?email=" + email;
    fetch(apiRequest("/users/myprofile" + qs, null, null, token))
      .then(response => response.json())
      .then(data => {
        this.setState({ name: data.name })
        localStorage.setItem('myName', data.name);
      })

  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">User Management App</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {this.state.isAuthenticated
              ?<Nav pullRight>
                {this.state.userType === "admin_token"
                  ? <Fragment>
                       <LinkContainer to="/users">
                         <NavItem>Users</NavItem>
                       </LinkContainer>
                      </Fragment>
                  : ""
                }
                <NavItem onClick={this.handleLogout}>Logout</NavItem>
                <NavItem>Welcome {this.state.name}</NavItem>
               </Nav>
              :<Nav pullRight>
                <Fragment>
                 <LinkContainer to="/login">
                   <NavItem>Login</NavItem>
                 </LinkContainer>
                </Fragment>
               </Nav>
             }
          </Navbar.Collapse>
        </Navbar>
        <Routes makeLogin={this.makeLogin} childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
