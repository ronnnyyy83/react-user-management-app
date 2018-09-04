import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import "./Login.css";
import {apiRequest} from "../constants";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    fetch(apiRequest("/login", "POST", {'Email': this.state.email, 'Password': this.state.password}))
    .then(response => {
      if(response.status === 401) {
        throw "no login";
      }

      return response.json()
    })
    .then(response => {
      this.props.makeLogin(response, this.state.email);
      this.props.history.push("/");
    })
    .catch(error => {
      if(error === "no login"){
        this.setState({ isLoading: false });
        alert("You credentials are wrong!");
      }
      else{
        alert(error);
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-group-lg">
            <label htmlFor="email" className="control-label">Email</label>
            <input type="email" id="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange}/>
          </div>
          <div className="form-group form-group-lg">
            <label htmlFor="password" className="control-label">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
      </div>
    );
  }
}
