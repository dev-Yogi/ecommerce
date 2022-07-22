import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "" };
  }

  render() {
    return (
      <div>
        <h4 className="m-1 p-2 border-bottom">Welcome</h4>

        <div class="card text-center">
  <div class="card-header fw-bold">
        READ ME
  </div>
  <div class="card-body">
    <p class="card-text fst-italic">This website is very basic with no design thought put into it. This is simply to demonstrate basic ReactJS concepts.
    </p>
    <h5> These are the technologies and concepts used to create this application:</h5>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">JavaScript</li>
    <li class="list-group-item">React</li>
    <li class="list-group-item">Node</li>
    <li class="list-group-item">Bootstrap</li>
    <li class="list-group-item">JSON</li>
    <li class="list-group-item">Props &amp; States</li>
    <li class="list-group-item">RESTful Service</li>
  </ul>
  </div>
</div>
            <h3 className="mt-4">Login</h3>
        {/* Email starts */}
        <div className="form-group form-row">
          <label className="col-lg-4">Email:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </div>
        {/* Email ends */}

        {/* Password starts */}
        <div className="form-group form-row">
          <label className="col-lg-4">Password:</label>
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>
        {/* Password ends */}

        <div className="text-right">
          {this.state.message}
          <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  } //end of render

  //Executes when the user clicks on Login
  onLoginClick = async () => {
    console.log(this.state);

    var response = await fetch(`http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`, 
    {
        method: "GET"
    });

    var body = await response.json();
    console.log(body);
    if(body.length > 0){
            //success
            this.setState({
                message: <span className="mr-2 text-success">Successfully Logged In</span>});
    }else{
        //error
        this.setState({
            message: <span className="mr-2 text-danger">Invalid Login. Please Try Again.</span>});
    }
}
}