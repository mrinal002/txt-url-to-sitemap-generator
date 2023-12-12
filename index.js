const fs = require('fs');
const readline = require('readline');
const xmlbuilder = require('xmlbuilder');

const inputFilePath = 'urls.txt'; // Replace this with your file path
const outputFilePath = 'sitemap.xml';
const staticLastMod = '2023-12-11'; // Static lastmod value for all URLs
const staticLastMod2 = 'monthly'; // Static lastmod value for all URLs
const staticLastMod3 = '0.5'; // Static lastmod value for all URLs

const generateSitemap = () => {
  const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8' });
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  const urls = [];

  rl.on('line', line => {
    const url = line.trim();
    if (url !== '') {
      urls.push(url);
    }
  });

  rl.on('close', () => {
    generateXML(urls);
  });

  rl.on('error', err => {
    console.error('Error reading file:', err);
  });
};

const generateXML = urls => {
  const root = xmlbuilder.create('urlset', { encoding: 'UTF-8' })
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
    .att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

  urls.forEach(url => {
    const urlElement = root.ele('url');
    urlElement.ele('loc', {}, url);
    urlElement.ele('lastmod', {}, staticLastMod); // Set static lastmod value 1
    urlElement.ele('changefreq', {}, staticLastMod2); // Set static lastmod value 2
    urlElement.ele('priority', {}, staticLastMod3); // Set static lastmod value 3
  });

  const xml = root.end({ pretty: true });

  fs.writeFile(outputFilePath, xml, err => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Sitemap generated successfully!');
    }
  });
};

generateSitemap();
