const Jimp = require('jimp');

Jimp.read('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];

      // Superman logo colors:
      // Red: High R, low G & B
      const isRed = r > 120 && g < 80 && b < 80;
      // Yellow: High R & G, low B
      const isYellow = r > 150 && g > 150 && b < 100;
      // Black: Low everything
      const isBlack = r < 50 && g < 50 && b < 50;
      
      // Some edge alias colors might exist, we can use a simpler approach:
      // Gray/White/Checker pattern: R, G, B are very close to each other.
      // If the difference between max(R,G,B) and min(R,G,B) is small, it's gray/white.
      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const diff = maxVal - minVal;

      // If it's a grayscale kind of color (checkerboard or white) and it's not black
      if (diff < 30 && maxVal > 50) {
          this.bitmap.data[idx + 3] = 0; // Transparent
      } else if (r > 200 && g > 200 && b > 200) {
          this.bitmap.data[idx + 3] = 0; // Pure white transparent
      }
    });

    // Auto-crop to remove empty transparent space around the logo
    image.autocrop();
    
    return image.write('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile-transparent.png');
  })
  .then(() => {
    console.log('Image processed successfully.');
  })
  .catch(err => {
    console.error(err);
  });
