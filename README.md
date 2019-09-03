# kl-react

[![Netlify Status](https://api.netlify.com/api/v1/badges/17874651-226e-4dc5-9af8-a3a6fd62c08b/deploy-status)](https://app.netlify.com/sites/kl-react/deploys) [![CircleCI Status](https://circleci.com/gh/malcolm-kee/kl-react/tree/master.svg?style=svg)](https://circleci.com/gh/malcolm-kee/kl-react/tree/master)

Repo for website of [KL React Meetup][kl-react-meetup].

## Key features

- Page contains all the speakers and past events and CTA to join the meetup group
- Customize landing page if there is upcoming events
- Submit to talk in future meetup
- List of previous talks
- TODO: Allow voting on topics

## Changing details

### Speaker Profile

The image of speaker is retrieved from GitHub/Twitter account if it is provided.

To update your image/details, make a PR to update [speakers.yml](src/data/speakers.yml)

## Contributing

### Add page

To create a new page in this site, there are two options:

- write React components in `src/pages` folder. This is Gatsby JS default behavior.
- write MDX in `src/contents` folder. This is a custom behavior of this site.
  - add frontmatter to your mdx, at least the title is required.
  - file name will be used as the url of the page, e.g. `code-of-conduct.mdx` will be available at url `/code-of-conduct`.
  - the contents will be rendered with [`NoteTemplate`](src/templates/note-template.js) component.

### Run site locally

To run the site locally,

1. clone the repo
2. add a `env.development` file in project root with the following keys:

```
GITHUB_TOKEN=<Github_Token>
```

> To create a GitHub token, see [this article][create-github-token].

#### Getting Data from Twitter

If the features you're developing involves `gatsby-source-twitter`, you need to add additional 3 keys in `env.development`:

```
TWITTER_BEARER_TOKEN=<Twitter_Bearer_Token>
TWITTER_CONSUMER_KEY=<Twitter_Consumer_Key>
TWITTER_CONSUMER_SECRET=<Twitter_Consumer_Secret>
```

> To generate the twitter tokens, you have to create an [App on developer][twitter-app] and then create a [bearer token][twitter-bearer-token] to use application authentication.

#### Getting Event Photos

Currently we host the meetup photos in a s3 bucket, and it requires AWS credentials to access them. Therefore if you build locally, no meetup photos will be visible but they will be shown in Netlify preview. If you need to preview the photos, [request the following details from me](mailto:malcolm.keeweesiong@gmail.com) and add them to `env.development` file.

```
AWS_ACCESS_KEY=<Aws_Access_Key_Id>
AWS_SECRET_ACCESS=<Aws-Secret_Access_Key>
```

[create-github-token]: https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
[twitter-app]: https://developer.twitter.com/en/apps
[twitter-bearer-token]: https://developer.twitter.com/en/docs/basics/authentication/guides/bearer-tokens.html
[kl-react-meetup]: https://www.meetup.com/kl-react/
