# Graph knowledge base

This repository contains the knowledge base and tooling for the graph knowledge base.

Problem statement
As Jekyll and other static site generators do not have native capabilities to handle wikilike content, we need to find a way to handle this. This repository contains not only the knowledge but the custom node.js script to convert the markdown files into HTML files to be used by Jekyll.

Before being provided to Jekyll we need to process the wikilinks and convert them into HTML links. This is done by the `wikilinks.js` script.

## Getting started
