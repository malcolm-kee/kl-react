# kl-react

Repo for website of [KL React Meetup][kl-react-meetup].

## Key features

- Page contains all the speakers and past events and CTA to join the meetup group
- Customize landing page if there is upcoming events

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
TWITTER_BEARER_TOKEN=<Twitter_Bearer_Token>
TWITTER_CONSUMER_KEY=<Twitter_Consumer_Key>
TWITTER_CONSUMER_SECRET=<Twitter_Consumer_Secret>
GITHUB_TOKEN=<Github_Token>
```

> To have the twitter tokens, you have to create an [App on developer](https://developer.twitter.com/en/apps) and then create a [bearer token](https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens.html) to use application authentication.

> To have the GitHub token, see [this article](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).

> I know this is a lot trouble to setup, I'm in the midst of minimizing the requirement, tracked by [this issue](https://github.com/malcolm-kee/kl-react/issues/3).

[kl-react-meetup]: https://www.meetup.com/kl-react/
