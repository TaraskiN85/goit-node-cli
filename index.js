import { program } from 'commander';
import * as contactsService from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case 'get':
      const contact = await contactsService.getContactById(id);
      return console.log(contact);

    case 'add':
      const addedContact = await contactsService.addContact(name, email, phone);
      return console.log(addedContact);
      break;

    case 'remove':
      const removedContact = await contactsService.removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
