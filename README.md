# PitchPaint

PitchPaint uses Meteor 1.4 to target a cross-platform userbase.

If setting up your environment, please install Meteor and Node/npm or follow these instructions to set up your environment (OSX/Linux):
```sh
curl https://install.meteor.com/ | sh
# depending on which OS, download Node through this site: https://nodejs.org/en/download/package-manager/
```

To run this application for the first time, follow the commands below:
```
cd pitchpaint
meteor npm install
meteor run
```
When the program is running, you can access the Meteor.users database by opening a new tab in terminal and typing the following:
```
meteor mongo
db.users.find({})   # this will list all the users in the database on your local environment
```
