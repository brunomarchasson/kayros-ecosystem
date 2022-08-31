import React, { useState } from 'react'
import Headings from './Headings';
import useHeadingsData from './useHeadingsData ';
import useIntersectionObserver from './useIntersectionObserver';

const TableOfContents = () => {
  const { nestedHeadings } = useHeadingsData();
  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);
  return (
    <nav style={
      {
        position: 'sticky',
        top: 24, /* How far down the page you want your ToC to live */
        maxHeight: 'calc(100vh - 40px)',
        overflow: 'auto',
      }
    } aria-label="Table of contents">
      <Headings headings={nestedHeadings} activeId={activeId}  />
    </nav>
  );
};

export default TableOfContents;
