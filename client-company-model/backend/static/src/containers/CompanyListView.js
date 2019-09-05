import React from "react";

import Companies from "../components/Company";
import SearchBox from "../components/SearchBox";

import axios from "axios";

class CompanyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/", {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => {
        this.setState({
          companies: res.data
        });
      });
  }

  render() {
    return (
      <div>
        <SearchBox></SearchBox>
        <Companies data={this.state.companies} />
      </div>
    );
  }
}

export default CompanyList;
