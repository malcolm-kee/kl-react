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
          {
            title: 'TypeScript for React Developer',
            slug: 'c',
            dateTime: 'Sat, 14 Dec 2019 9:30 AM',
            venue: 'RiggitPlus',
            instructors: [
              {
                image: 'https://github.com/malcolm-kee.png',
                name: 'Malcolm Kee',
              },
            ],
            icon:
              'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
          },
        ],
        reporter: console,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'workshop.html'),
      }
    );
  } catch (e) {
    console.error(`caught error`);
    console.error(e);
  }
})();
