const sharp = require('sharp');
const fs = require('fs');

async function convertImage() {
    try {
        await sharp('src/assets/my photo.png')
            .resize(400) // resize to 400px width to keep it crisp but smaller
            .webp({ quality: 80 }) // convert to webp with 80% quality
            .toFile('public/avatar.webp');
        console.log('Successfully optimized avatar image!');
        fs.unlinkSync('src/assets/my photo.png');
    } catch (err) {
        console.error('Error optimizing image:', err);
    }
}

convertImage();
