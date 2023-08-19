const config = require('../config/config.json');

module.exports.getTimeStamp = async () => {
  return Math.round(new Date().getTime() / 1000).toString();
};

module.exports.getScreenshotsNameList = async () => {
  const name_list = [];
  for (const url of config['urls']) {
    for (const viewport of config['view_ports']) {
      name_list.push(`${url.name}-${viewport}`);
    }
  }
  return name_list;
};

module.exports.chunk = async (array, size) => {
  const chunks = [];
  array = [].concat(...array);

  while (array.length) {
    chunks.push(array.splice(0, size));
  }

  return chunks;
};
