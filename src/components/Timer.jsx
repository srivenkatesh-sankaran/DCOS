import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  startTime: PropTypes.number,
};

const defaultProps = {
  startTime: 0,
};

class Timer extends Component {
  constructor(props) {
    super(props);

    this.intervalId = null;
    this.timeOnline = props.startTime;
    this.timeUnit = 'min';
    this.trackTime = this.trackTime.bind(this);

    this.state = {
      timeOnlineDisplay: props.startTime >= 60 ? props.startTime / 60 : props.startTime,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.trackTime, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  /**
   * Track server's time in minutes.
   */
  trackTime() {
    let { timeOnlineDisplay } = this.state;

    this.timeOnline += 1;

    // convert minutes to hours.
    if (this.timeUnit === 'min') {
      timeOnlineDisplay = this.timeOnline;
      if (this.timeOnline % 60 === 0) {
        timeOnlineDisplay = this.timeOnline / 60;
        this.timeUnit = 'h';
      }
    }

    // convert hours to days.
    if (this.timeUnit === 'h' && (this.timeOnline % (60 * 24) === 0)) {
      timeOnlineDisplay = this.timeOnline / (60 * 24);
      this.timeUnit = 'd';
    }

    this.setState({ timeOnlineDisplay });
  }

  render() {
    const { timeOnlineDisplay } = this.state;
    return (
      <div>
        {`Added ${timeOnlineDisplay} ${this.timeUnit} ago`}
      </div>
    );
  }
}

Timer.propTypes = propTypes;
Timer.defaultProps = defaultProps;

export default Timer;
