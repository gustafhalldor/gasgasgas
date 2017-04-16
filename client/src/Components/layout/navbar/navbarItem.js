const React = require('react');
const NavBarLink = require('./navbarLink')
import Navbar from './navbar';
import styles from './navbaritem.css';

class NavbarItem extends React.Component {
  generateLink() {
  //Right now we don't need our class but what if we wanted to change the text, add an arrow or something?
    //Single responsibility principles tell us that it our "Item" should not handle this.
    return <NavBarLink key={this.props.id} url={this.props.url} text={this.props.text} />;
  }

  generateSubmenu() {
  //We generate a simple Navbar (the parent).
  //Spoilers: it takes items as its argument.
    return <Navbar items={this.props.submenu} />
  }

  generateContent() {
    let content = [this.generateLink()];
    if(this.props.submenu){
      //If there is a submenu in our data for this item
      //We add a generated Submenu to our content
      content.push(this.generateSubmenu());
    }
    return content;
  }

  // This collapses the expanded navbar after the user has clicked on a
  // navigation link.
  handleClick() {
    let el = document.querySelector('.navbar-toggle');
    el.className += " collapsed";
    el.setAttribute("aria-expanded", false);

    let el2 = document.querySelector('#navbar');
    el2.classList.remove("in");
    el2.setAttribute("aria-expanded", false);
  }

  render() {
    const content = this.generateContent();
    return (
      <li className={styles.fontsize} onClick={this.handleClick}>
        {content}
      </li>
    );
  }
}

module.exports = NavbarItem;
