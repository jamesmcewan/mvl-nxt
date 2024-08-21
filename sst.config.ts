/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mvl-nxt",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "sys-admin-mcwn",
        },
      },
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("MyBucket", {
      public: true,
    });
    const hono = new sst.aws.Function("Hono", {
      url: true,
      link: [bucket],
      handler: "index.handler",
    });

    return {
      api: hono.url,
    };
  },
});
