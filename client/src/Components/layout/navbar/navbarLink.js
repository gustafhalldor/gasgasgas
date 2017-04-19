const React = require('react');
import {Link, IndexLink} from 'react-router';

class NavbarLink extends React.Component {
  render() {
    if (this.props.url === "/") {
      return (
        <IndexLink to={this.props.url} activeStyle={{ color: 'black' }}>{this.props.text}</IndexLink>
      );
    } else {
      return (
        <Link to={this.props.url} activeStyle={{ color: 'black' }}>{this.props.text}</Link>
      );
    }
  }
}

module.exports = NavbarLink;
