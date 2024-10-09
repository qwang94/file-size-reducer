const { exec } = require('child_process');
const path = require('path');

// Function to compress a PDF using Ghostscript
function compressPDF(inputPath, outputPath) {
    const gsCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;
    
    exec(gsCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error compressing PDF: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`PDF compressed and saved to ${outputPath}`);
    });
}

// Main function to handle command-line arguments
async function main() {
    if (process.argv.length < 4) {
        console.error('Usage: node compress.js <inputFilePath> <outputFilePath>');
        process.exit(1);
    }

    const inputFilePath = process.argv[2];
    const outputFilePath = process.argv[3];

    const fileExtension = path.extname(inputFilePath).toLowerCase();

    if (fileExtension === '.pdf') {
        compressPDF(inputFilePath, outputFilePath);
    } else {
        console.error('Unsupported file type:', fileExtension);
        process.exit(1);
    }
}

main();
