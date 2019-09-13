import React from "react";
import classNames from "classnames";

interface MessageFormat {
  type: string;
  value: string;
}

interface DisplayMessageProps {
  message: MessageFormat;
  timeOut?: number;
}

interface DisplayMessage {
  intervalID: any;
}

class DisplayMessage extends React.Component<DisplayMessageProps, any> {
  constructor(props) {
    super(props);

    this.intervalID = 0;
    this.state = {
      timeOut: this.props.timeOut || 1000,
      visibility: true
    };

    this.updateVisibility = this.updateVisibility.bind(this);
  }

  updateVisibility() {
    this.setState({
      visibility: false
    });
  }

  componentDidMount() {
    const { timeOut } = this.state;
    this.intervalID = setInterval(this.updateVisibility, timeOut);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { message } = this.props;
    const { visibility } = this.state;
    if (visibility) {
      return (
        <div className={classNames("message-holder", message.type)}>
          {message.value}
        </div>
      );
    }

    return null;
  }
}

export default DisplayMessage;
