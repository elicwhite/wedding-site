import React, { useEffect, useState, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Spinner from '../components/spinner';
import './getUpdatesSection.css';

import useInput from '../hooks/useInput';

const URL =
  'https://script.google.com/macros/s/AKfycbyVaQG75kkOhAo8LmEXS0neJzz2lvTG1UeXzVC3lTnr-NqMDzAH/exec';
const LOCAL_STORAGE_KEY = 'completedUpdateForm';
// Has to be a string
const LOCAL_STORAGE_VALUE = 'set';

function GetUpdatesSection() {
  const [success, setSuccess] = useState(
    window.localStorage.getItem(LOCAL_STORAGE_KEY) === LOCAL_STORAGE_VALUE
  );
  const cameFromEnterMore = useRef(false);

  const content = success ? (
    <SuccessMessage
      onEnterMore={() => {
        cameFromEnterMore.current = true;
        setSuccess(false);
      }}
    />
  ) : (
    <EmailForm
      cameFromEnterMore={cameFromEnterMore.current}
      onComplete={() => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUE);
        cameFromEnterMore.current = false;
        setSuccess(true);
      }}
    />
  );

  return (
    <div className="section">
      <div className="section-container">
        <h3 className="cursive">Get Updates</h3>
        <div className="narrow-column">
          <p>
            Get email updates for important wedding announcements and when new
            information is posted.
          </p>
          <SwitchTransition>
            <CSSTransition
              key={success ? 'success' : 'not success'}
              addEndListener={(node, done) =>
                node.addEventListener('transitionend', done, false)
              }
              classNames="fade"
            >
              {content}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
    </div>
  );
}

function SuccessMessage({ onEnterMore }) {
  return (
    <>
      <p
        style={{
          fontSize: 'calc(28px * var(--font-size-multiplier))',
        }}
      >
        You're on our list.
      </p>

      <a
        href="#"
        className="enter-another-email"
        onClick={e => {
          e.preventDefault();
          onEnterMore();
        }}
      >
        Want updates sent to an additional email address? Click here.
      </a>
      <p
        style={{
          fontSize: '18px',
        }}
      >
        Can’t find the welcome email? Look for something from
        hollyandeli@gmail.com
      </p>
    </>
  );
}

function EmailForm({ cameFromEnterMore, onComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, emailInput, emailInputRef] = useInput({
    style: styles.emailInput,
    placeholder: 'email address*',
  });

  useEffect(() => {
    if (cameFromEnterMore && emailInputRef.current != null) {
      emailInputRef.current.focus();
    }
  }, [cameFromEnterMore, emailInputRef]);

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {};
    formData.email = email;

    fetch(URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        onComplete();
      })
      .catch(() => {
        onComplete();
      });
  };

  const submitOrSpinner = isSubmitting ? (
    <Spinner />
  ) : (
    <button type="submit" className="submit-button">
      Submit
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.inputContainer}>{emailInput}</div>
      <p
        style={{
          fontSize: '18px',
        }}
      >
        * we made this website, so we won't sell or share your personal
        information
      </p>

      <SwitchTransition>
        <CSSTransition
          key={isSubmitting ? 'submitting' : 'not submitting'}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="fade-fast"
        >
          {submitOrSpinner}
        </CSSTransition>
      </SwitchTransition>
    </form>
  );
}

const styles = {
  emailInput: {
    width: '100%',
    padding: '10px 20px 5px',
  },
  inputContainer: {
    maxWidth: '350px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'calc(10px * var(--font-size-multiplier))',
  },
};

export default GetUpdatesSection;
