/** @jsx jsx */
import List from 'gatsby-theme-conference/src/components/list';
import SectionHeading from 'gatsby-theme-conference/src/components/section-heading';
import { Container, jsx } from 'theme-ui';
import { ScheduleItem } from './schedule-item';

export function Schedule({ schedule }) {
  return (
    <div id="schedule" sx={{ py: 5 }}>
      <Container>
        <SectionHeading>Schedule</SectionHeading>
        <div>
          <List>
            {schedule.map(item => (
              <li key={item.time}>
                <ScheduleItem {...item} />
              </li>
            ))}
          </List>
        </div>
      </Container>
    </div>
  );
}
