/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { List } from './list';
import { ScheduleItem } from './schedule-item';
import { SectionHeading } from './section-heading';

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
