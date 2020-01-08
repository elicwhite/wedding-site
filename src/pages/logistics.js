import React from 'react';

import SEO from '../components/seo';

import { withPrivateRoute } from '../components/privateRoute';

const LogisticsPage = () => {
  return (
    <>
      <SEO title="Logistics" />
      <div
        className="section"
        style={{
          marginTop: '34px',
        }}
      >
        <div className="section-container">
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

          <h3 className="cursive">Travel</h3>
          <p>
            Our venue is very close to the San Jose Airport. SFO and Oakland are
            also reasonable options.
          </p>

          <h3 className="cursive">Hotels</h3>
          <p>
            Room block information to come later. As we are in downtown San Jose
            there are many hotels within a few minute walking distance.
          </p>

          <h3 className="cursive">Things to do</h3>
          <p>We don't know what to do yet!</p>
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

export default withPrivateRoute(LogisticsPage);
