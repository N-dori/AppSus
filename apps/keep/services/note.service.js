// בס"ד
'use strict'

import {storageService} from'../../../services/async-storage.service.js'
import {utilService} from'../../../services/util.service'
const Book_KEY = 'bookDB'

//_createDemoNotes()

export const noteService = {
    query,
    get,
    remove,
    save,

}



function query(filterBy = {}) {
    return storageService.query(Book_KEY)
        .then(notes => {
            return notes
        })
}

function get(noteId) {

    return storageService.get(Book_KEY, noteId)
   .then(note =>{
    return setNextPrevBookId(note)
   })
    
}

function remove(noteId) {
    return storageService.remove(Book_KEY, noteId)
}

function save(note) {
      if (note.id) {
        return storageService.put(Book_KEY, book)
    } else {
        return storageService.post(Book_KEY, book)
    }
  
}
  


function getEmptyNotes() {
}