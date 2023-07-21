import React from 'react';
import classes from './styles.module.css';

export default function PioneerLink() {
  return (
    <a
      className={classes.linkWrapper}
      href="https://www.fury.black/rise"
      target="_blank"
    >
      <div className={classes.linkBox}>
        <div className={classes.linkText}>Join the Blackfury Network</div>
      </div>
    </a>
  );
}
