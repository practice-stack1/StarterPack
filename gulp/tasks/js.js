import webpack from "webpack-stream"

const babelOptions = (preset) => {
    const opts = {
        presets: ["@babel/preset-env"],
        plugins: ["@babel/plugin-proposal-class-properties"],
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: "babel-loader",
            options: babelOptions(),
        },
    ]
    return loaders
}

export const js = () => {
    return app.gulp
        .src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(
            app.plugins.plumber(
                app.plugins.notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            webpack({
                mode: app.isBuild ? "production" : "development",
                entry: {
                    main: ["@babel/polyfill", "./src/js/app.js"],
                },
                output: {
                    filename: "app.min.js",
                },
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: jsLoaders(),
                        },
                    ],
                },
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))

        .pipe(app.gulp.src(app.path.src.js, { sourcemaps: app.isDev }))
        .pipe(
            webpack({
                mode: "development",
                entry: {
                    main: "./src/js/app.js",
                },
                output: {
                    filename: "app.js",
                },
            })
        )
        .pipe(app.gulp.dest(app.path.build.js))

        .pipe(app.plugins.browsersync.stream())
}
