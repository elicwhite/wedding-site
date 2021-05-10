import React from 'react';

import SEO from '../components/seo';
import ComingSoon from '../components/comingSoon';

import { withPrivateRoute } from '../components/privateRoute';

const SHOW_REGISTRY = false;

const RegistryPage = () => {
  return (
    <>
      <SEO title="Registry" />
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Registry</h3>
          <div className="caps-subheader accent">Zola Gift Registry</div>
          <p>
            Your presence on our special day is the greatest present of all!
            However, if you do wish to celebrate with a gift, we have registered
            a list through Zola.
          </p>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.zola.com/registry/hollyandeli2021"
            className="submit-button"
            style={styles.viewRegistry}
          >
            View Registry
          </a>
        </div>
      </div>
    </>
  );
};

const styles = {
  viewRegistry: {
    display: 'inline-block',
    textDecoration: 'none',
  },
};

export default withPrivateRoute(RegistryPage);
