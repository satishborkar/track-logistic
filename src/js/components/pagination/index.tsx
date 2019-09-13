import React from "react";

interface PaginationProps {
  data: any;
  limit: number;
  setPagination: any;
}

class Pagination extends React.Component<PaginationProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      pages: 0
    };
  }

  componentWillMount() {
    const { data, limit } = this.props;

    this.setState({
      pages: Math.ceil(data.length / limit)
    });
  }

  componentWillReceiveProps(nextPros) {
    const { data, limit } = this.props;
    if (nextPros.data !== data) {
      this.setState({
        pages: Math.ceil(nextPros.data.length / limit)
      });
    }
  }

  render() {
    const { pages } = this.state;
    const { setPagination, limit } = this.props;
    let markup = [...Array(pages).keys()].map(i => ({
      id: i + 1,
      name: "page " + (i + 1),
      startIndex: limit * (i + 1) - limit,
      endIndex: limit * (i + 1) - 1
    }));

    if (pages > 1) {
      return (
        <div className="pagination-container">
          <ul>
            {markup.map((page, index) => {
              return (
                <li key={index}>
                  <button
                    onClick={() => {
                      setPagination(page.startIndex, page.endIndex);
                    }}
                    className="btn-page"
                  >
                    {page.id}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Pagination;
