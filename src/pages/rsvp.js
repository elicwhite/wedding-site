import React, { useState, useReducer, useEffect } from 'react';

import SEO from '../components/seo';
import ComingSoon from '../components/comingSoon';
import RSVP_GROUP_DATA from './rsvp_data.json';
import useInput from '../hooks/useInput';
import Spinner from '../components/spinner';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import Lottie from 'react-lottie';
import animationData from './lf30_editor_6vOhkS.json';

import { withPrivateRoute } from '../components/privateRoute';

const URL =
  'https://script.google.com/macros/s/AKfycbytK-1S588_Z4M4MzV8M-nlyHKNargj6EXwtmPfIO3gZ-CpMBJo-3kEdDWj0wmZYqWhIw/exec';
const SHOW_RSVP = true;

/*
matching lower case names. Fuzzy?
Check if already submitted from google sheet?
Email validation?

test on mobile
*/

function findGroup(name) {
  return RSVP_GROUP_DATA.find(group => {
    return group.names
      .map(name => name.toLowerCase())
      .includes(name.toLowerCase());
  });
}

const RSVPPage = () => {
  const content = SHOW_RSVP ? (
    <RSVPForm />
  ) : (
    <>
      <div className="section">
        <div className="section-container narrow-column">
          <h3 className="cursive">Can't Attend?</h3>
          <div className="caps-subheader accent">We're going to miss you!</div>
          <p>
            It will greatly help with our planning to know if you are unable to
            attend. If you already know about a conflict kindly send your
            regrets via email to{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="accent"
              href="mailto:hollyandeli@gmail.com"
            >
              hollyandeli@gmail.com
            </a>
            .
          </p>
          <p>
            Excited to let us know you’re coming, or still unsure of your plans?
            You’ve still got time to figure it out - online RSVP will open at a
            later date.
          </p>

          <h3 className="cursive">RSVP</h3>
          <ComingSoon />
        </div>
      </div>
    </>
  );

  return (
    <>
      <SEO title="RSVP" />
      {content}
    </>
  );
};

function RSVPForm() {
  const [rsvpGroup, setRsvpGroup] = useState(null);
  const [previouslySubmittedData, setPreviouslySubmittedData] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  let content = null;
  let contentKey = null;
  if (rsvpGroup == null) {
    contentKey = 'find-name';
    content = (
      <FindNameOnGuestList
        onGroupFound={(group, alreadySubmittedData) => {
          setPreviouslySubmittedData(alreadySubmittedData);
          setRsvpGroup(group);
        }}
      />
    );
  } else if (previouslySubmittedData) {
    contentKey = 'already-submitted';
    content = <AlreadySubmitted response={previouslySubmittedData} />;
  } else if (submittedData) {
    contentKey = 'submitted-successfully';
    content = <RSVPSubmittedSuccessfully response={submittedData} />;
  } else {
    contentKey = 'enter-details';
    content = (
      <EnterDetails
        group={rsvpGroup}
        onSubmit={submittedData => {
          setSubmittedData(submittedData);
        }}
      />
    );
  }

  return (
    <>
      <div className="section">
        <div className="section-container" style={{ paddingBottom: '0px' }}>
          <h3 className="cursive">RSVP</h3>
          <div className="caps-subheader accent">On or before July 17</div>
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition
          key={contentKey}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="fade"
        >
          {content}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

function FindNameOnGuestList({ onGroupFound }) {
  const [name, nameInput] = useInput({
    placeholder: 'First and last name',
    style: styles.input,
  });
  const [group, setGroup] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!group) {
      return;
    }

    let expired = false;

    function reportAlreadySubmitted(alreadySubmittedData) {
      if (expired) {
        return;
      }

      expired = true;
      onGroupFound(group, alreadySubmittedData);
      setFetchingStatus(false);
    }
    if (fetchingStatus === true) {
      const name = group.names[0];

      const params = new URLSearchParams(
        group.names.map(name => ['name', name])
      );
      fetch(`${URL}?${params}`)
        .then(res => res.json())
        .then(result => {
          if (result.error) {
            console.error(
              'Received an error when looking up the RSVP status for',
              name,
              result.error
            );
            reportAlreadySubmitted(false);
          } else if (result.alreadySubmitted === false) {
            reportAlreadySubmitted(false);
          } else {
            reportAlreadySubmitted(result);
          }
        });
    }

    const timer = setTimeout(() => {
      reportAlreadySubmitted(false);

      expired = true;
    }, 15 * 1000);

    return () => {
      expired = true;
      clearTimeout(timer);
    };
  }, [fetchingStatus, group, onGroupFound]);

  useEffect(() => {
    if (showError) {
      setShowError(false);
    }
  }, [name]);

  const handleSubmit = event => {
    event.preventDefault();

    const group = findGroup(name.trim());

    if (group == null) {
      setGroup(false);
      setShowError(true);
    } else {
      setGroup(group);
      setFetchingStatus(true);
    }
  };

  const submitOrSpinner = fetchingStatus ? (
    <Spinner />
  ) : (
    <button type="submit" className="submit-button">
      Start Lookup
    </button>
  );

  return (
    <div>
      <div className="section">
        <div className="section-container narrow-column">
          <p>
            Enter any name listed on your invitation to find your information.
          </p>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: '1em',
              }}
            >
              <div>{nameInput}</div>
              {group === false && showError ? (
                <div>
                  <span style={styles.error}>
                    We're sorry, "{name}" was not found. Please make sure you've
                    entered your full name as it is written on your invitation.
                    If you need help, please{' '}
                    <a
                      className="accent"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="mailto:hollyandeli@gmail.com"
                    >
                      email us.
                    </a>
                  </span>
                </div>
              ) : null}
            </div>
            <SwitchTransition>
              <CSSTransition
                key={fetchingStatus ? 'checking' : 'not checking'}
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
                classNames="fade-fast"
              >
                {submitOrSpinner}
              </CSSTransition>
            </SwitchTransition>
          </form>
        </div>
      </div>
      <div className="section">
        <div className="section-container narrow-column">
          <p style={{ marginBottom: '0px' }}>
            If you are unable to use the website you may{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="accent"
              href="mailto:hollyandeli@gmail.com"
            >
              email us
            </a>{' '}
            or give us a call.
          </p>
        </div>
      </div>
    </div>
  );
}

function EnterDetails({ group, onSubmit }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'attending') {
        return {
          ...state,
          people: state.people.map(person => {
            return {
              ...person,
              attending:
                person.name === action.name ? action.value : person.attending,
            };
          }),
        };
      } else if (action.type === 'guest-attending') {
        return {
          ...state,
          guests: state.guests.map(guest => {
            return {
              ...guest,
              attending:
                guest.guestIndex === action.guestIndex
                  ? action.value
                  : guest.attending,
            };
          }),
        };
      } else if (action.type === 'person-vaccinated') {
        return {
          ...state,
          people: state.people.map(person => {
            return {
              ...person,
              vaccinated:
                person.name === action.name ? action.value : person.vaccinated,
            };
          }),
        };
      } else if (action.type === 'guest-vaccinated') {
        return {
          ...state,
          guests: state.guests.map(guest => {
            return {
              ...guest,
              vaccinated:
                guest.guestIndex === action.guestIndex
                  ? action.value
                  : guest.vaccinated,
            };
          }),
        };
      } else if (action.type === 'dinner') {
        return {
          ...state,
          people: state.people.map(person => {
            return {
              ...person,
              dinner:
                person.name === action.name ? action.value : person.dinner,
            };
          }),
        };
      } else if (action.type === 'guest-dinner') {
        return {
          ...state,
          guests: state.guests.map(guest => {
            return {
              ...guest,
              dinner:
                guest.guestIndex === action.guestIndex
                  ? action.value
                  : guest.dinner,
            };
          }),
        };
      } else if (action.type === 'guest-name') {
        return {
          ...state,
          guests: state.guests.map(guest => {
            return {
              ...guest,
              name:
                guest.guestIndex === action.guestIndex
                  ? action.name
                  : guest.name,
            };
          }),
        };
      } else if (action.type === 'group-email') {
        return {
          ...state,
          groupEmail: action.value,
        };
      } else if (action.type === 'validate') {
        const attendingErrors = state.people
          .map(person => {
            if (person.attending === 'choose') {
              return `attending-${person.name}`;
            }
            return null;
          })
          .concat(
            state.guests.map(guest => {
              if (guest.attending === 'choose') {
                return `attending-${guest.guestIndex}`;
              }

              return null;
            })
          );

        const vaccinationErrors = state.people
          .map(person => {
            if (
              person.attending === 'attending' &&
              person.vaccinated === false
            ) {
              return `vaccinated-${person.name}`;
            }

            return null;
          })
          .concat(
            state.guests.map(guest => {
              if (
                guest.attending === 'attending' &&
                guest.vaccinated === false
              ) {
                return `vaccinated-${guest.guestIndex}`;
              }

              return null;
            })
          );

        const dinnerErrors = state.people
          .map(person => {
            if (person.attending === 'attending' && person.dinner === 'none') {
              return `dinner-${person.name}`;
            }

            return null;
          })
          .concat(
            state.guests.map(guest => {
              if (guest.attending === 'attending' && guest.dinner === 'none') {
                return `dinner-${guest.guestIndex}`;
              }

              return null;
            })
          );

        const guestNameErrors = state.guests.map(guest => {
          if (
            guest.attending === 'attending' &&
            (guest.name === null || guest.name.trim() === '')
          ) {
            return `guestname-${guest.guestIndex}`;
          }

          return null;
        });

        const emailError =
          state.groupEmail === null || state.groupEmail.trim() === ''
            ? 'email'
            : null;

        const errors = attendingErrors
          .concat(vaccinationErrors)
          .concat(dinnerErrors)
          .concat(guestNameErrors)
          .concat([emailError])
          .filter(Boolean);

        return {
          ...state,
          errors: errors.length === 0 ? false : errors,
        };
      } else {
        throw new Error('unexpected action', action.type);
      }
    },
    {
      groupEmail: null,
      errors: null,
      people: group.names.map(name => {
        return {
          name,
          attending: 'choose',
          vaccinated: false,
          dinner: 'none',
        };
      }),
      guests:
        group.guests == null
          ? []
          : new Array(group.guests).fill(null).map((_, guestIndex) => {
              return {
                guestIndex,
                name: null,
                attending: 'choose',
                vaccinated: false,
                dinner: 'none',
              };
            }),
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: 'validate' });
  }

  useEffect(() => {
    if (state.errors !== false) {
      return;
    }

    // These are entered into the spreadsheet with columns matching key
    const spreadSheetData = state.people
      .map(person => ({
        name: person.name,
        groupEmail: state.groupEmail,
        attending: person.attending === 'attending' ? 'yes' : 'no',

        ...(person.attending === 'attending'
          ? {
              dinner: person.dinner,
              vaccinated: person.vaccinated ? 'yes' : 'no',
            }
          : null),
      }))
      .concat(
        state.guests.map(guest => ({
          name: guest.name,
          groupEmail: state.groupEmail,
          attending: guest.attending === 'attending' ? 'yes' : 'no',
          guestOf: state.people[0].name,
          ...(guest.attending === 'attending'
            ? {
                dinner: guest.dinner,
                vaccinated: guest.vaccinated ? 'yes' : 'no',
              }
            : null),
        }))
      );

    fetch(URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(spreadSheetData),
    });

    onSubmit(spreadSheetData);
  }, [state.errors]);

  return (
    <div className="section force-transparent">
      <div
        className="section-container narrow-column force-transparent"
        style={{
          paddingTop: 0,
        }}
      >
        <form onSubmit={handleSubmit}>
          {state.people.map(person => {
            return (
              <div key={person.name} style={styles.personSection}>
                <h4 style={styles.nameHeader}>{person.name}</h4>
                <div style={styles.selectionWrapper}>
                  <label>
                    <div className="accent caps-subheader">Response</div>

                    <select
                      style={styles.selectInput}
                      value={person.attending}
                      onChange={e => {
                        dispatch({
                          type: 'attending',
                          name: person.name,
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="choose">Attending?</option>
                      <option value="attending">Will Attend</option>
                      <option value="notattending">Regretfully Declines</option>
                    </select>
                  </label>

                  {(state.errors || []).includes(`attending-${person.name}`) ? (
                    <div>
                      <span style={styles.error}>*required</span>
                    </div>
                  ) : null}
                </div>
                <SwitchTransition>
                  <CSSTransition
                    key={`${person.name}-${person.attending}`}
                    addEndListener={(node, done) =>
                      node.addEventListener('transitionend', done, false)
                    }
                    classNames="fade-fast"
                  >
                    {person.attending === 'attending' ? (
                      <div>
                        <div style={styles.selectionWrapper}>
                          <label>
                            <div className="accent caps-subheader">
                              Dinner Selection
                            </div>

                            <select
                              style={styles.selectInput}
                              value={person.dinner}
                              onChange={e => {
                                dispatch({
                                  type: 'dinner',
                                  name: person.name,
                                  value: e.target.value,
                                });
                              }}
                            >
                              <option value="none">Select a meal</option>
                              <option value="beef">Beef</option>
                              <option value="chicken">Chicken</option>
                              <option value="veggie">Vegetarian</option>
                            </select>
                          </label>

                          {(state.errors || []).includes(
                            `dinner-${person.name}`
                          ) ? (
                            <div>
                              <span style={styles.error}>*required</span>
                            </div>
                          ) : null}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <input
                            id={`${person.name} vax`}
                            style={{
                              marginTop: '.2em',
                            }}
                            type="checkbox"
                            checked={person.vaccinated}
                            onChange={e => {
                              dispatch({
                                type: 'person-vaccinated',
                                name: person.name,
                                value: e.target.checked,
                              });
                            }}
                          />
                          <label
                            htmlFor={`${person.name} vax`}
                            style={{
                              flex: 2,
                              textAlign: 'left',
                              marginLeft: '.5em',
                            }}
                          >
                            {person.name} will be fully vaccinated as{' '}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="accent"
                              href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/fully-vaccinated-guidance.html"
                            >
                              defined by the CDC
                            </a>{' '}
                            before 8.28.21. I understand that this is a
                            requirement for attending.
                          </label>
                        </div>
                        {(state.errors || []).includes(
                          `vaccinated-${person.name}`
                        ) ? (
                          <span style={styles.error}>
                            *required. All guests must be fully vaccinated in
                            order to attend. If you are unable to get
                            vaccinated, please contact us or select the
                            regretfully declines option.
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <div />
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </div>
            );
          })}

          {state.guests.map(guest => {
            return (
              <div key={guest.guestIndex} style={styles.personSection}>
                <h4 style={styles.nameHeader}>Guest</h4>

                <div style={styles.selectionWrapper}>
                  <label>
                    <div className="accent caps-subheader">Response</div>

                    <select
                      style={styles.selectInput}
                      value={guest.attending}
                      onChange={e => {
                        dispatch({
                          type: 'guest-attending',
                          guestIndex: guest.guestIndex,
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="choose">Attending?</option>
                      <option value="attending">Bringing a Guest</option>
                      <option value="notattending">Not Bringing a Guest</option>
                    </select>
                  </label>

                  {(state.errors || []).includes(
                    `attending-${guest.guestIndex}`
                  ) ? (
                    <div>
                      <span style={styles.error}>*required</span>
                    </div>
                  ) : null}
                </div>
                <SwitchTransition>
                  <CSSTransition
                    key={`${guest.guestIndex}-${guest.attending}`}
                    addEndListener={(node, done) =>
                      node.addEventListener('transitionend', done, false)
                    }
                    classNames="fade-fast"
                  >
                    {guest.attending === 'attending' ? (
                      <div>
                        <div style={styles.selectionWrapper}>
                          <label>
                            <div className="accent caps-subheader">
                              Guest's Name
                            </div>

                            <input
                              style={styles.input}
                              type="text"
                              value={guest.name || ''}
                              placeholder="First and last name"
                              onChange={e => {
                                dispatch({
                                  type: 'guest-name',
                                  guestIndex: guest.guestIndex,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </label>

                          {(state.errors || []).includes(
                            `guestname-${guest.guestIndex}`
                          ) ? (
                            <div>
                              <span style={styles.error}>*required</span>
                            </div>
                          ) : null}
                        </div>
                        <div style={styles.selectionWrapper}>
                          <label>
                            <div className="accent caps-subheader">
                              Dinner Selection
                            </div>

                            <select
                              style={styles.selectInput}
                              value={guest.dinner}
                              onChange={e => {
                                dispatch({
                                  type: 'guest-dinner',
                                  guestIndex: guest.guestIndex,
                                  value: e.target.value,
                                });
                              }}
                            >
                              <option value="none">Select a meal</option>
                              <option value="beef">Beef</option>
                              <option value="chicken">Chicken</option>
                              <option value="veggie">Vegetarian</option>
                            </select>
                          </label>

                          {(state.errors || []).includes(
                            `dinner-${guest.guestIndex}`
                          ) ? (
                            <div>
                              <span style={styles.error}>*required</span>
                            </div>
                          ) : null}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}
                        >
                          <input
                            id={`${guest.guestIndex} vax`}
                            style={{
                              marginTop: '.2em',
                            }}
                            type="checkbox"
                            checked={guest.vaccinated}
                            onChange={e => {
                              dispatch({
                                type: 'guest-vaccinated',
                                guestIndex: guest.guestIndex,
                                value: e.target.checked,
                              });
                            }}
                          />
                          <label
                            htmlFor={`${guest.guestIndex} vax`}
                            style={{
                              flex: 2,
                              textAlign: 'left',
                              marginLeft: '.5em',
                            }}
                          >
                            Guest will be fully vaccinated as{' '}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              className="accent"
                              href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/fully-vaccinated-guidance.html"
                            >
                              defined by the CDC
                            </a>{' '}
                            before 8.28.21. I understand that this is a
                            requirement for attending.
                          </label>
                        </div>
                        {(state.errors || []).includes(
                          `vaccinated-${guest.guestIndex}`
                        ) ? (
                          <span style={styles.error}>
                            *required. All guests must be fully vaccinated in
                            order to attend. If you are unable to get
                            vaccinated, please contact us or select the
                            regretfully declines option.
                          </span>
                        ) : null}
                      </div>
                    ) : (
                      <div />
                    )}
                  </CSSTransition>
                </SwitchTransition>
              </div>
            );
          })}
          <div style={styles.personSection}>
            <h4 style={styles.nameHeader}>Contact Information</h4>
            <p>
              Please provide an email address for your party. We will send any
              wedding announcements or health and safety updates to this
              address.
            </p>
            <div style={styles.selectionWrapper}>
              <input
                style={styles.input}
                type="email"
                placeholder="email address"
                value={state.groupEmail == null ? '' : state.groupEmail}
                onChange={e => {
                  dispatch({
                    type: 'group-email',
                    value: e.target.value,
                  });
                }}
              />
              {(state.errors || []).includes('email') ? (
                <div>
                  <span style={styles.error}>*required</span>
                </div>
              ) : null}
            </div>
          </div>

          {(state.errors || []).length > 0 ? (
            <div style={{ marginBottom: '1em' }}>
              <span style={styles.error}>
                *Please fix the highlighted errors and then click submit again.
              </span>
            </div>
          ) : null}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function AlreadySubmitted({ response }) {
  return (
    <div className="section force-transparent">
      <div className="section-container narrow-column">
        <p>
          You have already submitted an RSVP with the following information. If
          you need to make changes, please{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="accent"
            href="mailto:hollyandeli@gmail.com"
          >
            email us
          </a>
          .
        </p>
        <ReadOnlyView response={response} />
      </div>
    </div>
  );
}

function RSVPSubmittedSuccessfully({ response }) {
  const anyoneAttending = response.find(person => person.attending === 'yes');
  const message = anyoneAttending
    ? 'We are so excited to celebrate with you!'
    : `We're sorry you can't attend, you will be missed!`;

  const [showingAnimation, setShowingAnimation] = useState(anyoneAttending);

  return (
    <div className="section force-transparent">
      <div className="section-container narrow-column">
        <SwitchTransition>
          <CSSTransition
            key={showingAnimation ? 'animation' : 'message'}
            addEndListener={(node, done) =>
              node.addEventListener('transitionend', done, false)
            }
            classNames="fade"
          >
            {showingAnimation ? (
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
                    callback: () => setShowingAnimation(false),
                  },
                ]}
              />
            ) : (
              <div>
                <p>
                  Success! Thank you for submitting an RSVP. {message} If you
                  need to make changes, please{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="accent"
                    href="mailto:hollyandeli@gmail.com"
                  >
                    email us
                  </a>
                </p>
                <ReadOnlyView response={response} />
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

function ReadOnlyView({ response }) {
  return (
    <>
      {response.map((person, index) => {
        if (
          person.guestOf != null &&
          person.guestOf.length > 0 &&
          person.attending === 'no'
        ) {
          return null;
        }

        return (
          <div style={styles.personSection} key={index}>
            <h4 style={styles.nameHeader}>{person.name}</h4>

            <div className="accent caps-subheader">Response</div>
            <p>
              {person.attending === 'yes'
                ? 'Will Attend'
                : 'Regretfully Declines'}
            </p>

            {person.attending === 'yes' ? (
              <>
                <div className="accent caps-subheader">Dinner Selection</div>
                <p>
                  {person.dinner === 'beef'
                    ? 'Beef'
                    : person.dinner === 'chicken'
                    ? 'Chicken'
                    : person.dinner === 'veggie'
                    ? 'Vegetarian'
                    : 'Vegetarian'}
                </p>
              </>
            ) : null}
          </div>
        );
      })}

      <div style={styles.personSection}>
        <h4 style={styles.nameHeader}>Contact Information</h4>

        <div className="accent caps-subheader">Email Address</div>
        <p>{response[0].groupEmail}</p>
      </div>
    </>
  );
}

const styles = {
  selectionWrapper: {
    marginBottom: '1em',
  },
  input: {
    padding: '10px 20px 5px',
    boxShadow: '0px 2px 10px #aaa',
    border: '1px solid #eaeaea',
    marginBottom: '10px',
  },
  selectInput: {
    padding: '.5em 3em .25em 1em',
    boxShadow: '0px 2px 10px #aaa',
    border: '1px solid #eaeaea',
    marginBottom: '10px',
  },
  personSection: {
    borderTop: '1px solid #ccc',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  nameHeader: {
    marginBottom: '1rem',
  },
  error: {
    color: '#BD0015',
  },
};

export default withPrivateRoute(RSVPPage);
