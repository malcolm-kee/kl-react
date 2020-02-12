/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Update } from './update';
import { Container } from './container';
import { SectionHeading } from './section-heading';
import { List } from './list';
import { isFilledArray } from '../lib';

export const Updates = ({ updates, title }) => {
  if (!isFilledArray(updates)) {
    return null;
  }

  return (
    <Container sx={{ py: 4 }}>
      {title && <SectionHeading>{title}</SectionHeading>}
      <div>
        <List>
          {updates.map((update, i) => (
            <li key={i}>
              <Update {...update} />
            </li>
          ))}
        </List>
      </div>
    </Container>
  );
};
