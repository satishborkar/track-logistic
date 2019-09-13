import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as actionCreator from "../actions/actionCreators";

import Layout from "../components/layout";
import Loader from "../components/loader";

interface ShipmentDetailsProps {
  shipments: any;
  shipment: any;
  match: any;
  actions: any;
  history: any;
}

class ShipmentDetails extends React.Component<ShipmentDetailsProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shipment: {},
      isEditMode: false
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.updateShipment = this.updateShipment.bind(this);
  }

  componentWillMount() {
    const { shipments, match, actions } = this.props;
    const id = match.params.id;
    if (shipments && shipments.data && shipments.data.length > 0) {
      const currentShipment = shipments.data.filter(shipment => {
        return shipment.id === id;
      });
      this.setState({
        name: currentShipment[0].name,
        shipment: currentShipment[0]
      });
    } else {
      actions.getShipment(id);
    }
  }

  toggleEditMode(e) {
    e.preventDefault();
    this.setState({
      isEditMode: !this.state.isEditMode
    });
  }

  updateShipment(e) {
    const { actions, history } = this.props;
    const { name, shipment } = this.state;
    e.preventDefault();
    if (name !== shipment.name) {
      actions.updateShipment({
        ...shipment,
        name: name
      });
      history.push("/");
    }
    return;
  }

  onHandleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { name, shipment, isEditMode } = this.state;
    const { isFetching, isFetchingError } = this.props.shipment;

    if (!shipment || isFetching) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }

    if (isFetchingError) {
      return (
        <Layout>
          <p>Sorry!, there is a problem with fetching shipment</p>
        </Layout>
      );
    }

    return (
      <Layout>
        <h2 className="details-heading">
          Shipment Details
          <Link to="/">&#8592; Back</Link>
        </h2>
        <div className="shipment-details-container">
          <form>
            <div className="row">
              <div className="col-5">
                <label htmlFor="name">ID</label>
                <div className="value-holder">{shipment.id}</div>
              </div>
              <div className="col-5">
                <label htmlFor="name">Name</label>
                <div className="value-holder">
                  {isEditMode ? (
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="form-input"
                      id="name"
                      placeholder="Update name"
                      onChange={this.onHandleChange}
                    />
                  ) : (
                    name
                  )}

                  {!isEditMode ? (
                    <button
                      type="button"
                      className="link-small"
                      onClick={this.toggleEditMode}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="link-small"
                      onClick={this.updateShipment}
                      disabled={name === shipment.name}
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label htmlFor="name">User ID</label>
                <div className="value-holder">{shipment.userId}</div>
              </div>
              <div className="col-5">
                <label htmlFor="name">Status</label>
                <div className="value-holder">{shipment.status}</div>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label htmlFor="name">Source</label>
                <div className="value-holder">{shipment.origin}</div>
              </div>
              <div className="col-5">
                <label htmlFor="name">Destination</label>
                <div className="value-holder">{shipment.destination}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <label htmlFor="name">Type</label>
                <div className="value-holder">{shipment.type}</div>
              </div>
              <div className="col-5">
                <label htmlFor="name">Mode</label>
                <div className="value-holder">{shipment.mode}</div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <label htmlFor="name">Total</label>
                <div className="value-holder">{shipment.total}</div>
              </div>
            </div>

            <div className="row row-no-border">
              {shipment.services && shipment.services.length > 0 && (
                <div className="col-5">
                  <label htmlFor="name">Cargo</label>
                  <div className="value-holder">
                    <table className="list" cellPadding={0} cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipment.services.map((service, index) => {
                          return (
                            <tr key={index}>
                              <td>{service.type}</td>
                              <td>{service.value}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {shipment.cargo && shipment.cargo.length > 0 && (
                <div className="col-5">
                  <label htmlFor="name">Cargo</label>
                  <div className="value-holder">
                    <table className="list" cellPadding={0} cellSpacing={0}>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Description</th>
                          <th>Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipment.cargo.map((cargoItem, index) => {
                          return (
                            <tr key={index}>
                              <td>{cargoItem.type}</td>
                              <td>{cargoItem.description}</td>
                              <td>{cargoItem.volume}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </Layout>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { shipment } = this.props;
    if (
      !nextProps.shipments.isFetchingError &&
      shipment.data !== nextProps.shipment.data
    ) {
      this.setState({
        name: nextProps.shipment.data.name,
        shipment: nextProps.shipment.data
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    shipments: state.shipments,
    shipment: state.shipment
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
)(ShipmentDetails);
