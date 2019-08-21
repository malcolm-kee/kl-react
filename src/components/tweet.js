/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { noop } from '../lib';
import { Card } from './card';

export function Tweet({
  id,
  displayedText,
  entities,
  user,
  url,
  onVideoPlay = noop,
  ...props
}) {
  return (
    <Card sx={{ position: 'relative' }} {...props}>
      <AuthorAvatar user={user} url={url} />
      <div sx={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
        {displayedText && (
          <Styled.p
            sx={{
              fontSize: [2, 3, 4],
              whiteSpace: 'pre-wrap',
              pr: '60px',
            }}
          >
            {displayedText}
          </Styled.p>
        )}
        <div
          sx={{
            margin: `0 auto`,
            maxWidth: 600,
            flex: 1,
            minHeight: 0,
          }}
        >
          {entities &&
            entities.media.map((medium, i) => {
              switch (medium.type) {
                case 'photo':
                  return (
                    <img
                      src={medium.url}
                      sx={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      alt={medium.alt || ''}
                      key={i}
                    />
                  );

                case 'animated_gif':
                  return (
                    Array.isArray(medium.video && medium.video.variants) &&
                    medium.video.variants.length > 0 && (
                      <video
                        src={medium.video.variants[0].url}
                        autoPlay
                        muted
                        loop
                        key={i}
                        sx={{
                          display: 'inline-block',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          height: '700px',
                        }}
                      />
                    )
                  );

                case 'video':
                  return (
                    Array.isArray(medium.video && medium.video.variants) && (
                      <video
                        autoPlay
                        muted
                        onPlay={() => onVideoPlay(medium.video.duration_millis)}
                        key={i}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
                      >
                        {medium.video.variants.map((variant, i) => (
                          <source
                            src={variant.url}
                            type={variant.content_type}
                            key={i}
                          />
                        ))}
                      </video>
                    )
                  );

                default:
                  return null;
              }
            })}
        </div>
      </div>
    </Card>
  );
}

export const query = graphql`
  fragment Tweet on twitterFavoritesListReacttweets {
    id
    url
    displayedText
    entities: extended_entities {
      media {
        type
        url: media_url_https
        alt: ext_alt_text
        video: video_info {
          duration_millis
          variants {
            url
            content_type
            bitrate
          }
        }
      }
    }
    user {
      name
      profileImage: profile_image_url_https
    }
  }
`;

function AuthorAvatar({ user, url }) {
  return (
    <Styled.div
      sx={{
        position: 'absolute',
        right: 1,
        top: 1,
        textAlign: 'right',
      }}
    >
      <Styled.a
        sx={{
          fontSize: 3,
          textDecoration: 'none',
        }}
        css={{
          '& div': {
            opacity: 0,
            transition: `opacity 500ms ease`,
          },
          ':hover, :focus': {
            div: {
              opacity: 1,
            },
          },
        }}
        href={url}
      >
        <img
          sx={{
            borderRadius: '50%',
            mr: 2,
          }}
          src={user.profileImage}
          alt={user.name}
        />
        <div>{user.name}</div>
      </Styled.a>
    </Styled.div>
  );
}
