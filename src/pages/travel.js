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
            Blanco Venue and chosen hotels are about 4 miles from SJC.
            <br />
            Rideshare from the airport is about $8-$20.
          </p>
          <p>
            San Francisco International Airport (SFO) and Oakland (OAK) are also
            options but are about 35 miles away.
          </p>

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
          <h4>Apple Park Visitor Center</h4>
          <p>
            Get a glimpse into Holly's workplace.
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>

          <h4>Computer History Museum</h4>
          <p>
            Learn about the tech that makes Silicon Valley unique!
            <br />
            <a href="#" target="blank" className="accent">
              visit website
            </a>
          </p>

          <h4>Walk Downtown Redwood City</h4>
          <p>
            Check out our neighborhood and enjoy the atmosphere, restaurants,
            and movie theater.
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>

          <h4>Shope & Eat in Walkable Downtowns</h4>
          <p>
            Explore some of the other cities and walkable areas including: San
            Pedro Square, Santana Row, Downtown Sunnyvale, Downtown Mountain
            View, Downtown Palo Alto, and Downtown San Carlos.
          </p>

          <div className="caps-subheader accent">Our Favorite Eats</div>
          <h4>Falafel's Drive In</h4>
          <span>San Jose, CA</span>
          <p>
            Casual mediterranean eats featured on Guy Fieri's Diners, Drive-Ins
            and Dives.
            <br />
            Grab a "Best Value" for a perfect falafel pita and banana shake.
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>

          <br />
          <h4>Smoking Pig BBQ Company</h4>
          <span>San Jose, CA</span>
          <p>
            Get the brisket, cornbread, and mac and cheese at this unassuming
            BBQ joint.
            <br />
            Holly loves that you can request a "lean" cut of meat!
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>

          <br />
          <h4>Shalizaar</h4>
          <span>Belmont, CA</span>
          <p>
            One of Eli's favorite places serving persian kabobs and delicious
            fresh baked flatbread.
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>

          <br />
          <h4>Johnston's Saltbox</h4>
          <span>San Carlos, CA</span>
          <p>
            One of Holly's favorite places serving local New American cuisine in
            a small, often busy location.
            <br />
            <a href="#" target="blank" className="accent">
              learn more
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default withPrivateRoute(TravelPage);
