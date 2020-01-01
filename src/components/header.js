import PropTypes from 'prop-types';
import React from 'react';

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
      <h1 style={{ ...styles.names, marginBottom: '34px' }}>Holly</h1>
      <div style={styles.and}>and</div>
      <h1 style={{ ...styles.names, marginTop: '6px' }}>Eli</h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

const styles = {
  names: {
    margin: 0,
    fontFamily: 'Faustine',
    fontSize: '124px',
    fontWeight: 400,
    lineHeight: 1,
  },
  and: {
    lineHeight: 1,
    fontFamily: 'Faustine',
    fontSize: '57px',
    fontWeight: 400,
  },
};

export default Header;
