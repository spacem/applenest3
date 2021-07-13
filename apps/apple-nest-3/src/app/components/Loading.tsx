import { Component } from 'react';

interface LoadingProps {
  loading: boolean;
}

export class Loading extends Component<LoadingProps, never> {
  render() {
    if (this.props.loading) {
      return <>Loading...</>;
    } else {
      return this.props.children;
    }
  }
}
