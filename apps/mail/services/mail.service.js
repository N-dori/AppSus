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
]

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search
    isRead: true, // (optional property, if missing: show all)
    isStared: true, // (optional property, if missing: show all)
    lables: ['important', 'romantic'] // has any of the labels
}

function getMails() {
    // return email
    return utilService.loadFromStorage(MAILS_KEY)
}

function createDemoMails() {
    utilService.saveToStorage(MAILS_KEY, emails)
}

function createDemoCriteria() {
    utilService.saveToStorage(CRITERIA_KEY, criteria)
}

function getMail(mailId) {
    return storageService.get(MAILS_KEY, mailId)
}

function getCriteria() {
    return utilService.loadFromStorage(CRITERIA_KEY)
}