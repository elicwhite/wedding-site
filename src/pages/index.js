import React from 'react';

import SEO from '../components/seo';

import { withPrivateRoute } from '../components/privateRoute';

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        We are getting married!
      </div>
    </>
  );
};

export default withPrivateRoute(IndexPage);
