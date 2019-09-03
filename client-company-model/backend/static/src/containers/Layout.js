import React from "react";
import ReactDOM from "react-dom";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import SearchBox from "../components/SearchBox";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content } = Layout;

class CustomLayout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            {this.props.isAuthenticated ? (
              <Menu.Item key="1" onClick={()=>this.props.logout()}>
                Logout
              </Menu.Item>
            ) : (
              <Menu.Item key="1">
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

// const mapDispatchToProps = function(dispatch) {
//   return {
//     logout: dispatch(actions.logout())
//   };
// };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(CustomLayout)
);
