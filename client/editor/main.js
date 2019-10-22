import "./main.html"
import {EditorView} from 'prosemirror-view'
import {EditorState} from 'prosemirror-state'
import {DOMParser} from 'prosemirror-model'
import {schema} from "./schema"
import {exampleSetup} from "./menu/index"

const rootElementClassName = 'prosemirror-root'

Template.ProseMirror.onRendered(function() {
    const place = this.find('.prosemirror-root')
    const doc = DOMParser.fromSchema(schema).parse(place)
    place.innerHTML = ''
    const properties = {
        state: EditorState.create({
			doc,
			plugins: exampleSetup({schema, floatingMenu: true})
		})
    }
    console.log(schema)
    const editor = new EditorView(place, properties)
})