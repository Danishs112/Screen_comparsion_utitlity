const fs = require('fs');
const { getScreenshotsNameList } = require('./common');
const compareImages = require('resemblejs/compareImages');

module.exports.compareScreenshots = async ({
  time_stamp,
  screenshots_dir,
  base_folder,
  test_folder,
}) => {
  fs.mkdirSync(`${screenshots_dir}/${time_stamp}/diff`, { recursive: true });
  try {
    const screenshot_names = await getScreenshotsNameList();
    const options = await getOptions();
    console.log(screenshot_names);
    for (const screenshot_name of screenshot_names) {
      const data = await compareImages(
        fs.readFileSync(
          `${screenshots_dir}/${time_stamp}/${base_folder}/${screenshot_name}.png`
        ),
        fs.readFileSync(
          `${screenshots_dir}/${time_stamp}/${test_folder}/${screenshot_name}.png`
        ),
        options
      );
      fs.writeFileSync(
        `${screenshots_dir}/${time_stamp}/diff/${screenshot_name}.png`,
        data.getBuffer()
      );

      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

async function getOptions() {
  const options = {
    output: {
      errorColor: {
        red: 255,
        green: 0,
        blue: 255,
      },
      errorType: 'movement',
      transparency: 0.3,
      largeImageThreshold: 1200,
      useCrossOrigin: false,
      outputDiff: true,
    },
    scaleToSameSize: true,
    ignore: 'antialiasing',
  };
}
