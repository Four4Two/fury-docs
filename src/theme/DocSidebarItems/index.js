/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { memo, useEffect, useState } from 'react';
import DocSidebarItem from '@theme/DocSidebarItem';
import {
  DocSidebarItemsExpandedStateProvider,
  useWindowSize,
} from '@docusaurus/theme-common';
import MobileSocialLinks from '@site/src/components/MobileSocialLinks';
import styles from '@site/src/theme/Navbar/styles.module.css';
import Toggle from '@site/src/theme/Toggle';
import { useColorModeToggle } from '@site/src/theme/Navbar';
import classes from './style.module.css';
import '@fontsource/inter';

// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation
function DocSidebarItems({ items, ...props }) {
  const windowSize = useWindowSize();
  const colorModeToggle = useColorModeToggle();
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const tableOfContent = [];
    for (const item of items) {
      if (item.label === 'Develop on Cosmos Co-Chain') {
        tableOfContent.push(item);
        const lastPushed = tableOfContent.length - 1;

        if (
          tableOfContent[lastPushed].items.filter((item) =>
            item.href?.includes('https')
          ).length === 0
        ) {
          tableOfContent[lastPushed].items = [
            ...tableOfContent[lastPushed].items,
            {
              type: 'link',
              label: 'REST API Spec',
              href: 'https://swagger.fury.black/',
            },
            {
              type: 'link',
              label: 'Protocol Reference',
              href: 'https://pkg.go.dev/github.com/four4two/fury',
            },
          ];
        }
      } else {
        tableOfContent.push(item);
      }
    }

    setToc(tableOfContent);
  }, [items]);

  return (
    <DocSidebarItemsExpandedStateProvider>
      {toc.map((item, index) => (
        <div key={index}>
          <DocSidebarItem
            key={index} // sidebar is static, the index does not change
            item={item}
            index={index}
            {...props}
          />
          {/*only display social links on mobile below the very last tab*/}
          {windowSize === 'mobile' && item.label === 'Participate in Network' && (
            <div className={classes.linksWrapper}>
              <MobileSocialLinks />
              <Toggle
                className={styles.toggle}
                checked={colorModeToggle.isDarkTheme}
                onChange={colorModeToggle.toggle}
              />
            </div>
          )}
        </div>
      ))}
    </DocSidebarItemsExpandedStateProvider>
  );
}

export default memo(DocSidebarItems);
