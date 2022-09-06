import React, { useState } from 'react';
import Headings from './Headings';
import { useHeadingsData } from './useHeadingsData ';
import useIntersectionObserver from './useIntersectionObserver';

function TableOfContents() {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);
  return (
    <nav
      style={
        {
          position: 'sticky',
          top: 0, /* How far down the page you want your ToC to live */
          maxHeight: '100%',
          overflow: 'auto',
          padding: '1rem',
          // width: 250,
        }
      }
      aria-label="Table of contents"
    >
      <Headings headings={ nestedHeadings } activeId={ activeId } />
    </nav>
  );
}

export default TableOfContents;
