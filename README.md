# Graph knowledge base

This repository contains the tooling for publishing a graph knowledge base using wikilinks and Jekyll.

As Jekyll and other static site generators do not have native capabilities to handle wikilinke content, we need to find a way to handle this. This repository contains a custom NodeJS script to convert the markdown files into HTML files to be used by Jekyll.

Before being provided to Jekyll we need to process the wikilinks and convert them into HTML links. This is done by the `wikilinks.js` script.

## Getting started
