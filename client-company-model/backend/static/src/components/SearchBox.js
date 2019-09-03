import React from "react";
import { Input } from "antd";
const { Search } = Input;
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      searchString: ""
    };
  }
  searchValue(value) {
    this.setState({
      searchString: value
    });
  }
  render() {
    let searchbox;
    if (this.state.searchString) {
      searchbox = (
        <Redirect
          to={{
            pathname: "/searchresult",
            state: { data: this.state.searchString }
          }}
        />
      );
    } else {
      searchbox = (
        <div>
          <Search
            placeholder="input search text"
            onSearch={value => this.searchValue(value)}
            style={{ width: 200 }}
          />
        </div>
      );
    }

    return <div>{searchbox}</div>;
  }
}

export default withRouter(SearchBox);
