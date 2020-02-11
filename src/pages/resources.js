import React from 'react';
import { Styled } from 'theme-ui';
import { Seo } from '../components/seo';
import { Layout } from '../components/layout';
import { Article } from '../components/article';
import { NavLink } from '../components/nav-link';
import { Link } from 'gatsby';

const Resources = () => (
  <>
    <Seo title="Resources - KL React" description="Resources for organizers" />
    <Layout>
      <Article>
        <Styled.h1>Resources</Styled.h1>
        <Styled.p>
          <small>Resources for organizers</small>
        </Styled.p>
        <ul>
          <li>
            <NavLink as={Link} to="/meetup-checklist">
              Meetup Checklist
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/meetup-venue-sponsorship-email-template">
              Meetup Venue Sponsorship Email Template
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/workshop-venue-sponsorship-email-template">
              Workshop Venue Sponsorship Email Template
            </NavLink>
          </li>
          <li>
            <NavLink as={Link} to="/mc-event-order">
              MC Event Order
            </NavLink>
          </li>
        </ul>
      </Article>
    </Layout>
  </>
);

export default Resources;
