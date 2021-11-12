#!/bin/bash

rm -f *.vsix
rm -rf out
npm install && vsce publish