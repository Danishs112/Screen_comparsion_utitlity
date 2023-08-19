const { getTimeStamp, chunk } = require('./util/common');
const { takeScreenshots } = require('./util/screenshot');
const { compareScreenshots } = require('./util/compare');
const path = require('path');
const screenshots_dir = path.join(__dirname, '/screenshots');
const config = require('./config/config.json');

(async () => {
  //Step 1. Get the time stamp
  // setting the timestamp for each execution to make it unique
  const time_stamp = await getTimeStamp();
  const viewports_chunks = await chunk(config['view_ports'], 3);
  console.log(viewports_chunks);

  //Step 2. Taking screenshots for all the urls to be tested
  // looping through the environments. for now we have prod and stage.
  for (let env of config['envs']) {
    //loooping through all the viewports
    for (const viewport_chunk of viewports_chunks) {
      // looping through the urls to be processed
      for (let url_object of config['urls']) {
        const param = {
          url: url_object[env],
          page_name: url_object['name'],
          env,
          view_ports: viewport_chunk,
          time_stamp,
          screenshots_dir,
        };
        await takeScreenshots(param).catch(error => {
          console.log(JSON.stringify(error));
        });
        //console.log(JSON.stringify(param));
      }
    }
  }
  console.log('Finished generating screenshots!');

  // Step 3. Compare the screenshots
  await compareScreenshots({
    time_stamp,
    screenshots_dir,
    base_folder: 'prod',
    test_folder: 'stage',
  });
  console.log('Finished comparing screenshots!');

  // Step 4. Generate report
})();
