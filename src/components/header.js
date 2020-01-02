import PropTypes from 'prop-types';
import React from 'react';
import './header.css';

const Header = ({ inline }) => (
  <header
    style={{
      paddingBottom: '30px',
      marginBottom: `1.45rem`,
      textAlign: 'center',
      ...(inline
        ? {
            marginTop: '60px',
          }
        : {}),
    }}
  >
    <div className={inline ? 'inline' : ''}>
      <h1 className="names first">Holly</h1>
      <div className="and">and</div>
      <h1 className="names second">Eli</h1>
    </div>
  </header>
);

export default Header;
