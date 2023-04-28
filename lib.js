/**
 * Extracts the front matter from raw input text
 * @param {*} text
 * @returns The front matter, markdown content, and whether the front matter was detected
 */
exports.extractFrontMatter = function (text) {
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
};
