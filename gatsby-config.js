module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    author: "Saturno Mangieri",
    urlAuthor: "https://saturnoman.com/",
    siteUrl: "http://www.mylandingpage.com",
    websiteUrl: "http://www.mylandingpage.com",
    description: "a Landing Template page multi purpose, ideal for startup companies, digital products, physical products. Fully customizable from datoCMS content models. Made by Saturno Mangieri using Gatsbyjs, ReactJs, CSS & Javascript. SEO friendly.",
    keywords: [
      `landing page`, `landing-page`, `marketing`, `the best seo`
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "bea54e14f6fbafc2f09631b50af8ee",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
