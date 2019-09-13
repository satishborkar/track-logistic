import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreator from "../actions/actionCreators";

import Layout from "../components/layout";
import Loader from "../components/loader";
import DisplayMessage from "../components/displayMessage";
import SearchShipment from "../components/searchShipment";
import ShipmentList from "../components/shipmentList";
import Pagination from "../components/pagination";

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: "",
      dataCopy: "",
      displayData: [],
      searchQuery: "",
      recordsPerPage: 20,
      message: {}
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onDetails = this.onDetails.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onDataSort = this.onDataSort.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.setPagination = this.setPagination.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.getShipments();
  }

  onInputChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  onDetails(shipment) {
    const { history } = this.props;
    history.push("/details/" + shipment.id);
  }

  onSearch() {
    const { data, dataCopy, searchQuery, recordsPerPage } = this.state;
    const pattern = new RegExp(searchQuery, "gi");
    const filteredData: string[] = [];
    if (!searchQuery || searchQuery.length === 0) {
      this.setState({
        data: dataCopy,
        displayData: dataCopy.slice(0, recordsPerPage)
      });
    }
    if (searchQuery.length > 0) {
      for (let i = 0; i < data.length; i++) {
        for (let param in data[i]) {
          if (
            typeof data[i][param] === "string" &&
            data[i][param].match(pattern)
          ) {
            filteredData.push(data[i]);
          }
        }
      }
      this.setState({
        data: [...new Set(filteredData)],
        displayData: [...new Set(filteredData)].slice(0, recordsPerPage)
      });
    }
  }

  onClearSearch() {
    this.setState(
      {
        searchQuery: ""
      },
      () => {
        this.onSearch();
      }
    );
  }

  onDataSort(sortType, fieldName) {
    function sortData(order, key) {
      return function(a, b) {
        const valueA =
          typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
        const valueB =
          typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
        let comparison = 0;
        if (valueA > valueB) {
          comparison = 1;
        } else if (valueA < valueB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }

    this.setState({
      displayData: this.state.displayData.sort(sortData(sortType, fieldName))
    });
  }

  setPagination(startIndex, endIndex) {
    const { data } = this.state;
    this.setState({
      displayData: data.slice(startIndex, endIndex)
    });
  }

  render() {
    const {
      data,
      searchQuery,
      displayData,
      recordsPerPage,
      message
    } = this.state;

    const { isFetching, isFetchingError } = this.props.shipments;

    if (!data || isFetching) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }

    if (isFetchingError) {
      return (
        <Layout>
          <DisplayMessage
            message={{
              type: "error",
              value:
                "Sorry, There is a problem with fetching shipments. please try again."
            }}
          />
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="search-panel">
          <div className="header-panel">
            <h2>Shipments</h2>
          </div>
          <SearchShipment
            searchQuery={searchQuery}
            onInputChange={this.onInputChange}
            onClearSearch={this.onClearSearch}
            onSearch={this.onSearch}
          />
        </div>
        {message && message.value && <DisplayMessage message={message} />}
        <ShipmentList
          data={displayData}
          onDetails={this.onDetails}
          onDataSort={this.onDataSort}
        />
        <Pagination
          data={data}
          limit={recordsPerPage}
          setPagination={this.setPagination}
        />
      </Layout>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { shipments, lastUpdatedShipment } = this.props;
    if (
      !nextProps.shipments.isFetchingError &&
      shipments.data !== nextProps.shipments.data
    ) {
      this.setState({
        data: nextProps.shipments.data,
        dataCopy: nextProps.shipments.data,
        displayData: nextProps.shipments.data.slice(
          0,
          this.state.recordsPerPage
        )
      });
    }

    if (lastUpdatedShipment !== nextProps.lastUpdatedShipment) {
      const { actions } = this.props;
      this.setState({
        message: {
          type: "success",
          value: "Shipment has been updated successfully"
        }
      });
      actions.getShipments();
    }
  }
}

function mapStateToProps(state) {
  return {
    shipments: state.shipments,
    lastUpdatedShipment: state.lastUpdatedShipment
  };
}

function mapDispatchToProps(dispatch) {
  const obj = {
    actions: bindActionCreators(actionCreator, dispatch)
  };

  return obj;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
