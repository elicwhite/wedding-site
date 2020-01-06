import React, { useState, useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './getUpdatesSection.css';

function GetUpdatesSection() {
  const [success, setSuccess] = useState(false);

  const content = success ? (
    <SuccessMessage
      onEnterMore={() => {
        setSuccess(false);
      }}
    />
  ) : (
    <EmailForm
      onComplete={() => {
        setSuccess(true);
      }}
    />
  );

  return (
    <div className="section">
      <div className="section-container">
        <h3 className="cursive">Get Updates</h3>
        <p
          style={{
            // Force the text to wrap the and to the next line
            maxWidth: '430px',
            margin: 'auto',
            marginBottom: 'calc(24px * var(--font-size-multiplier))',
          }}
        >
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
        want updates sent to an additional email address? click here.
      </a>
    </>
  );
}

function EmailForm({ onComplete }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrSpinner = isSubmitting ? (
    <Spinner />
  ) : (
    <button type="submit" style={styles.submit}>
      Submit
    </button>
  );

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }}
    >
      <input
        type="text"
        style={styles.emailInput}
        placeholder="email address*"
      />
      <p
        style={{
          fontSize: '16px',
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

function Spinner() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="var(--accent-color)"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

const styles = {
  emailInput: {
    width: '350px',
    padding: '10px 20px 5px',
    marginBottom: 'calc(10px * var(--font-size-multiplier))',
  },
  submit: {
    fontFamily: 'MrsEavesAllPetiteCaps',
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    padding: '10px 55px 5px',
    fontSize: '28px',
  },
};

export default GetUpdatesSection;
