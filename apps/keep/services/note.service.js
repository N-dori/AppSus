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
    console.log('from servics',noteId);
    
    return storageService.remove(note_KEY, noteId)
}

function save(note) {
    const notes=utilService.loadFromStorage(note_KEY)
    if (notes.includes(note)) {
        return storageService.put(note_KEY, note)
    } else {
       
        return storageService.post(note_KEY, note)
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
function getEmptyNote(){
    const EmptyNote={
        id:utilService.makeId(),
            createdAt: Date.now(),
            type: 'NoteTxt',
            isPinned: false,
            style: {
                backgroundColor: 'red'
            },
            info: {
                title: '',
                body:''
            }
    }
    return EmptyNote
}

function saveNotes(notes){
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
                backgroundColor: '#00d'
            },
            info: {
                title: 'Fullstack Me Baby!',
                body: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me',
                body: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n102',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me',
                body: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        
    ]
    return notes
}