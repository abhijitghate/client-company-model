import React from "react";
import { Card } from "antd";
import axios from "axios";

class SearchReasult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let searchString = this.props.location.state["data"];
    axios.get(`http://127.0.0.1:8000/api/${searchString}/`).then(res => {
      if (res.data) {
        console.log(res.data);
        this.setState({
          data: res.data
        });
      }
    });
  }
  render() {
    let searchresult;
    const data = this.state.data;
    searchresult = data.map(function(key, value) {
      return (
        <Card title={key["name"]}>
          <p>{key["name"]}</p>
        </Card>
      );
    });
    return <div>{searchresult}</div>;
  }
}

export default SearchReasult;
