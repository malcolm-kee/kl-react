# kl-react

Repo for website of [KL React Meetup][kl-react-meetup].

## Key features

- Page contains all the speakers and past events and CTA to join the meetup group
- Customize landing page if there is upcoming events
- Submit to talk in future meetup
- TODO: List of previous talks
- TODO: Allow voting on topics

## Changing details

### Speaker Profile

The image of speaker is retrieved from GitHub/Twitter account if it is provided.

To update your image/details, make a PR to update [speakers.yml](src/data/speakers.yml)

## Contributing

### Run site locally

To run the site locally,

1. clone the repo
2. add a `env.development` file in project root with the following keys:

```
GITHUB_TOKEN=<Github_Token>
```

> To create a GitHub token, see [this article][create-github-token].

If the features you're developing involves `gatsby-source-twitter`, you need to add additional 3 keys in `env.development`:

```
TWITTER_BEARER_TOKEN=<Twitter_Bearer_Token>
TWITTER_CONSUMER_KEY=<Twitter_Consumer_Key>
TWITTER_CONSUMER_SECRET=<Twitter_Consumer_Secret>
```

> To generate the twitter tokens, you have to create an [App on developer][twitter-app] and then create a [bearer token][twitter-bearer-token] to use application authentication.

[create-github-token]: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
[twitter-app]: https://developer.twitter.com/en/apps
[twitter-bearer-token]: https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens.html
[kl-react-meetup]: https://www.meetup.com/kl-react/
