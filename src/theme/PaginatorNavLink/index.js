/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import classes from './styles.module.css';
import NextArrow from '@site/src/components/NextArrow';
import PreviousArrow from '@site/src/components/PreviousArrow';
export default function PaginatorNavLink(props) {
  const { permalink, title, subLabel } = props;
  const { children } = subLabel.props;
  const isNext = children === 'Next';
  const flexDirection = isNext ? 'row-reverse' : '';
  return (
    <Link
      to={permalink}
      className={classes.navigatorLinkWrapper}
      style={{
        color: 'var(--ifm-navbar-link-color)',
        display: 'flex',
        flexDirection: flexDirection,
      }}
    >
      {isNext ? <NextArrow /> : <PreviousArrow />}
      <div>
        {subLabel && <h6 className={classes.subtitle}>{subLabel}</h6>}
        <h4 className={classes.title}>{title}</h4>
      </div>
    </Link>
  );
}
