/** @jsx jsx */
import { graphql } from 'gatsby';
import { jsx, Styled } from 'theme-ui';
import { Card } from './card';

export function Tweet({ id, displayedText, entities, user, url, ...props }) {
  return (
    <Card sx={{ position: 'relative' }} {...props}>
      <div
        sx={{
          position: 'absolute',
          right: 1,
          top: 1,
          textAlign: 'right',
        }}
      >
        <img
          sx={{
            borderRadius: '50%',
            mr: 2,
          }}
          src={user.profileImage}
          alt=""
        />
        <Styled.a
          sx={{
            fontSize: 3,
            textDecoration: 'none',
            display: 'block',
          }}
          href={url}
        >
          {user.name}
        </Styled.a>
      </div>
      {displayedText && (
        <Styled.p
          sx={{
            fontSize: [2, 3, 4],
            whiteSpace: 'pre-wrap',
            pr: '50px',
          }}
        >
          {displayedText}
        </Styled.p>
      )}
      <div
        sx={{
          margin: `0 auto`,
          maxWidth: 600,
          height: '100%',
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
                      maxHeight: 'calc(100vh - 200px)',
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
                      sx={{
                        mb: 3,
                        display: 'inline-block',
                        width: '100%',
                      }}
                      key={i}
                    />
                  )
                );

              default:
                return null;
            }
          })}
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
