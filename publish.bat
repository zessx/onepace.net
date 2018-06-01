@echo off
cd react
start /wait cmd /C webpack --config webpack.config.index.prod.js
WebPublisher.exe
