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
      <div style={{ marginBottom: `1.45rem` }}>
        <div
          style={{
            padding: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            marginBottom: '30px',
          }}
        >
          <Image />
        </div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'MrsEavesAllPetiteCaps',
              fontSize: '35px',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '1px',
            }}
          >
            Please join us for our wedding celebration on
          </div>
          <div
            style={{
              fontFamily: 'MrsEavesAllPetiteCaps',
              fontSize: '61px',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '1px',
            }}
          >
            September 12th, 2020
          </div>
        </div>
      </div>
    </>
  );
};

export default withPrivateRoute(IndexPage);
