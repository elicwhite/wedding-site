import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './login.css';
import '@lottiefiles/lottie-player';

import { handleLogin } from '../services/auth';
import SEO from '../components/seo';
import GetUpdatesSection from '../components/getUpdatesSection';
import useInput from '../hooks/useInput';

const LoginPage = () => {
  const [enteredSuccessfully, setEnteredSuccessfully] = useState(null);
  const [password, passwordInput, passwordInputRef] = useInput({
    autoCapitalize: 'off',
    autoComplete: 'off',
    placeholder: 'password',
    style: styles.input,
  });

  useEffect(() => {
    // When one character is entered, reset this state
    if (enteredSuccessfully === false) {
      setEnteredSuccessfully(null);
    }
  }, [password]);

  const handleSubmit = event => {
    event.preventDefault();

    const success = handleLogin({
      password: password,
    });

    setEnteredSuccessfully(success);
    if (success) {
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
  };

  return (
    <>
      <SEO title="Login" />
      <div className="section"></div>
      <div className="section" style={{ marginTop: '1.5rem' }}>
        <div
          className="section-container narrow-column"
          style={{ position: 'relative' }}
        >
          <h3 className="cursive">Welcome</h3>
          <p
            style={{
              marginBottom: 'calc(24px * var(--font-size-multiplier))',
            }}
          >
            Please enter the password from your Save the Date postcard for
            access to wedding details.
          </p>
          <form onSubmit={handleSubmit}>
            <SwitchTransition>
              <CSSTransition
                key={enteredSuccessfully === true ? 'success' : 'password'}
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
                classNames="fade"
              >
                {enteredSuccessfully ? (
                  <span
                    style={{
                      fontSize: 60,
                      verticalAlign: 'text-top',
                    }}
                    role="img"
                    aria-label="success"
                  >
                    <lottie-player
                      src="lf30_editor_IsTUTm.json"
                      background="transparent"
                      speed="1"
                      style={{
                        width: '300px',
                        height: '300px',
                      }}
                      autoplay
                    ></lottie-player>
                  </span>
                ) : (
                  <div>
                    {passwordInput}
                    <p />
                    <button type="submit" style={styles.submit}>
                      Submit
                    </button>
                  </div>
                )}
              </CSSTransition>
            </SwitchTransition>
          </form>

          <p
            className={`accent fade ${
              enteredSuccessfully === false ? 'fade-active' : ''
            }`}
            style={styles.incorrect}
          >
            Whoops! You've entered the wrong password.
          </p>
        </div>
      </div>
    </>
  );
};

const styles = {
  input: {
    width: '350px',
    padding: '10px 20px 5px',
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
