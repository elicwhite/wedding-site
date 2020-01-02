import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
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
      placeholder="enter password"
    />
  );

  return [value, input];
}

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
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <SEO title="Login" />
        <div
          className="caps-subheader"
          style={{
            marginBottom: '20px',
          }}
        >
          Please enter the password from the Save the Date
        </div>

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
    </>
  );
};

export default LoginPage;
