const { getTimeStamp, chunk } = require('./util/common');
const { takeScreenshots } = require('./util/screenshot');
const { compareScreenshots } = require('./util/compare');
const path = require('path');
const screenshots_dir = path.join(__dirname, '/screenshots');
const config = require('./config/config.json');

(async () => {
  const time_stamp = '1650617738';

  // Step 3. Compare the screenshots
  await compareScreenshots({ time_stamp, screenshots_dir });
  console.log('Finished comparing screenshots!');

  // Step 4. Generate report
})();
