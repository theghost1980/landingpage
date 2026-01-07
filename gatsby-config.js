require("dotenv").config();

module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    author: "Saturno Mangieri",
    urlAuthor: "https://github.com/theghost1980",
    siteUrl: "https://www.mylandingpage.com",
    websiteUrl: "https://www.mylandingpage.com",
    description: "a Landing Template page multi purpose, ideal for startup companies, digital products, physical products. Fully customizable from datoCMS content models. Made by Saturno Mangieri using Gatsbyjs, ReactJs, CSS & Javascript. SEO friendly.",
    keywords: [
      `landing page`, `landing-page`, `marketing`, `the best seo`
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: `${process.env.api_token}`,
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
