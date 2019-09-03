import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      passsword: ""
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    alert("An essay was submitted: ");
    event.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label for="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
            onChange={e => this.onChange(e)}
          ></input>
          <label for="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="passsword"
            required
            onChange={e => this.onChange(e)}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
