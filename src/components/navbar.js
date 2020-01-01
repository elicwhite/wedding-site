import { Link } from 'gatsby';
import React from 'react';

function getProps({ isCurrent }) {
  return {
    style: {
      ...styles.link,
      ...(isCurrent ? styles.currentLink : {}),
    },
  };
}
const NavBar = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
      marginBottom: '10px',
    }}
  >
    <ul
      style={{
        textTransform: 'uppercase',
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
      }}
    >
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/">
          Home
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/rsvp">
          RSVP
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/gallery">
          Photos
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/events">
          Events
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/login">
          Login
        </Link>
      </li>
    </ul>
  </div>
);

const styles = {
  listItem: {
    fontFamily: 'MrsEavesAllPetiteCaps',
    fontSize: '28px',
    letterSpacing: '1px',
    lineHeight: 1,
    margin: 0,
  },
  link: {
    padding: '20px 15px',
    textDecoration: 'none',
    color: 'black',
    display: 'inline-block',
  },
  currentLink: {
    color: '#666',
  },
};

export default NavBar;
