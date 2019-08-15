/** @jsx jsx */
import { jsx } from 'theme-ui';
import { List } from './list';

export const FlexList = props => (
  <List
    {...props}
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
    }}
  />
);
