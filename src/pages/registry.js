import React, { useState } from 'react';

import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';
import ComingSoon from '../components/comingSoon';

import { withPrivateRoute } from '../components/privateRoute';

const SHOW_REGISTRY = false;

const RegistryPage = () => {
  const content = SHOW_REGISTRY ? <span>Registry!</span> : <ComingSoon />;

  return (
    <>
      <SEO title="Registry" />
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">Registry</h3>
          {content}
        </div>
      </div>
      <GetUpdatesSection />
    </>
  );
};

export default withPrivateRoute(RegistryPage);
