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
    put,
    save,
    getEmptyNotes,
    getEmptyNote,
    saveNotes,

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
    const notes = utilService.loadFromStorage(note_KEY)
    if (notes.includes(note)) {
        return storageService.put(note_KEY, note)
    } else {

        return storageService.post(note_KEY, note)
    }

}
function put(note){
  return   storageService.put(note_KEY, note)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(note_KEY)
    if (!notes || !notes.length) {
        notes = getEmptyNotes()
        console.log('notes', notes);

        utilService.saveToStorage(note_KEY, notes)
        return notes
    }

}
function getEmptyNote(type) {
    const EmptyNote = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: {
            backgroundColor: 'lightgray'
        },
        info: {
            title: '',
            body: '',
            url:null,
        }
    }
    console.log('getEmptyNote',EmptyNote);
    
    return EmptyNote
}

function saveNotes(notes) {
    utilService.saveToStorage(note_KEY, notes)
}

function getEmptyNotes() {
    const notes = [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: {
                backgroundColor: '#A86464'
            },
            info: {
                title: 'Googel Keep Me Baby!',
                body: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1112222,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                title: 'sprint 3 my fevorit',
                body: 'Gmail and keep are synced'
            },
            style: {
                backgroundColor: '#804674'
            }
        },
        {
            id: 'n109',
            createdAt: 1112222,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'https://t4.ftcdn.net/jpg/02/59/36/31/240_F_259363172_jALzZGupDJXuJN4iioGkGAQu4keiG8Aq.jpg',
                title: 'password for submarin',
                body: '!@lki%$#hshs#'
            },
            style: {
                backgroundColor: '#00d'
            }
        },

    ]
    return notes
}