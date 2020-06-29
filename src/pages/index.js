import React from 'react';
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
          <h3 className="cursive">Save Our New Date</h3>
          <div className="caps-subheader">August 28th, 2021</div>
        </div>
      </div>

      <GetUpdatesSection />
    </>
  );
};

export default withPrivateRoute(IndexPage);
