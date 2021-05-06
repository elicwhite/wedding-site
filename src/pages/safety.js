import React from 'react';

import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';

import { withPrivateRoute } from '../components/privateRoute';

const SafetyPage = () => {
  return (
    <>
      <SEO title="Safety" />
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">COVID-19 Vaccines</h3>
          <div className="caps-subheader accent">
            All Guests Must be Vaccinated
          </div>
          <p>
            To provide a safe environment for all of our guests to celebrate
            with us, we are asking that all guests be fully vaccinated. This
            will allow us to be agile if restrictions change based on the
            county.
          </p>
          <p>
            Fully vaccinated status, as defined by the CDC, for COVID-19 is
            achieved 2 weeks after the second dose in a 2-dose series, or 2
            weeks after receiving a single-dose vaccine.
          </p>
          <p>
            If you have questions or concerns, please{' '}
            <a className="accent" href="mailto:hollyandeli@gmail.com">
              email us
            </a>
            .
          </p>
        </div>
      </div>
      <div className="section">
        <div className="section-container">
          <h3 className="cursive">State and Local Guidelines</h3>
          <p>
            Our wedding will be held in accordinace with all state and local
            guidelines. This is an ever changing situation - we will keep you
            updated via email and post here with any additional health and
            safety requirements for the event.
          </p>
        </div>
      </div>
      <GetUpdatesSection />
    </>
  );
};

export default withPrivateRoute(SafetyPage);
