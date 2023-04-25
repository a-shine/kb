const fs = require("fs");

const md = require("markdown-it")(); // https://github.com/markdown-it/markdown-it
const wikilinks = require("markdown-it-wikilinks")(); // https://github.com/jsepia/markdown-it-wikilinks

/**
 * Extracts the front matter from raw input text
 * @param {*} text
 * @returns The front matter, markdown content, and whether the front matter was detected
 */
function extractFrontMatter(text) {
  var frontMatter;
  var markdownContent;
  var frontMatterDetected;

  try {
    frontMatter = text.match(/---[\s\S]*---/)[0];
    frontMatterDetected = true;
  } catch (e) {
    if (e instanceof TypeError) {
      // TypeError: Cannot read property '0' of null
      // This means that the front matter was not detected
      frontMatterDetected = false;
    } else {
      throw e;
    }
  }

  if (frontMatterDetected) {
    markdownContent = text.replace(/---[\s\S]*---/, "");
    return { frontMatter, markdownContent, frontMatterDetected };
  } else {
    return { frontMatter: "", markdownContent: text, frontMatterDetected };
  }
}

// Create out/ folder if it doesn't exist
if (!fs.existsSync("./out")) {
  fs.mkdirSync("./out");
}

// Read all markdown file and convert to html
// Place output in .out folder
fs.readdirSync("./").forEach((file) => {
  if (file.endsWith(".md")) {
    const rawMarkdownText = fs.readFileSync(file, "utf-8");

    const { frontMatter, markdownContent, frontMatterDetected } =
      extractFrontMatter(rawMarkdownText);

    const html = md.use(wikilinks).render(markdownContent);

    // Append front matter to the html

    if (frontMatterDetected) {
      fs.writeFileSync(
        `./out/${file.replace(".md", ".html")}`,
        frontMatter + "\n\n" + html
      );
    } else {
      fs.writeFileSync(`./out/${file.replace(".md", ".html")}`, html);
    }
  }
});

// Remove README.md from out/ folder
fs.unlinkSync("./out/README.html");

// Copy _assets folder to out/
fs.mkdirSync("./out/assets");
fs.readdirSync("./_assets").forEach((file) => {
  fs.copyFileSync(`./_assets/${file}`, `./out/assets/${file}`);
});

// Copy _layouts folder to out/
fs.mkdirSync("./out/_layouts");
fs.readdirSync("./_layouts").forEach((file) => {
  fs.copyFileSync(`./_layouts/${file}`, `./out/_layouts/${file}`);
});
