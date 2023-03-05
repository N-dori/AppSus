// בס"ד

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    getMails,
    createDemoMails,
    getMail,
    getCriteria,
    createDemoCriteria,
    send,
    filterByText,
    filterByRead,
    saveCriteria,
    updateMail,
    deleteMail,
    showBy,
    filterByStar,
}

const MAILS_KEY = 'mailsDB'
const CRITERIA_KEY = 'criteriaDB'

const emails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: 'e102',
        subject: '123',
        body: 'Wגדבדגבדגבs',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'בש@momo.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'SALE SALE SALE',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.  ',
        isRead: false,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'Sale@mall.com',
        to: 'user@appsus.com',
        isTrash: true,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Hi from alaska',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.  ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'aunt@uncle.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: true,
    },
    {
        id: utilService.makeId(),
        subject: 'spam',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.  ',
        isRead: false,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: 'בש@momo.com',
        from: 'user@appsus.com',
        isTrash: true,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'New safty terms',
        body: 'Update your security via gogle passwords',
        isRead: false,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'google@google.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'News letter',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'club@momo.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Demo data',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: 'lorem@ipsum.com',
        from: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Try harder',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'moti@vation.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Nah',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: 'rea@lity.com',
        from: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Its late',
        body: 'WגדבדגLorem ipsum dolor sit amet consectetur adipisicing elit. בדגבs',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: '2:26@am.com',
        from: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'BUGS BUGS BUGS',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'bugs@evereywhere.com',
        to: 'user@appsus.com',
        isTrash: true,
        isStared: true,
    },
    {
        id: utilService.makeId(),
        subject: 'test',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'one@two.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'almost',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'abit@more.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'not many left',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: 'hang@on.com',
        from: 'user@appsus.com',
        isTrash: true,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Sprint 3',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: true,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        from: 'sleep@less.com',
        to: 'user@appsus.com',
        isTrash: false,
        isStared: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Good Luck',
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
        isRead: false,
        sentAt: (Date.now() - (Math.random() * 1000000000)),
        removedAt: null,
        to: 'ullneed@it.com',
        from: 'user@appsus.com',
        isTrash: false,
        isStared: false,
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
        isTrash: false,
        isStared: false,
    }

    return storageService.post(MAILS_KEY, newMail)
}

function saveCriteria(criteria) {
    utilService.saveToStorage(CRITERIA_KEY, criteria)
}

function filterByText() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    let criteria = utilService.loadFromStorage(CRITERIA_KEY)

    // if (criteria.txt === '') return mails

    const txtRegex = new RegExp(criteria.txt, 'i')

    let filteredMails = mails.filter(item =>
        (txtRegex.test(item.from) || txtRegex.test(item.subject) || txtRegex.test(item.body))
    )

    return filteredMails
}

function filterByRead() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    let criteria = utilService.loadFromStorage(CRITERIA_KEY)

    let filteredMails = mails.filter(item =>
        (item.isRead === criteria.isRead || criteria.isRead === undefined)
    )

    console.log('filteredMails', filteredMails)

    return filteredMails
}

function filterByStar() {
    let mails = utilService.loadFromStorage(MAILS_KEY)
    let criteria = utilService.loadFromStorage(CRITERIA_KEY)

    let filteredMails = mails.filter(item => item.isStared === criteria.isStared || criteria.isStared === undefined)

    return filteredMails
}

function showBy(val) {
    let mails = utilService.loadFromStorage(MAILS_KEY)


    switch (val) {
        case 'inbox': {
            return mails.filter(item =>
                item['to'] === "user@appsus.com" && (item['isTrash'] === false)
            )
        }
        case 'sent': {
            return mails.filter(item =>
                (item['from'] === 'user@appsus.com' && item['isTrash'] === false)
            )
        }
        case 'trash': {
            return mails.filter(item =>
                item['isTrash'] === true
            )
        }
    }
}

function deleteMail(mail) {
    if (mail['isTrash'] === true
    ) {
        storageService.remove(MAILS_KEY, mail.id)
        return
    }

    mail['isTrash'] = true
    storageService.put(MAILS_KEY, mail)
}