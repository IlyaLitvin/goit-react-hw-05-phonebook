import React, { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import styles from "./App.module.css";
import { CSSTransition } from "react-transition-group";
import ErrNot from "./components/ErrorNotification/ErrorNotification.js";

export default class App extends Component {
  state = {
    contacts: [
      // { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      // { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      // { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      // { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    contactAdded: false,
    declaredName: "",
  };

  componentDidMount() {
    const localList = localStorage.getItem("contacts");
    if (localList) {
      this.setState({ contacts: JSON.parse(localList) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  toAddContact = (el) => {
    const { contacts } = this.state;
    const rule = contacts.some((contact) => contact.name === el.name);
    if (rule) {
      this.setState({ contactAdded: true });
      setTimeout(() => this.setState({ contactAdded: false }), 2000);
      return;
    } else if (el.name.length >= 1) {
      this.setState((prev) => {
        const updateState = [...prev.contacts, el];
        return { contacts: updateState };
      });
    }
  };

  filterRender = (filter) => {
    this.setState({ filter });
  };

  filtresTask() {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  toDeleteContact = (id) => {
    const { contacts } = this.state;
    const obj = contacts.find((el) => el.id === id);
    const index = contacts.indexOf(obj);
    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts.slice(0, index),
        ...prevState.contacts.slice(index + 1),
      ],
    }));
  };

  render() {
    const { contacts, filter, contactAdded, declaredName } = this.state;
    const filterText = this.filtresTask();
    return (
      <>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={styles}
          unmountOnExit
        >
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm addContact={this.toAddContact} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} filterRender={this.filterRender} />
        )}
        <ContactList list={filterText} deleteList={this.toDeleteContact} />
        <ErrNot name={declaredName} contactAdded={contactAdded} />
      </>
    );
  }
}
