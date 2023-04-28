const lib = require("./lib");

describe("extractFrontMatter", () => {
  test("should correctly extract front matter when it exists", () => {
    const text =
      "---\ntitle: My Post\nauthor: John Doe\n---\n\n# My Post\n\nThis is the content of my post.";
    const expectedFrontMatter = "---\ntitle: My Post\nauthor: John Doe\n---";
    const expectedMarkdownContent =
      "\n\n# My Post\n\nThis is the content of my post.";

    const result = lib.extractFrontMatter(text);

    // console.log("this is what the result returned: ", result.markdownContent);

    expect(result.frontMatter).toEqual(expectedFrontMatter);
    expect(result.markdownContent).toEqual(expectedMarkdownContent);
    expect(result.frontMatterDetected).toBe(true);
  });

  test("should return empty front matter and the original text as markdown content when front matter is not present", () => {
    const text = "# My Post\n\nThis is the content of my post.";

    const result = lib.extractFrontMatter(text);

    expect(result.frontMatter).toEqual("");
    expect(result.markdownContent).toEqual(text);
    expect(result.frontMatterDetected).toBe(false);
  });
});
