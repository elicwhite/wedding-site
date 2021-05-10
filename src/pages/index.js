import React from 'react';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import SEO from '../components/seo';

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
          <h3 className="cursive">We're Getting Married!</h3>
          <div className="caps-subheader">August 28th, 2021</div>

          <div className="shadow-frame">
            <Image />
          </div>
        </div>
      </div>
    </>
  );
};

export default withPrivateRoute(IndexPage);
