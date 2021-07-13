import { Component } from 'react';

interface ErrorProps {
  error?: Error;
}

export class ErrorMessage extends Component<ErrorProps, never> {
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
