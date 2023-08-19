const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
const { getScreenshotsNameList } = require('./common');

module.exports.compareScreenshots = async ({ time_stamp, screenshots_dir }) => {
  console.log(time_stamp);
  console.log(screenshots_dir);
  fs.mkdirSync(`${screenshots_dir}/${time_stamp}/diff`, { recursive: true });
  try {
    const screenshot_names = await getScreenshotsNameList();
    console.log(screenshot_names);
    for (const screenshot_name of screenshot_names) {
      const img1 = PNG.sync.read(
        fs.readFileSync(
          `${screenshots_dir}/${time_stamp}/prod/${screenshot_name}.png`
        )
      );
      const img2 = PNG.sync.read(
        fs.readFileSync(
          `${screenshots_dir}/${time_stamp}/stage/${screenshot_name}.png`
        )
      );
      const { width, height } = img1;
      const diff = new PNG({ width, height });
      const difference = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        width,
        height,
        { threshold: 0.1 }
      );
      fs.writeFileSync(
        `${screenshots_dir}/${time_stamp}/diff/${screenshot_name}.png`,
        PNG.sync.write(diff)
      );
      console.log(difference);
    }
  } catch (error) {
    console.error(error);
  }
};
