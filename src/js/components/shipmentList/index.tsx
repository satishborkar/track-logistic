import React from "react";

interface ShipmentList {
  data: any;
  onDetails?: any;
  onDataSort?: any;
}

const ShipmentList: React.FC<ShipmentList> = ({
  data,
  onDetails,
  onDataSort
}) => {
  return (
    <div className="shipment-list-container">
      <table className="list" cellPadding={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>
              ID
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "name");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "name");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Shipment Name
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "name");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "name");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Source
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "origin");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "origin");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Destination
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "destination");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "destination");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Type
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "type");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "type");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Mode
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "mode");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "mode");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>
              Status
              <span
                className="sort-asc"
                onClick={() => {
                  onDataSort("asc", "status");
                }}
              >
                &#8593;
              </span>
              <span
                className="sort-desc"
                onClick={() => {
                  onDataSort("desc", "status");
                }}
              >
                &#8595;
              </span>
            </th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>

                  <td>{item.origin}</td>
                  <td>{item.destination}</td>
                  <td>{item.type}</td>
                  <td>{item.mode}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      onClick={() => {
                        onDetails(item);
                      }}
                      className="btn-link"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          {data && data.length === 0 && (
            <tr>
              <td colSpan={8}>
                <div className="no-data-found">No data found</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;
