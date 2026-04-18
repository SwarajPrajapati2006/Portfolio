const Jimp = require('jimp');

Jimp.read('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];

      // Superman logo consists of Red, Yellow, and Black outlines.
      
      const isRedish = r > 100 && r > g * 1.5 && r > b * 1.5;
      const isYellowish = r > 100 && g > 100 && b < 100;
      const isBlackish = r < 80 && g < 80 && b < 80;
      
      // If it's blue (border) or white (box) or gray (checkerboard), remove it!
      const isBlueish = b > r + 30 && b > g + 30; // Catch the blue border
      const isWhiteish = r > 200 && g > 200 && b > 200;
      const isGrayish = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;

      // Keep only red, yellow, and black pixels
      if (!isRedish && !isYellowish && !isBlackish) {
          this.bitmap.data[idx + 3] = 0; // Make it completely transparent!
      } else if (isBlueish || isWhiteish) {
          this.bitmap.data[idx + 3] = 0; // Explicitly remove blue and white
      }
    });

    image.autocrop();

    return image.write('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile-transparent.png');
  })
  .then(() => {
    console.log('Image perfectly extracted.');
  })
  .catch(err => {
    console.error(err);
  });
