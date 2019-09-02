const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const noteTemplate = path.resolve(
  __dirname,
  '..',
  'src',
  'templates',
  'note-template.js'
);

exports.onCreateMdxNode = function onCreateMdxNode({ node, getNode, actions }) {
  const { createNodeField } = actions;
  // Ensures we are processing only mdx files
  if (node.internal.type === 'Mdx') {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: 'src/contents',
      trailingSlash: false,
    });

    createNodeField({
      node,
      name: 'slug',
      value: relativeFilePath,
    });
  }
};

exports.createMdxPages = async function createMdxPages({
  actions,
  graphql,
  reporter,
}) {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.error(result.errors);
    return;
  }

  result.data.allMdx.nodes.forEach(node =>
    createPage({
      path: node.fields.slug,
      component: noteTemplate,
      context: {
        id: node.id,
      },
    })
  );
};
