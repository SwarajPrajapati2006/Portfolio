const Jimp = require('jimp');

Jimp.read('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile.png')
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (red > 200 && green > 200 && blue > 200) {
          // distance to white
          const avg = (red + green + blue) / 3;
          let alpha = 255 - ((avg - 200) * (255 / (255 - 200)));
          if (alpha < 0) alpha = 0;
          this.bitmap.data[idx + 3] = alpha;
      }
    });
    return image.write('C:\\Users\\Swaraj\\OneDrive\\Desktop\\SwarajPrajapati Portfolio\\src\\assets\\logoProfile-transparent.png');
  })
  .then(() => {
    console.log('Image processed successfully.');
  })
  .catch(err => {
    console.error(err);
  });
