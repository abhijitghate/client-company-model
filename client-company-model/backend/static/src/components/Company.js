import React from "react";
import { List, Avatar, Icon, Card } from "antd";
import LikeBox from "./LikeBox";

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Companies extends React.Component {
  constructor(props) {
    super(props);
  }
  handleInputClick() {}

  render() {
    let companies;
    companies = this.props.data.map(function(key, value) {
      return (
        <Card title={key["name"]}>
          <p>{key["name"]}</p>
          <LikeBox
            like_id={key["like_id"]}
            default={key["liked"]}
            id={key["id"]}
          ></LikeBox>
        </Card>
      );
    });
    return <div>{companies}</div>;
  }
}

export default Companies;
