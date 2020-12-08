import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./ContactForm.module.css";

const INITIAL_STATE = {
  name: "",
  number: "",
  id: "",
};
export default class ContactForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    this.setState({
      id: uuidv4(),
      [target.name]: target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addContact({ ...this.state });
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form
          action="submit"
          onSubmit={this.handleSubmit}
          className={styles.contactForm}
        >
          <label htmlFor="name" className={styles.contactFormLabel}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={this.handleChange}
          />
          <label htmlFor="number" className={styles.contactFormLabel}>
            Number
          </label>
          <input
            type="tel"
            name="number"
            placeholder="number"
            value={number}
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Add contact"
            className={styles.contactFormBtn}
          />
        </form>
      </>
    );
  }
}
