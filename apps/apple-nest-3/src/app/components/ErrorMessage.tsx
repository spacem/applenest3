import { Component } from 'react';

interface ErrorProps {
  error: any;
}

export class ErrorMessage extends Component<ErrorProps, {}> {
  render() {
    if (this.props.error) {
      if (this.props.error.message) {
        return <>Error: {this.props.error.message}</>;
      } else {
        return <>Error...</>;
      }
    } else {
      return null;
    }
  }
}
