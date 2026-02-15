#!/bin/bash
cp src/index.html dist/
cp src/styles.css dist/
esbuild src/index.ts --bundle --outdir=dist --watch --servedir=dist --serve=8000

