const fs = require('fs');

// https://github.com/jsepia/markdown-it-wikilinks
const wikilinks = require('markdown-it-wikilinks')()

// https://github.com/markdown-it/markdown-it
const md = require('markdown-it')();

// create .out folder if it doesn't exist
if (!fs.existsSync('./out')) {
    fs.mkdirSync('./out');
}

// read all markdown file and convert to html
// Place output in .out folder
fs.readdirSync('./').forEach(file => {
    if (file.endsWith('.md')) {
        const markdownText = fs.readFileSync(file, 'utf-8');
        const html = md.use(wikilinks).render(markdownText)
        fs.writeFileSync(`./out/${file.replace('.md', '.html')}`, html);
    }
});


// Convert README.html to index.html
const readme = fs.readFileSync('./out/README.html', 'utf-8');
fs.writeFileSync('./out/index.html', readme);
fs.unlinkSync('./out/README.html'); // delete README.html