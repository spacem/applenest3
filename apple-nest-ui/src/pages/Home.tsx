import { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  render() {
    return <>
    <h1>
      Apple Nest
    </h1>
    <div>
      <Link to="/select-character">Select Character</Link>
    </div>
    </>
  }
}