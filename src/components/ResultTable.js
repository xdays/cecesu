import _ from "lodash";
import React, { Component } from "react";
import { Table } from "semantic-ui-react";

export default class ResultTable extends Component {
  state = {
    column: null,
    direction: null,
    data: []
  };

  componentDidUpdate() {
    this.handleSort("time");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data });
    }
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(this.props.data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return (
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "vendor" ? direction : null}
              onClick={this.handleSort("vendor")}
            >
              Vendor
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "region" ? direction : null}
              onClick={this.handleSort("region")}
            >
              Region
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "url" ? direction : null}
              onClick={this.handleSort("url")}
            >
              URL
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "time" ? direction : null}
              onClick={this.handleSort("time")}
            >
              Response Time
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ vendor, region, res }) => (
            <Table.Row key={`${vendor}-${region}`}>
              <Table.Cell>{vendor}</Table.Cell>
              <Table.Cell>{region}</Table.Cell>
              <Table.Cell>{res.config.url}</Table.Cell>
              <Table.Cell>{res.duration}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
