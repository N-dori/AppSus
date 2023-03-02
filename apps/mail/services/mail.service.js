// בס"ד

// import { storageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    getMails,
    createDemoMails,
    getMail,
    getCriteria,
    createDemoCriteria,
    send,
    filterBy,
    saveCriteria,
    updateMail,
    deleteMail,
}

const MAILS_KEY = 'mailsDB'
const CRITERIA_KEY = 'criteriaDB'

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: 7777777777777,
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com'
    },
]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox',///sent/trash/draft',
    txt: '', // no need to support complex text search
    isRead: undefined,//true, // (optional property, if missing: show all)
    // isUnread: false,//true, // (optional property, if missing: show all)
    isStared: undefined,//true, // (optional property, if missing: show all)
    lables: [],//['important', 'romantic'] // has any of the labels
}

function getMails() {
    // return email
    return storageService.query(MAILS_KEY)
}

function updateMail(mail) {
    storageService.put(MAILS_KEY, mail)
}

function createDemoMails() {
    if (utilService.loadFromStorage(MAILS_KEY)) return
    utilService.saveToStorage(MAILS_KEY, emails)
}

function createDemoCriteria() {
    if (utilService.loadFromStorage(CRITERIA_KEY)) return
    utilService.saveToStorage(CRITERIA_KEY, criteria)
}

function getMail(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function getCriteria() {
    return storageService.query(CRITERIA_KEY)
}

function send(to, subject, body) {
    let newMail = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'user@appsus.com',
        to,
    }

    return storageService.post(MAILS_KEY, newMail)
}

function saveCriteria(criteria) {
    utilService.saveToStorage(CRITERIA_KEY, criteria)
}

function filterBy() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    let criteria = utilService.loadFromStorage(CRITERIA_KEY)

    // if (criteria.txt === '') return mails

    const txtRegex = new RegExp(criteria.txt, 'i')

    let filteredMails = mails.filter(item =>
        (txtRegex.test(item.from) || txtRegex.test(item.subject) || txtRegex.test(item.body)) && (item.isRead === criteria.isRead || criteria.isRead === undefined)
    )

    return filteredMails
}

function deleteMail(mail) {
    storageService.remove(MAILS_KEY, mail.id)
}