import { Component } from 'react';

interface SavingProps {
  saving?: boolean;
}

export class Saving extends Component<SavingProps, never> {
  render() {
    if (this.props.saving) {
      return <div>Saving...</div>;
    } else {
      return this.props.children;
    }
  }
}
