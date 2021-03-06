import React from "react";
import { Button } from "antd";

import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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
    const like_id = this.props.like_id;
    const token = localStorage.getItem("token");
    if (this.state.status) {
      axios({
        method: "DELETE",
        url: `http://127.0.0.1:8000/api/${like_id}/delete/`,
        headers: {
          Authorization: `Token ${token}`,
          xsrfCookieName: "csrftoken",
          xsrfHeaderName: "X-CSRFToken"
        }
      }).then(res => {
        console.log(res.data);
      });
    } else {
      axios
        .post("http://127.0.0.1:8000/api/create/", {
          params: { companyid },
          headers: {
            Authorization: `Token ${token}`
          },
          xsrfCookieName: "csrftoken",
          xsrfHeaderName: "X-CSRFToken"
        })
        .then(res => {
          console.log("After create");
          console.log(res.data);
        });
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
