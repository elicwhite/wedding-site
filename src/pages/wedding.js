import React from 'react';

import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';
import ComingSoon from '../components/comingSoon';

import { withPrivateRoute } from '../components/privateRoute';

const SHOW_WEDDING = false;

const WeddingPage = () => {
  const content = SHOW_WEDDING ? (
    <>
      <h3 className="cursive">Ceremony & Reception</h3>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div className="shadow-frame" style={styles.mapContainer}>
            <div style={styles.mapInnerContainer}>
              <iframe
                style={styles.iframe}
                title="Wedding Event Map"
                src="https://www.google.com/maps/d/embed?mid=1N3kjqPTb_kVpkz1BPI0tfOOxNIhvRKMq"
              ></iframe>
            </div>
          </div>
        </div>
        <div style={styles.flex}>
          <p>
            September 12th, 2020
            <br />
            8 N San Pedro St #300
            <br />
            San Jose, CA 95110
            <br />
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      <h3 className="cursive">Wedding</h3>
      <ComingSoon />
    </>
  );
  return (
    <>
      <SEO title="Wedding" />
      <div className="section">
        <div className="section-container">{content}</div>
      </div>
      <GetUpdatesSection />
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
    maxWidth: '200px',
    marginRight: '16px',
  },
  mapInnerContainer: {
    overflow: 'hidden',
    height: '200px',
  },
  iframe: {
    width: '100%',
    position: 'relative',
    border: 0,
    top: -1 * MAP_HEADER_HEIGHT + 'px',
    height: 200 + MAP_HEADER_HEIGHT + 'px',
  },
};

export default withPrivateRoute(WeddingPage);
