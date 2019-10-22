import {EditorState, TextSelection} from 'prosemirror-state'
import {EditorView} from 'prosemirror-view'
import {Schema, DOMParser} from 'prosemirror-model'
import {nodes as basicNodes, marks as basicMarks} from 'prosemirror-schema-basic'
import {exampleSetup} from 'prosemirror-example-setup'
import {tableNodes, tableEditing} from 'prosemirror-tables'
import {keymap} from 'prosemirror-keymap'
import {newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock} from "prosemirror-commands"


import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html'
import './editor/main'