import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ContactList = function ({ list, deleteList }) {
  return (
    <TransitionGroup component="ul" className={styles.TaskList}>
      {list.map((e) => {
        return (
          <CSSTransition key={e.id} timeout={250} classNames={styles}>
            <li className={styles.contactListItem}>
              {e.name} : {e.number}
              <button
                type="button"
                onClick={() => deleteList(e.id)}
                className={styles.contactListBtn}
              >
                Удалить
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

ContactList.propTypes = {
  deleteList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
