import "./main.html"
import {EditorView} from 'prosemirror-view'
import {EditorState} from 'prosemirror-state'
import {schema} from "./schema"
import {exampleSetup} from "./menu/index"

import {Pages, emptyDoc} from "../../collections/Pages"

const rootElementClassName = 'prosemirror-root'

Template.ProseMirror.onRendered(function() {
    const place = this.find(`.${rootElementClassName}`)
    place.innerHTML = ''
    const plugins = exampleSetup({schema})

    const template = this

    function ding() {
        console.log(Template.currentData())
    }

    const properties = {
        state: EditorState.create({
			doc: schema.nodeFromJSON(emptyDoc),
			plugins
        }),
        dispatchTransaction(transaction) {
            const newState = editor.state.apply(transaction)

            const options = Blaze.getData(template.view).options
            if (options.collection && options.field) {
                const update = {$set: {[options.field]: newState.doc.toJSON()}}
                options.collection.update(options.query, update)
                editor.updateState(newState)
            }
        }
    }
    const editor = new EditorView(place, properties)

    this.autorun(function(comp1) {
        const data = Template.currentData()
        if (data.options && data.options.collection && data.options.query && data.options.field) {
            const record = data.options.collection.findOne(data.options.query)
            if (record) {
                const node = schema.nodeFromJSON(record[data.options.field])
                const newState = EditorState.create({
                    schema,
                    doc: node,
                    plugins
                })
                if (!editor.hasFocus())
                    editor.updateState(newState)
            }
        }
    })
})