/** @jsx jsx */
import ReactPlayer from 'react-player';
import { jsx } from 'theme-ui';

export const VideoPlayer = ({ className, ...props }) => {
  return (
    <div
      className={className}
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mb: [4, 4, 6],
      }}
    >
      <div
        sx={{
          position: 'relative',
          pt: '56.25%',
          overflow: 'hidden',
        }}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          controls
          {...props}
        />
      </div>
    </div>
  );
};
