import React, { Component } from "react";
import {apiRequest} from "../constants";

export default class Users extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      authenticated : false
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('myToken');

    fetch(apiRequest("/users", null, null, token))
      .then(response => {
        if(response.status === 403) {
          throw "no permission";
        }

        this.setState({authenticated : true});
        return response.json()
      })
      .then(data => {
        this.setState({ users: data })
      })
      .catch(error => {
        if(error === "no permission")
          this.setState({authenticated : false});
      });
  }

  render() {
    return (
      <div>
        {this.state.authenticated
        ?<div>
          <h1>User List</h1>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, index) => {
                return <tr key={index}><th scope="row">{index+1}</th><td>{user.email}</td><td>{user.name}</td></tr>
              })}
            </tbody>
          </table>
        </div>
        :<div>
          <h2>You are not authorised to see this page</h2>
        </div>
      }
      </div>
    )
  }
}
