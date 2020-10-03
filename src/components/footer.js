import * as React from 'react';
import { FaMeetup as Meetup } from 'react-icons/fa';
import { FiFacebook as Facebook, FiGithub as GitHub } from 'react-icons/fi';
import { useLastBuild } from '../hooks/use-last-build';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { currentYear } from '../lib';
import { Container } from './container';
import { Icon } from './icon';
import { NLink } from './nav-link';

export function Footer() {
  const lastBuild = useLastBuild();
  const { description } = useSiteMetadata();

  return (
    <footer className="bg-white">
      <Container className="py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <Icon />
            <p className="mt-8 text-gray-500 text-base leading-6">
              {description}
            </p>
            <div className="mt-8 flex">
              <NLink
                to="https://github.com/malcolm-kee/kl-react"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <GitHub className="h-6 w-6" aria-hidden />
              </NLink>
              <NLink
                to="https://www.meetup.com/kl-react"
                className="text-gray-400 hover:text-gray-500 ml-6"
              >
                <span className="sr-only">Meetup</span>
                <Meetup className="h-6 w-6" aria-hidden />
              </NLink>
              <NLink
                to="https://fb.me/klreact"
                className="text-gray-400 hover:text-gray-500 ml-6"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden />
              </NLink>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterGroup title="Participate">
                <ul>
                  <li>
                    <FooterLink to="/submit-a-talk">Submit A Talk</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/submit-topic">Submit Topic</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/contributing">Contributing</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/code-of-conduct">
                      Code of Conduct
                    </FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/react-clinic">React Clinic</FooterLink>
                  </li>
                </ul>
              </FooterGroup>
              <FooterGroup title="Archives" className="mt-12 md:mt-0">
                <ul>
                  <li>
                    <FooterLink to="/events">Events</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/speakers">Speakers</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/talks">Talks</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/this-month-on-react">
                      This Month on React
                    </FooterLink>
                  </li>
                </ul>
              </FooterGroup>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <FooterGroup title="Miscellaneous">
                <ul>
                  <li>
                    <FooterLink to="/resources">Resources</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                  </li>
                  <li className="mt-4">
                    <FooterLink to="/react-on-twitter">Nothing here</FooterLink>
                  </li>
                </ul>
              </FooterGroup>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <small className="text-base leading-6 text-gray-400">
            © {currentYear} KL React. All rights reserved.
          </small>
          <small className="text-base leading-6 text-gray-400">
            Last build on {lastBuild}.
          </small>
        </div>
      </Container>
    </footer>
  );
}

const FooterGroup = ({ title, children, className }) => (
  <div className={className}>
    <div className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase mb-4">
      {title}
    </div>
    {children}
  </div>
);

const FooterLink = ({ children, to }) => (
  <NLink to={to} className="leading-6 text-gray-500 hover:text-primary-500">
    {children}
  </NLink>
);
