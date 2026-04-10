import { FaMeetup as Meetup } from 'react-icons/fa';
import { FiFacebook as Facebook, FiGithub as GitHub } from 'react-icons/fi';
import { siteMetadata } from '@/lib/site';
import { Container } from './container';
import { Icon } from './icon';
import { NLink } from './nav-link';

function formatBuildDate(): string {
  return new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <Container className="py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <Icon />
            <p className="mt-8 text-base leading-6 text-gray-500">
              {siteMetadata.description}
            </p>
            <div className="flex mt-8">
              <NLink
                to="https://github.com/kl-react/kl-react"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <GitHub className="w-6 h-6" aria-hidden />
              </NLink>
              <NLink
                to="https://www.meetup.com/kl-react"
                className="ml-6 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Meetup</span>
                <Meetup className="w-6 h-6" aria-hidden />
              </NLink>
              <NLink
                to="https://fb.me/klreact"
                className="ml-6 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="w-6 h-6" aria-hidden />
              </NLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-12 xl:col-span-2 xl:mt-0">
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
                </ul>
              </FooterGroup>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-6">
          <small className="text-base leading-6 text-gray-400">
            &copy; {currentYear} KL React. All rights reserved.
          </small>
          <small className="text-base leading-6 text-gray-400">
            Last build on {formatBuildDate()}.
          </small>
        </div>
      </Container>
    </footer>
  );
}

interface FooterGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function FooterGroup({ title, children, className }: FooterGroupProps) {
  return (
    <div className={className}>
      <div className="mb-4 text-sm font-semibold leading-5 tracking-wider text-gray-400 uppercase">
        {title}
      </div>
      {children}
    </div>
  );
}

interface FooterLinkProps {
  children: React.ReactNode;
  to: string;
}

function FooterLink({ children, to }: FooterLinkProps) {
  return (
    <NLink to={to} className="leading-6 text-gray-500 hover:text-primary-500">
      {children}
    </NLink>
  );
}
