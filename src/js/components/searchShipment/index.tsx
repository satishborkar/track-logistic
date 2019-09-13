import React from "react";

interface SearchShipmentProps {
  searchQuery: string;
  onInputChange: any;
  onClearSearch: any;
  onSearch: any;
}

const SearchShipment: React.FC<SearchShipmentProps> = ({
  searchQuery,
  onInputChange,
  onClearSearch,
  onSearch
}) => {
  return (
    <div className="search-input">
      <input
        type="text"
        name="query"
        id="query"
        className="form-input"
        value={searchQuery}
        onChange={onInputChange}
        placeholder="Search shipment details"
      />

      {searchQuery.length > 0 && (
        <button className="clear-search" onClick={onClearSearch}>
          clear
        </button>
      )}

      <button
        className="btn"
        disabled={searchQuery.length === 0}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchShipment;
