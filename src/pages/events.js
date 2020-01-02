import React from 'react';

import SEO from '../components/seo';

import { withPrivateRoute } from '../components/privateRoute';

const EventsPage = () => {
  return (
    <>
      <SEO title="Events" />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '34px',
        }}
      >
        <div style={styles.flex}>
          <h3 class="cursive">Wedding Ceremony</h3>
          <p>
            7:00 PM, August 1, 2017
            <br />
            Golden Gate Park Rose Garden
            <br />
            425 John F Kennedy Dr, San Francisco, CA 94118
            <br />
          </p>
        </div>

        <div style={styles.flex}>
          <iframe
            class="shadow-frame"
            style={styles.iframe}
            title="Wedding Event Map"
            src="https://www.google.com/maps/d/embed?mid=1N3kjqPTb_kVpkz1BPI0tfOOxNIhvRKMq"
            height="480"
          ></iframe>
        </div>
      </div>
    </>
  );
};

const styles = {
  flex: {
    flex: 1,
  },
  iframe: {
    width: '100%',
    border: 0,
  },
};

export default withPrivateRoute(EventsPage);
