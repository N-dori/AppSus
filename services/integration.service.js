// בס"ד

export const integrationService = {
    fromMailToNote,
    fromNoteToMail,
}

function fromMailToNote(mail) {
    return {
        id: mail.id,
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title: mail.subject,
            body: mail.body,
        }
    }
}

function fromNoteToMail(note) {
    return {
        id: note.id,
        subject: note.info.title,
        body: note.info.body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: '',
    }
}
