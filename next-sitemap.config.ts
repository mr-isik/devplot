/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  exclude: [
    "/dashboard",
    "/settings",
    "/logout",
    "/auth/confirm",
    "/change-password",
    "/verify",
  ],
};
