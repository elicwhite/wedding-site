import React from 'react';
import './header.css';

const Header = ({ inline }) => (
  <header
    className={'header ' + (inline ? 'inline' : '')}
    style={{
      paddingBottom: '30px',
      textAlign: 'center',
    }}
  >
    <div>
      <h1 className="names first">Holly</h1>
      <div className="and">and</div>
      <h1 className="names second">Eli</h1>
    </div>
  </header>
);

export default Header;
