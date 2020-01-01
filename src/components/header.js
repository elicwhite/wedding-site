import PropTypes from 'prop-types';
import React from 'react';
import './header.css';

const Header = ({ siteTitle }) => (
  <header
    style={{
      padding: '30px 0',
      marginBottom: `1.45rem`,
      textAlign: 'center',
      lineHeight: '1.4',
    }}
  >
    <div
      style={
        {
          // maxWidth: 960,
        }
      }
    >
      <h1 className="names first">Holly</h1>
      <div className="and">and</div>
      <h1 className="names second">Eli</h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
