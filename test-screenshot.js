const path = require('path');
const { screenshot } = require('./gatsby/generate-image');

/*
This file is used for development for the SEO image generation only.
*/

(async function run() {
  try {
    await screenshot(
      {
        nodes: [
          // {
          //   title: 'TypeScript for React Developer',
          //   slug: 'c',
          //   dateTime: 'Sat, 14 Dec 2019 9:30 AM',
          //   venue: 'RiggitPlus',
          //   instructors: [
          //     {
          //       image: 'https://github.com/malcolm-kee.png',
          //       name: 'Malcolm Kee',
          //     },
          //   ],
          //   icon: 'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
          // },
          {
            title: 'KL React Test Meetup 2022',
            slug: 'c',
            icon: 'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
            dateTime: 'Sat, 14 August 2022 9:30 AM',
            venue: 'My Home',
            talks: [
              {
                title: 'Lorem ipsum, dolor sit amet consectetur adipisicing',
                speakerName: 'Malcolm Kee',
                speakerImages: ['https://github.com/malcolm-kee.png'],
              },
              {
                title: 'Microfrontend with React',
                speakerName: 'Malcolm Kee and Matthew Yong',
                speakerImages: [
                  'https://github.com/malcolm-kee.png',
                  'https://github.com/matt-writes-code.png',
                ],
              },
              {
                title: 'Getting Started with Web Development',
                speakerName: 'Awesome Speaker',
              },
            ],
          },
        ],
        reporter: console,
        skipIfExists: false,
      },
      {
        template: path.resolve(
          __dirname,
          'og-image-template',
          'meetup-compact.html'
        ),
      }
    );
  } catch (e) {
    console.error(`caught error`);
    console.error(e);
  }
})();
