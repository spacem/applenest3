import { Component } from 'react';

interface SavingProps {
  saving?: boolean;
}

export class Saving extends Component<SavingProps, {}> {
  render() {
    if (this.props.saving) {
      return <>Saving...</>;
    } else {
      return this.props.children;
    }
  }
}
