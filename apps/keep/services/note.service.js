// בס"ד
'use strict'

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
const note_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNotes,

}



function query(filterBy = {}) {
    return storageService.query(note_KEY)
        .then(notes => {
            return notes
        })
}

function get(noteId) {

    return storageService.get(note_KEY, noteId)
        .then(note => {
            return setNextPrevBookId(note)
        })
}

function remove(noteId) {
    return storageService.remove(note_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(note_KEY, book)
    } else {
        return storageService.post(note_KEY, book)
    }

}

function _createNotes() {
    let notes = utilService.loadFromStorage(note_KEY)
    if (!notes || !notes.length){
           notes =  getEmptyNotes()
           console.log('notes',notes);
           
utilService.saveToStorage(note_KEY, notes)
    return notes
    }
  
}

function getEmptyNotes() {
    const notes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
    ]
    return notes
}