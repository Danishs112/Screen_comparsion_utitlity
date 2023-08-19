<<<<<<< HEAD
# Screenshot Comparison Utility

This utility is created for doing the screenshot comparison for two different environments. The intent is to check for any break in the design of the webpages. This utility takes screenshots of web application in multiple environments like prod and stage. After that it compares the screenshots. This utility is present in the packages folder of Homebazaar git repo. 

## How to use?

- **Installation** - Go to the root directory of the Homebazaar repo and do the yarn install.
```sh
$ yarn install
```

- **Configuration** - In config/config.json file, we can set the different viewports in the viewports array. In the urls array, we can set all the required urls for which screenshot comparison has to be done

```json
{
    "envs": [
        "prod",
        "stage"
    ],
    "view_ports": [
        "1152x720",
        "1440x900",
        "1920x1080"
    ],
    "urls": [
        {
            "name": "homepage",
            "prod": "https://www.homebazaar.com",
            "stage": "http://nginx.yourhomekart.in"
        }
    ]
}
```
- **Start Execution** - Trigger the exection using below command
```sh
$ yarn start

or 

$ node index.js
```

- **How does it work?** - It reads the environments, viewports, and urls from the config.json file. After that it captures the screenshots of each url in all viewports and environments mentioned in the configuration. Then finally it compares the screenshots and generates another screenshot with differences.


- **Reports** - The screenshots are captured under screenshots folder. The folders are created with the epoch time stamp. Under each epoch timestamped folder, there are further three folders created. Out of these three, two folders will be created by the name of environments, __prod__ and __stage__ and the third folder is named as __diff__ which contains the comparison screenshots.

## Known Issues

- The underlying tool for this utility, i.e Puppeteer, sometimes hangs while capturing screenshot of mobile view. It doesn't display any error log.  

## Possible Enhancements
- converting this utility to cloud bases saas service (possibly AWS Lambda based) where this utility can be executed as quickly as possible. Also we should have some sort of UI where we can see the report.
=======
# Screen_comparsion_utitlity
>>>>>>> 17b722d8b79043d873091587d2c1397e8ec0ae96
