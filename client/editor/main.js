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

    let lastUpdate = {}

    const properties = {
        state: EditorState.create({
			doc: schema.nodeFromJSON(emptyDoc),
			plugins
        }),
        dispatchTransaction(transaction) {
            const newState = editor.state.apply(transaction)

            const options = Blaze.getData(template.view).options
            if (options.collection && options.field) {
                const stamp = (new Date()).getTime + Math.random()
                const update = {$set: {[options.field]: {data: newState.doc.toJSON(), stamp}}}
                lastUpdate = {newState, stamp}
                options.collection.update(options.query, update)
            }
        }
    }
    const editor = new EditorView(place, properties)

    this.autorun(function(comp1) {
        const data = Template.currentData()
        if (data.options && data.options.collection && data.options.query && data.options.field) {
            const record = data.options.collection.findOne(data.options.query)
            if (record) {
                const info = record[data.options.field]
                const node = schema.nodeFromJSON(info.data)
                const newState = EditorState.create({
                    schema,
                    doc: node,
                    plugins
                })
                if (info.stamp && lastUpdate.stamp && info.stamp == lastUpdate.stamp)
                    editor.updateState(lastUpdate.newState)
                else
                    editor.updateState(newState)
            }
        }
    })
})