import React from "react";
import axios from "axios";
import Companies from "../components/Company";

class FavouriteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favlist: []
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    axios
      .post("http://127.0.0.1:8000/api/", {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        let data = [];
        res.data.map(function(value, key) {
          data.concat({
            id: value["comapny_id_id"],
            name: value["name"],
            liked: value["liked"],
            like_id: value["like_id"]
          });
        });
        this.setState({
          favlist: res.data
        });
      });
  }

  render() {
    return (
      <div>
        <Companies data={this.state.favlist} />
      </div>
    );
  }
}

export default FavouriteList;
