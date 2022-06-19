import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .contact-links {
    display: flex;
    flex-wrap: nowrap;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;

    margin-right: 15px;
    svg {
      height: 15px;
      width: 15px;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Dewansh.</h2>;
  const three = <h3 className="big-heading">I build things for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a software engineer with over 7 years of work experience, specializing in building
        exceptional user experiences on web.
        <br />
        Currently, I’m focused on working at{' '}
        <a href="https://wazirx.com/exchange" target="_blank" rel="noreferrer">
          WazirX
        </a>
        , making cryptocurrencies accessible to our 10 million+ users.
      </p>
    </>
  );
  const five = (
    <div className="contact-links">
      <a className="email-link" href={`mailto:${email}`} target="_blank" rel="noreferrer">
        <Icon name="Email" /> Let's connect
      </a>
      <a
        className="email-link"
        href="https://www.linkedin.com/in/dewanshparashar/"
        target="_blank"
        rel="noreferrer">
        <Icon name="Linkedin" />
      </a>
      <a
        className="email-link"
        href="https://www.twitter.com/dewanshparashar/"
        target="_blank"
        rel="noreferrer">
        <Icon name="Twitter" />
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
