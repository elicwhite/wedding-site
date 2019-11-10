import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby';
import {SwitchTransition, CSSTransition} from 'react-transition-group';
import "./login.css";

import { handleLogin } from '../services/auth';
import SEO from '../components/seo';

function useInput() {
  const [value, setValue] = useState('');
  const input = (
    <input type="text" onChange={e => setValue(e.target.value)} value={value} />
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
      <SEO title="Login" />
      <SwitchTransition>
        <CSSTransition key={enteredSuccessfully ? "success" : "password"}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames='fade'>
          {enteredSuccessfully ? <span>success!</span> : passwordInput}
        </CSSTransition>
      </SwitchTransition>

    </>
  );
};

export default LoginPage;
