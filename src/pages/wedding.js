import React from 'react';

import SEO from '../components/seo';
import blancoImage from './blanco.png';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import { withPrivateRoute } from '../components/privateRoute';

const Invitation = () => {
  const data = useStaticQuery(graphql`
    query {
      invitation: file(relativePath: { eq: "invitation.png" }) {
        childImageSharp {
          preview: fluid(maxWidth: 900, quality: 100) {
            ...GatsbyImageSharpFluid
          }
          fullscreen: fluid(maxWidth: 1000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div
      style={{
        maxWidth: '80%',
        margin: 'auto',
      }}
    >
      <a
        href={data.invitation.childImageSharp.fullscreen.src}
        className="shadow-frame"
        target="_blank"
        style={{
          display: 'block',
          marginBottom: 0,
        }}
      >
        <Img fluid={data.invitation.childImageSharp.preview} />
      </a>
    </div>
  );
};

const WeddingPage = () => {
  return (
    <>
      <SEO title="Wedding" />
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Venue</h3>
          <div className="caps-subheader accent">Blanco Urban Venue</div>
          <img
            src={blancoImage}
            style={{
              width: '50%',
            }}
          />
          <p>
            Ceremony, cocktail hour, and reception will all be held at Blanco
            Urban Venue.
          </p>
          <p>
            <a href="https://goo.gl/maps/5Aw9RPZbZWeKLURp7" className="accent">
              12 N San Pedro St, San Jose, CA 95110
            </a>
          </p>
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <Invitation />
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Wedding</h3>
          <div className="caps-subheader accent">Coming Soon</div>
          <p>
            More details on when doors open and a timeline of events will be
            available at a later date.
          </p>
        </div>
      </div>
    </>
  );
};

function OldWeddingLayout() {
  return (
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
            August 28th, 2021
            <br />
            8 N San Pedro St #300
            <br />
            San Jose, CA 95110
            <br />
          </p>
        </div>
      </div>
    </>
  );
}

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
