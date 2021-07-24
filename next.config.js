// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  async headers() {
    return process.env.NODE_ENV === "production"
      ? [
          {
            // Applies these headers to all routes
            source: "/(.*)",
            headers: [
              {
                key: "X-DNS-Prefetch-Control",
                value: "on",
              },
              {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload",
              },
              {
                key: "X-XSS-Protection",
                value: "1; mode=block",
              },
              {
                key: "X-Frame-Options",
                value: "DENY",
              },
              {
                key: "Permissions-Policy",
                value: "",
              },
              {
                key: "X-Content-Type-Options",
                value: "nosniff",
              },
              {
                key: "Referrer-Policy",
                value: "origin-when-cross-origin",
              },
              {
                key: "Content-Security-Policy",
                value: `default-src 'self' ${process.env.NEXT_PUBLIC_DOMAIN} ${
                  process.env.NEXT_PUBLIC_SUPABASE_URL
                } wss://${
                  process.env.NEXT_PUBLIC_SUPABASE_URL
                } fonts.googleapis.com fonts.gstatic.com *.ingest.sentry.io vitals.vercel-insights.com; style-src 'unsafe-inline' ${
                  process.env.NEXT_PUBLIC_DOMAIN
                };`,
              },
            ],
          },
        ]
      : [];
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
