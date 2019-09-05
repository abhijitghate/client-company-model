import React from "react";
import { Button } from "antd";

import axios from "axios";

class LikeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const companyid = this.props.id;
    const token = localStorage.getItem("token");
    if (this.state.status) {
      axios({
        method: "delete",
        url: `http://127.0.0.1:8000/api/delete/`,
        headers: {
          Authorization: `Token ${token}`,
          xsrfHeaderName: "X-CSRFToken",
          xsrfCookieName: "csrftoken"
        },

        params: { companyid: companyid }
      }).then(res => {
        console.log(res.data);
      });
    } else {
      axios
        .post(`http://127.0.0.1:8000/api/create/${this.props.id}`, {
          headers: {
            Authorization: `Token ${token}`,
            xsrfCookieName: "csrftoken",
            xsrfHeaderName: "X-CSRFToken"
          }
        })
        .then();
    }
    let s = this.state.status;
    this.setState({
      status: !s
    });
  }

  componentDidMount() {
    this.setState({
      status: this.props.default
    });
  }
  render() {
    let likeStatus;
    if (this.state.status) {
      likeStatus = (
        <Button type="primary" onClick={this.handleClick}>
          Favourite
        </Button>
      );
    } else {
      likeStatus = (
        <Button type="primary" onClick={this.handleClick}>
          Mark as favourite
        </Button>
      );
    }

    return <div>{likeStatus}</div>;
  }
}

export default LikeBox;
