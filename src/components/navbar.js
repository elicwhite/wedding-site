import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react';
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
        <Link getProps={getProps} to="/ourstory" onClick={onClick}>
          Our Story
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/logistics" onClick={onClick}>
          Logistics
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/travel" onClick={onClick}>
          Travel
        </Link>
      </li>
      <li style={styles.listItem}>
        <Link getProps={getProps} to="/registry" onClick={onClick}>
          Registry
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

function resetScroll() {
  // When the menu is hidden, we want to remain at the top of the scroll position
  const yOffset = parseInt(document.body.style.top, 10) * -1 || window.scrollY;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = ``;
  document.body.style.right = ``;
  window.scrollTo(0, yOffset);
}

function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const openClosedClass = isOpen ? 'open' : 'closed';

  useEffect(() => {
    if (isOpen) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.left = `0px`;
      document.body.style.right = `0px`;
      document.body.style.position = 'fixed';
    } else {
      resetScroll();
    }

    return () => {
      resetScroll();
    };
  }, [isOpen]);

  return (
    <>
      <div
        id="background-catch"
        className={openClosedClass}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <div id="mobile-nav" className={openClosedClass}>
        <div
          className="hamburger"
          onClick={() => {
            setIsOpen(open => !open);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div id="mobile-nav-menu" className={openClosedClass}>
          <ul className="menu">
            <Links
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </ul>
        </div>
      </div>
    </>
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
    color: 'var(--accent-color)',
  },
};

export default NavBar;
