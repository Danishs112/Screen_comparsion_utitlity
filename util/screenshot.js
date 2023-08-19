const Pageres = require('pageres');

module.exports.takeScreenshots = async param => {
  const paramObject = {
    delay: 2,
    launchOptions: { waitUntil: 'networkidle2' },
    filename: `${param['page_name']}-<%= size %>`,
    //crop: true
  };
  if (param['page_name'].startsWith('admin')) {
    paramObject['beforeScreenshot'] = loginToAdmin;
    console.log(`this is admin url - ${param['url']}`);
    paramObject['url'] = param['url'];
  }

  if (param['page_name'].startsWith('popup')) {
    paramObject['beforeScreenshot'] = removePopUp;
    console.log(`this is pop url - ${param['url']}`);
    paramObject['url'] = param['url'];
  }

  await new Pageres(paramObject)
    .src(param['url'], param['view_ports'])
    .dest(`${param['screenshots_dir']}/${param['time_stamp']}/${param['env']}`)
    .run();
  console.log(' --- run for - ' + JSON.stringify(param));
};

async function loginToAdmin(page, browser) {
  console.log(`admin login function called for url ${this.url}`);

  try {
    await page.type('input#email', 'sumit.thorat123@karvyinfotech.com', {
      delay: 20,
    });
    await page.type('input#password', 'Sam@4005', { delay: 20 });
    await page.click('button.btn-primary');
    await page.waitForSelector('img[src*="dashboard"]', { visible: true });
  } catch (error) {
    console.log(error);
  }
}

async function removePopUp(page, browser) {
  console.log('remove pop up from the page');
  try {
    await page.waitForSelector('div.MuiDialog-paperWidthSm', {
      visible: true,
      delay: 40,
    });
    await page.click('button.css-11sjhq8', { force: true });
    await page.waitForSelector('div.MuiDialog-paperWidthSm', {
      visible: false,
      delay: 20,
    });
  } catch (error) {
    console.log('error');
  }
}
