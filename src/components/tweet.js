/** @jsx jsx */
import cx from 'classnames';
import { graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import { Card } from './card';

export function Tweet({
  displayedText,
  entities,
  user,
  url,
  className,
  ...props
}) {
  return (
    <Card className={cx('relative', className)} {...props}>
      <AuthorAvatar user={user} url={url} />
      <div className="flex flex-col h-full">
        {displayedText && (
          <p className="prose-xl whitespace-pre-wrap max-w-2xl mx-auto pr-20">
            {displayedText}
          </p>
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
    <div className="absolute right-1 top-1 text-right">
      <a href={url} className="block text-gray-500 group">
        <div className="inline-block shadow-lg rounded-full mr-2">
          <img
            className="inline-block shadow-solid text-white rounded-full"
            src={user.profileImage}
            alt={user.name}
          />
        </div>
        <div className="opacity-0 group-hover:bg-gray-100 group-hover:opacity-100 group-focus:opacity-100 xl:opacity-100 px-1 shadow rounded">
          {user.name}
        </div>
      </a>
    </div>
  );
}
