const fs = require('fs');

const md = require('markdown-it')(); // https://github.com/markdown-it/markdown-it
const wikilinks = require('markdown-it-wikilinks')() // https://github.com/jsepia/markdown-it-wikilinks


// Create out/ folder if it doesn't exist
if (!fs.existsSync('./out')) {
    fs.mkdirSync('./out');
}

// Read all markdown file and convert to html
// Place output in .out folder
fs.readdirSync('./').forEach(file => {
    if (file.endsWith('.md')) {
        const rawMarkdownText = fs.readFileSync(file, 'utf-8');
        
        var frontMatter = "";
        var markdownContent = rawMarkdownText;
        
        // Cut the content between the 3 dashes from the raw markdown and remove from the markdownText
        try {
            frontMatter = rawMarkdownText.match(/---[\s\S]*---/)[0];
            markdownContent = rawMarkdownText.replace(/---[\s\S]*---/, '');
        } catch (error) {
            console.log(`Error: ${file} does not have a front matter. Skipping...`)
        }

        const html = md.use(wikilinks).render(markdownContent)
        
        // Append front matter to the html
        fs.writeFileSync(`./out/${file.replace('.md', '.html')}`, frontMatter + '\r' + html);
        // fs.writeFileSync(`./out/${file.replace('.md', '.html')}`, html);
    }
});


// Rename README.html to index.html 
const readme = fs.readFileSync('./out/README.html', 'utf-8');
fs.writeFileSync('./out/index.html', readme);

// Delete README.html
fs.unlinkSync('./out/README.html');

// Copy _assets folder to out/
fs.mkdirSync('./out/_assets');
fs.readdirSync('./_assets').forEach(file => {
    fs.copyFileSync(`./_assets/${file}`, `./out/_assets/${file}`);
}
);

// Copy _layouts folder to out/
fs.mkdirSync('./out/_layouts');
fs.readdirSync('./_layouts').forEach(file => {
    fs.copyFileSync(`./_layouts/${file}`, `./out/_layouts/${file}`);
}
);