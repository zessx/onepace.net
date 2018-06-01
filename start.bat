@echo off
start cmd /C php -S localhost:9000
cd react
start cmd /C webpack --config webpack.config.index.dev.js
cd ..
start "" http://localhost:9000
