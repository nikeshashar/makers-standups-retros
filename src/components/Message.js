import React, { Component } from 'react';

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <li>{this.props.userName}: {this.props.text}</li>
    )
  }
};

export default Message  ;
