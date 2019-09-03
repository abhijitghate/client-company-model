import React from "react";
import { Route } from "react-router-dom";
import Companies from "./components/Company";
import CompanyList from "./containers/CompanyListView";
import CompanyDetail from "./containers/CompanyDetailView";
import SearchReasult from "./components/SearchResult";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={CompanyList}></Route>
    <Route exact path="/:companyId" component={CompanyDetail}></Route>
    <Route
      exact
      path="/searchresult"
      render={props => <SearchReasult {...props} />}
    ></Route>
    <Route exact path="/login/" component={Login}></Route>
    <Route exact path="/signup/" component={Signup}></Route>
  </div>
);

export default BaseRouter;
