import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import LoginPage from "./loginPage";
import "antd/dist/antd.css";
import CustomLayout from "./containers/Layout";
// import CompanyList from "./containers/CompanyListView";
import BaseRouter from "./routes";
import SearchBox from "./components/SearchBox";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token != null
  };
};

const mapDispachToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
