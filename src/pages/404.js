import React from 'react';

import SEO from '../components/seo';

const NotFoundPage = () => (
  <div className="section">
    <div className="section-container">
      <SEO title="404: Not found" />
      <h3 className="cursive">Oops</h3>
      <p>This page does not exist!</p>
    </div>
  </div>
);

export default NotFoundPage;
