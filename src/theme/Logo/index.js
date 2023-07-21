/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig, useWindowSize } from '@docusaurus/theme-common';
import classes from './style.module.css';

export default function Logo(props) {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: {
      title: navbarTitle,
      logo = {
        src: '',
      },
    },
  } = useThemeConfig();
  const windowSize = useWindowSize();
  const { imageClassName, titleClassName, ...propsRest } = props;
  const logoLink = useBaseUrl(logo.href || '/');
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.srcDark || logo.src),
  };
  const themedImage = (
    <ThemedImage
      sources={sources}
      height={logo.height}
      width={logo.width}
      alt={logo.alt || navbarTitle || title}
    />
  );
  return (
    <>
      <Link
        to={logoLink}
        {...propsRest}
        {...(logo.target && {
          target: logo.target,
        })}
      >
        {logo.src &&
          (imageClassName ? (
            <div className={imageClassName}>{themedImage}</div>
          ) : (
            themedImage
          ))}
        {navbarTitle != null && <b className={titleClassName}>{navbarTitle}</b>}
      </Link>
      {windowSize === 'desktop' && (
        <div className={classes.desktopLogoWrapper}>
          <svg
            width="1"
            height="51"
            viewBox="0 0 1 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0.5"
              y1="-2.18557e-08"
              x2="0.500002"
              y2="51"
              stroke="#B4B9BB"
            />
          </svg>
          <h3 className="subtitleWrapper">Developer Docs</h3>
        </div>
      )}
    </>
  );
}
