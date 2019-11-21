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
            title: 'KL React Meetup November: Talks & Clinic',
            slug: 'g',
            dateTime: 'Wed, 20 Nov 2019 7:00 PM',
            venue: 'Suria Labs',
            talks: [
              {
                title: 'Hidden Powers of Template Literals',
                speakerImage: 'https://github.com/vijaypushkin.png',
                speakerName: 'Vijay Pushkin',
              },
              {
                title: 'Why I Hate React Hooks',
                speakerImage: 'https://github.com/sergioutama.png',
                speakerName: 'Sergio Utama',
              },
              {
                title: 'React Concurrent Mode',
                speakerImage: 'https://github.com/malcolm-kee.png',
                speakerName: 'Malcolm Kee',
              },
            ],
            icon:
              'https://malcolm-misc.s3-ap-southeast-1.amazonaws.com/durian-react.png',
          },
        ],
        reporter: console,
      },
      {
        template: path.resolve(__dirname, 'og-image-template', 'meetup.html'),
      }
    );
  } catch (e) {
    console.error(`caught error`);
    console.error(e);
  }
})();
