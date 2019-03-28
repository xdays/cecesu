import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { getSite } from "../actions";
import siteURLs from "../data";

class App extends React.Component {
  componentDidMount() {
    Object.keys(siteURLs).forEach((key, index) => {
      siteURLs[key].map(site => this.props.getSite(key, site));
    });
  }

  render() {
    const { sites } = this.props;
    if (_.isEmpty(sites)) {
      return <div>Loading...</div>;
    }
    console.log(sites);
    sites.map(site => {
      console.log(site);
      return <div>{site.vendor}</div>;
    });
  }
}

const mapStateToProps = state => {
  return { sites: Object.values(state.sites) };
};

export default connect(
  mapStateToProps,
  { getSite }
)(App);
