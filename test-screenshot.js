const path = require('path');
const { screenshot } = require('./gatsby/generate-image');

const imagePath = path.resolve(__dirname, 'og-image', 'durian-react.png');

/*
This file is used for development for the SEO image generation only.
*/

(async function run() {
  try {
    await screenshot(
      {
        nodes: [
          {
            title: 'How to become a racist',
            slug: 'c',
            icon: {
              extension: 'png',
              absolutePath: imagePath,
            },
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
