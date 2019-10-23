import { Template } from 'meteor/templating'
import { Pages } from '../collections/Pages'

import './main.html'
import './editor/main'

Template.body.helpers({
    options() {
        const pages = Pages.find()
        if (pages.count() > 0) {
            return {
                collection: Pages,
                query: {_id: pages.fetch()[0]._id},
                field: 'doc'
            }
        }
    }
})