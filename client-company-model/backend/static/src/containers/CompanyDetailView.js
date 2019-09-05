import React from "react";
import { Card } from "antd";
import axios from "axios";

class CompanyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: []
    };
  }

  componentDidMount() {
    const companyId = this.props.match.params.companyId;
    axios.get(`http://127.0.0.1:8000/api/${companyId}`).then(res => {
      this.setState({
        company: res.data
      });
    });
  }

  render() {
    return <Card title={this.state.company.name}></Card>;
  }
}

export default CompanyDetail;
