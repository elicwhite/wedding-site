import { Link } from 'gatsby';
import React, { useRef } from 'react';
import './navbar.css';

function getProps({ isCurrent }) {
  return {
    className: 'link',
    style: {
      ...styles.link,
      ...(isCurrent ? styles.currentLink : {}),
    },
  };
}

function Links({ onClick = () => {} }) {
  return (
    <>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/" onClick={onClick}>
          Home
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/rsvp" onClick={onClick}>
          RSVP
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/gallery" onClick={onClick}>
          Photos
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/events" onClick={onClick}>
          Events
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/login" onClick={onClick}>
          Login
        </Link>
      </li>
    </>
  );
}

function MobileNavBar() {
  const inputRef = useRef();

  return (
    <div id="mobile-nav">
      <input ref={inputRef} type="checkbox" />

      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul id="mobile-nav-menu" className="menu">
        <Links
          onClick={() => {
            inputRef.current.checked = false;
          }}
        />
      </ul>
    </div>
  );
}

const HorizontalNavBar = () => (
  <div
    id="horizontal-nav"
    style={{
      justifyContent: 'center',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
      marginBottom: '10px',
      padding: '15px',
    }}
  >
    <ul
      className="menu"
      style={{
        textTransform: 'uppercase',
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        justifyContent: 'center',
      }}
    >
      <Links />
    </ul>
  </div>
);

const NavBar = () => (
  <>
    <MobileNavBar />
    <HorizontalNavBar />
  </>
);

const styles = {
  listItem: {
    margin: 0,
  },
  link: {
    padding: '20px 15px',
  },
  currentLink: {
    color: '#666',
  },
};

export default NavBar;
