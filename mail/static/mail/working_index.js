document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);

    document.querySelector('#compose-form').onsubmit = submit;

    // By default, load the inbox
    load_mailbox('inbox');
});


function compose_email() {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#email-view').style.display = 'none';


    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {

    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-view').style.display = 'none';

    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

    fetch(`/emails/${mailbox}`)
        .then(response => response.json())
        .then(emails => {
            console.log(emails)
            for (let i of Object.keys(emails)) {
                const email = document.createElement('div');
                email.classList.add('email');
                if (emails[i].read) {
                    email.classList.add('is_read');
                }

                email.innerHTML = `
                    <div>Subject: ${emails[i].subject}</div>
                    <div>Sender: ${emails[i].sender}</div>
                    <div>Date: ${emails[i].timestamp}</div>
                `;

                email.addEventListener('click', () => show_email(emails[i].id, mailbox));

                document.querySelector('#emails-view').append(email);
            };
        });
}


function submit() {
    const compose_recipients = document.querySelector('#compose-recipients').value;
    const compose_subject = document.querySelector('#compose-subject').value;
    const compose_body = document.querySelector('#compose-body').value;

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: compose_recipients,
            subject: compose_subject,
            body: compose_body
        })
    })
    .then(response => response.json())
    .then(result => {
            console.log(result)
        });
    load_mailbox('sent');
    return false;
}


function show_email(id, mailbox) {

    document.querySelector('#email-view').style.display = 'block';
    document.querySelector('#emails-view').style.display = 'none';


    fetch(`/emails/${id}`)
        .then(response => response.json())
        .then(email => {
            console.log(email);
            document.querySelector('#email-view').innerHTML = `
            <div>From: ${email.sender}</div>
            <div>To: ${email.recipients}</div>
            <div>Subject: ${email.subject}</div>
            <div>Timestamp: ${email.timestamp}</div>            
            
            <div>
                ${email.body}
            </div>
            
          `;
        })
}
