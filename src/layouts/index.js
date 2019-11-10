import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions';
import Header from '../components/header';
import NavBar from '../components/navbar';
import './layout.css';

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />

      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <NavBar />
        <TransitionProvider
          location={location}
          enter={{
            opacity: 0,
            config: {
              duration: 500,
            },
          }}
          usual={{
            opacity: 1,
          }}
          leave={{
            opacity: 0,
            config: {
              duration: 250,
            },
          }}
        >
          <TransitionViews>{children}</TransitionViews>
        </TransitionProvider>
      </div>
    </>
  );
};

export default Layout;
