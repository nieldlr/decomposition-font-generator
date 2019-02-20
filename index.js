const fs = require('fs');
const opentype = require('opentype.js');

// Load glyphs file & parse
const glyphsFile = fs.readFileSync('./data/glyphs.txt').toString();

const charsToInclude = [];
var lines = glyphsFile.split(/\r?\n/);

for (let i=0; i < lines.length; i++) {
	charsToInclude.push(lines[i]);
}

// Load Fonts to choose from
var HanaMinA = opentype.loadSync('./data/HanaMinA.ttf');
var HanaMinB = opentype.loadSync('./data/HanaMinB.ttf');

// Setup new glyphs
const glyphs = [];
var notdefGlyph = new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: 650,
    path: new opentype.Path()
});
glyphs.push(notdefGlyph);

console.log(charsToInclude.length);
for(let j=0; j<charsToInclude.length; j++) {
	//console.log(j);
	var charToFind = charsToInclude[j];

	var glyph = HanaMinA.charToGlyph(charToFind);
	if(typeof glyph.unicode != 'undefined') {
		glyph.name = glyph.unicode+'';
		glyphs.push(glyph);
	}
	else {
		glyph = HanaMinB.charToGlyph(charToFind);
		if(glyph.unicode != 'undefined'){
			glyph.name = glyph.unicode+'';
			glyphs.push(glyph);
		}
		else console.log('glyph not found', glyph);
	}
}
console.log("CREATING FONT");
var newFont = new opentype.Font({
    familyName: 'ChineseDecompositionFont',
    styleName: 'Medium',
    unitsPerEm: 1024,
    ascender: 1062,
    descender: -251,
    glyphs: glyphs
});

console.log("DOWNLOADING");
newFont.download();
console.log("DONE");