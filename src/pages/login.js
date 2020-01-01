import React, { useEffect, useState } from 'react';
import { navigate, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './login.css';

import { handleLogin } from '../services/auth';
import SEO from '../components/seo';

function useInput() {
  const [value, setValue] = useState('');
  const input = (
    <input
      autoCapitalize="off"
      className="password-field"
      type="text"
      onChange={e => setValue(e.target.value)}
      value={value}
      placeholder="Enter Password"
    />
  );

  return [value, input];
}

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "proposal.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img
      fluid={data.placeholderImage.childImageSharp.fluid}
      style={{ height: '100vh' }}
    />
  );
};

const LoginPage = () => {
  const [enteredSuccessfully, setEnteredSuccessfully] = useState(false);
  const [password, passwordInput] = useInput();

  useEffect(() => {
    const success = handleLogin({
      password: password,
    });

    if (success) {
      setEnteredSuccessfully(success);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  }, [password]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <SEO title="Login" />
        <Image />
        <div
          style={{
            left: '50%',
            margin: 'auto',
            position: 'absolute',
            top: '70vh',
            transform: 'translateX(-50%)',
            fontSize: 30,
          }}
        >
          <SwitchTransition>
            <CSSTransition
              key={enteredSuccessfully ? 'success' : 'password'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="fade"
            >
              {enteredSuccessfully ? (
                <span
                  style={{
                    fontSize: 60,
                  }}
                  role="img"
                  aria-label="success"
                >
                  😍
                </span>
              ) : (
                passwordInput
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
