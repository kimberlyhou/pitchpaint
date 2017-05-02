import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // code to run on server at startup
/*  sketchList = new Mongo.Collection('sketchList');

  sketchList.schema = new SimpleSchema({
  username: {type: String},
  title: {type: String, defaultValue: null, optional: true},
  file: {type: Object, defaultValue: null, optional: true},
  palette: {type: Object, defaultValue: null, optional: true},
});

/*db.insert({username: 'Ryan',
title: 'BoyWithApple',
file: null,
palette: null})

  const test = {
    username: 'Ryan',
    title: 'BoyWithApple',
    file: null,
    palette: null
  }

  sketchList.schema.validate(test); */


});
