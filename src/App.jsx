import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import { addContact, deleteContact } from './redux/contactsSlice';
import { changeFilter } from './redux/filtersSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    storedContacts.forEach(contact => dispatch(addContact(contact)));
  }, [dispatch]);

  const addNewContact = (name, number) => {
    const newContact = { id: Date.now(), name, number };
    dispatch(addContact(newContact));
  };

  const deleteContactHandler = (id) => {
    dispatch(deleteContact(id));
  };

  const handleSearch = (value) => {
    dispatch(changeFilter(value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <h1>PhoneBook</h1>
        <ContactForm onSubmit={addNewContact} />
        <SearchBox filter={filter} onFilterChange={handleSearch} />
        {filteredContacts.length > 0 ? (
          <ContactList contacts={filteredContacts} onDeleteContact={deleteContactHandler} />
        ) : (
          <p style={{ textAlign: 'center', color: '#A0A0A0', marginTop: '20px' }}>No contacts available.</p>
        )}
      </div>
    </PersistGate>
  );
};

export default App;
