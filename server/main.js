import { Meteor } from 'meteor/meteor';
import {Pages, emptyDoc} from '../collections/Pages'


Meteor.startup(() => {
  if (Pages.find().count() == 0) {
    Pages.insert({doc: {data: emptyDoc, stamp: 0}})
  }
});
