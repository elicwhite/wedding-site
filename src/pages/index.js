import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';

import { withPrivateRoute } from '../components/privateRoute';

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "proposal.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />;
};

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" />
      <div className="section">
        <div className="section-container">
          <div className="shadow-frame">
            <Image />
          </div>
          <h3 className="cursive">Save Our Date</h3>
          <div className="caps-subheader">September 12th, 2020</div>
        </div>
      </div>

      <GetUpdatesSection />
    </>
  );
};

export default withPrivateRoute(IndexPage);
