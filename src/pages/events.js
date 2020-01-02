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
          flexWrap: 'wrap',
        }}
      >
        <div style={styles.flex}>
          <h3 class="cursive">Wedding Ceremony</h3>
          <p>
            4:00 PM, September 12th, 2020
            <br />
            8 N San Pedro St #300
            <br />
            San Jose, CA 95110
            <br />
          </p>

          <h3 class="cursive">After Party</h3>
          <p>
            10:00 PM, September 12th, 2020
            <br />
            8 N San Pedro St #300
            <br />
            San Jose, CA 95110
            <br />
          </p>
        </div>

        <div style={styles.flex}>
          <div class="shadow-frame" style={styles.mapContainer}>
            <div style={styles.mapInnerContainer}>
              <iframe
                style={styles.iframe}
                title="Wedding Event Map"
                src="https://www.google.com/maps/d/embed?mid=1N3kjqPTb_kVpkz1BPI0tfOOxNIhvRKMq"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MAP_HEADER_HEIGHT = 55;
const styles = {
  flex: {
    flex: 1,
    minWidth: '320px',
  },
  mapContainer: {
    overflow: 'hidden',
    padding: '8px',
  },
  mapInnerContainer: {
    overflow: 'hidden',
    height: '480px',
  },
  iframe: {
    width: '100%',
    position: 'relative',
    border: 0,
    top: -1 * MAP_HEADER_HEIGHT + 'px',
    height: 480 + MAP_HEADER_HEIGHT + 'px',
  },
};

export default withPrivateRoute(EventsPage);
