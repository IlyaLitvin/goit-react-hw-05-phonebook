import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";
import { CSSTransition } from "react-transition-group";

const FilterName = function ({ filterRender, filter }) {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames={styles}
      unmountOnExit
    >
      <div>
        <label htmlFor="name" className={styles.contactFormLabel}>
          Find contacts by name
        </label>
        <input
          type="text"
          value={filter}
          onChange={(e) => filterRender(e.target.value)}
        />
      </div>
    </CSSTransition>
  );
};

FilterName.propTypes = {
  filterRender: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

export default FilterName;
