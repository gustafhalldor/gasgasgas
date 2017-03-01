const React = require('react');
import {Link} from 'react-router';

class NavbarLink extends React.Component {
  render() {
    return (
      <Link to={this.props.url}>{this.props.text}</Link>
    );
  }
}

module.exports = NavbarLink;
