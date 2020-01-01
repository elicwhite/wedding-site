import React from 'react';

import SEO from '../components/seo';

import { withPrivateRoute } from '../components/privateRoute';

const EventsPage = () => {
  return (
    <>
      <SEO title="Events" />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <iframe
          title="Wedding Event Map"
          src="https://www.google.com/maps/d/embed?mid=1N3kjqPTb_kVpkz1BPI0tfOOxNIhvRKMq"
          width="640"
          height="480"
        ></iframe>
      </div>
    </>
  );
};

export default withPrivateRoute(EventsPage);
