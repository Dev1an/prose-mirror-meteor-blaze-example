import { Mongo } from 'meteor/mongo'

export const Pages = new Mongo.Collection('pages')
export const emptyDoc = {type: "doc", content: [{type: "paragraph"}]}
