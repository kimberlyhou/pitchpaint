
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//create the collection for our sketches
export const Sketches = new Mongo.Collection('sketches');

Meteor.methods({
  //defines what happens when we call: Meteor.call('sketches.insert', title , sketch);
  'sketches.insert'(title, sketch) {
    check(title, String);  //validate that the title is a string
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Sketches.insert({
      title,
      sketch,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,  //this might not be necessary
    });
  },


'sketches.find'(){
  var results = Sketches.find({owner: Meteor.userId()}).fetch();
  return (results);
},




  //add additional methods we want to apply on the collection here
});
