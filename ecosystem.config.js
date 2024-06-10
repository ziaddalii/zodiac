module.exports = {
    apps: [
        {
            name: "zodiac-eg.co",
            exec_mode: "cluster",
            instances: "1",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3011,
                DOMAIN: "zodiac-eg.co",
                COOKIE_SECURE: "true",
                REMOTE_PATTERN_HTTP: "false",
                NEXT_PUBLIC_RECAPTCHA_SITE_KEY:"6Ld614EpAAAAAGYj5usz1pfP8TALjSg6S_GeBgip",
                RECAPTCHA_SECRET_KEY:"6Ld614EpAAAAAEANC9g_5FtKccDVd77ejqThNh6b",
            },
        },
    ],
};
