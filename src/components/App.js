import React from "react";
import _ from "lodash";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import { Header, Divider } from "semantic-ui-react";
import { getSite } from "../actions";
import siteURLs from "../data";
import ResultTable from "./ResultTable";

class App extends React.Component {
  componentDidMount() {
    Object.keys(siteURLs).forEach((key, index) => {
      siteURLs[key].map(site => this.props.getSite(key, site));
    });
  }

  render() {
    if (this.props.data.length === 0) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <Divider />
        <Header as="h3">VPS Speed Rank</Header>
        <ResultTable data={this.props.data} />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const valid_sites = Object.values(state.sites).filter(site => site.res);
  return {
    data: valid_sites.map(site => {
      return _.pick(site, [
        "vendor",
        "region",
        "res.config.url",
        "res.duration"
      ]);
    })
  };
};

export default connect(
  mapStateToProps,
  { getSite }
)(App);
