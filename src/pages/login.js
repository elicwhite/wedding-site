import React, { useEffect, useState, useRef } from 'react';
import { navigate } from 'gatsby';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './login.css';
import Lottie from 'react-lottie';
import animationData from './lf30_editor_6vOhkS.json';

import { handleLogin } from '../services/auth';
import SEO from '../components/seo';
import useInput from '../hooks/useInput';

const LoginPage = () => {
  const [enteredSuccessfully, setEnteredSuccessfully] = useState(null);
  const [password, passwordInput] = useInput({
    autoCapitalize: 'off',
    autoComplete: 'off',
    placeholder: 'password',
    style: styles.input,
  });
  const previousPassword = useRef(password);

  useEffect(() => {
    // When one character is entered, reset this state
    if (
      enteredSuccessfully === false &&
      previousPassword.current !== password
    ) {
      setEnteredSuccessfully(null);
    }

    previousPassword.current = password;
  }, [previousPassword, enteredSuccessfully, password]);

  const handleSubmit = event => {
    event.preventDefault();

    const success = handleLogin({
      password: password,
    });

    setEnteredSuccessfully(success);
  };

  return (
    <>
      <SEO title="Login" />
      <div className="section"></div>
      <SwitchTransition>
        <CSSTransition
          key={enteredSuccessfully === true ? 'success' : 'password'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="fade"
        >
          {enteredSuccessfully ? (
            <div style={{ marginTop: '50px' }}>
              <Lottie
                options={{
                  autoplay: true,
                  loop: false,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={200}
                width={200}
                eventListeners={[
                  {
                    eventName: 'complete',
                    callback: () => navigate(`/`),
                  },
                ]}
              />
            </div>
          ) : (
            <div className="section" style={{ marginTop: '1.5rem' }}>
              <div
                className="section-container narrow-column"
                style={{ position: 'relative' }}
              >
                <div>
                  <>
                    <h3 className="cursive">Welcome</h3>
                    <p
                      style={{
                        marginBottom:
                          'calc(24px * var(--font-size-multiplier))',
                      }}
                    >
                      Please enter the password from your invitation for access
                      to wedding details.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div style={styles.inputContainer}>{passwordInput}</div>
                        <p />
                        <button type="submit" style={styles.submit}>
                          Submit
                        </button>
                      </div>
                    </form>

                    <p
                      className={`accent fade ${
                        enteredSuccessfully === false ? 'fade-active' : ''
                      }`}
                      style={styles.incorrect}
                    >
                      Whoops! You've entered the wrong password.
                    </p>
                  </>
                </div>
              </div>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

const styles = {
  input: {
    width: '100%',
    padding: '10px 20px 5px',
  },
  inputContainer: {
    maxWidth: '350px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'calc(10px * var(--font-size-multiplier))',
  },
  incorrect: {
    marginBottom: 0,
  },
  submit: {
    fontFamily: 'MrsEavesAllPetiteCaps',
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    padding: '10px 55px 5px',
    fontSize: '28px',
    border: 0,
  },
};

export default LoginPage;
