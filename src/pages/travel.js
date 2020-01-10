import React, { useState } from 'react';

import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';
import ComingSoon from '../components/comingSoon';

import { withPrivateRoute } from '../components/privateRoute';

const TravelPage = () => {
  return (
    <>
      <SEO title="Travel" />
      <div className="section">
        <div className="section-container narrow-column">
          <h3 className="cursive">Airport</h3>
          <div className="caps-subheader accent">
            Mineta San Jose International Airport
          </div>
          <p>
            Our venue is about 4 miles from Norman Y. Mineta San Jose
            International Airport (SJC). Rideshare from the airport is about
            $8-$20.
          </p>
          <p>
            San Francisco International Airport (SFO) and Oakland International
            Airport (OAK) are also options but are about 35 miles away.
          </p>
          <br />

          <h3 className="cursive">Hotels</h3>
          <ComingSoon />
        </div>
      </div>
      <GetUpdatesSection />
      <div className="section">
        <div className="section-container narrow-column">
          <h3 className="cursive">Explore</h3>
          <div className="caps-subheader accent">
            A Glimpse of Silicon Valley
          </div>
          <div className="place">
            <h4>Apple Park Visitor Center</h4>
            <p>
              Get a glimpse into Holly's workplace.
              <br />
              <a
                href="https://www.apple.com/retail/appleparkvisitorcenter/"
                target="blank"
                className="accent"
              >
                learn more
              </a>
            </p>
          </div>

          <div className="place">
            <h4>Computer History Museum</h4>
            <p>
              Learn about the tech that makes Silicon Valley unique!
              <br />
              <a
                href="https://computerhistory.org"
                target="blank"
                className="accent"
              >
                visit website
              </a>
            </p>
          </div>

          <div className="place">
            <h4>Walk Downtown Redwood City</h4>
            <p>
              Check out our neighborhood and enjoy the atmosphere, restaurants,
              and movie theater.
              <br />
              <a
                href="http://www.downtownredwoodcity.org"
                target="blank"
                className="accent"
              >
                learn more
              </a>
            </p>
          </div>

          <div className="place">
            <h4>Shop & Eat in Walkable Downtowns</h4>
            <p>
              Explore some of the other cities and walkable areas including: San
              Pedro Square, Santana Row, Downtown Sunnyvale, Downtown Mountain
              View, Downtown Palo Alto, and Downtown San Carlos.
            </p>
          </div>

          <h3 className="cursive">Eat</h3>
          <div className="caps-subheader accent">Our Favorite Eats</div>
          <div className="place">
            <span>San Jose, CA</span>
            <h4>Falafel's Drive In</h4>
            <p>
              Casual mediterranean eats featured on Guy Fieri's Diners,
              Drive-Ins and Dives. Grab a "Best Value" for a perfect falafel
              pita and banana shake.
              <br />
              <a
                href="https://goo.gl/maps/B6PUBxTZqYvUp2T18"
                target="blank"
                className="accent"
              >
                get directions
              </a>
            </p>
          </div>

          <br />
          <div className="place">
            <span>San Jose, CA</span>
            <h4>Smoking Pig BBQ Company</h4>
            <p>
              Get the brisket, cornbread, and mac and cheese at this unassuming
              BBQ joint. Holly loves that you can request a "lean" cut of meat!
              <br />
              <a
                href="https://goo.gl/maps/uxCY2X17Fp6E5a7D9"
                target="blank"
                className="accent"
              >
                get directions
              </a>
            </p>
          </div>

          <br />
          <div className="place">
            <span>Belmont, CA</span>
            <h4>Shalizaar</h4>
            <p>
              One of Eli's favorite places serving persian kabobs and delicious
              fresh baked flatbread.
              <br />
              <a
                href="https://goo.gl/maps/KMCBr3B7nzvSxfFUA"
                target="blank"
                className="accent"
              >
                get directions
              </a>
            </p>
          </div>

          <br />
          <div className="place">
            <span>San Carlos, CA</span>
            <h4>Johnston's Saltbox</h4>
            <p>
              One of Holly's favorite places serving local New American cuisine
              in a small, often busy location.
              <br />
              <a
                href="https://goo.gl/maps/Ci518TQzJmY1dqty9"
                target="blank"
                className="accent"
              >
                get directions
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withPrivateRoute(TravelPage);
