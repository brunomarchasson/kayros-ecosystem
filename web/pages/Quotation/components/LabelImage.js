/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Shape({
  shape, width, height, r,
}) {
  if (shape === 0) {
    return (
      <circle
        cx={ width / 2 - 1 }
        cy={ width / 2 + 1 }
        r={ width / 2 }
        fill="white"
        stroke="#F51111"
      />
    );
  }
  if (shape === 1) {
    return (
      <ellipse
        cx={ width / 2 - 1 }
        cy={ height / 2 + 1 }
        rx={ width / 2 }
        ry={ height / 2 }
        fill="white"
        stroke="#F51111"
      />
    );
  }
  if (shape === 3) {
    return (
      <svg
        width={ width }
        height={ height }
        viewBox="0 0 52 51"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43.2 0.799988C45.6 1.09999 44.1 9.29999 41.7 14.9C39.2 20.4 35.9 23.2 38.6 27.5C41.3 31.9 49.9 37.8 51.2 41.2C52.4 44.7 46.2 45.7 41.1 44.6C36 43.6 32 40.5 27.1 42C22.3 43.5 16.6 49.6 13.3 49.6C9.9 49.6 9 43.6 6.3 38.6C3.5 33.7 -1.1 29.8 1.9 27.8C5 25.7 15.7 25.4 18 19.7C20.4 14 14.3 2.99999 14.6 1.39999C14.9 -0.100012 21.4 7.89999 27.9 8.09999C34.4 8.19999 40.8 0.499988 43.2 0.799988Z"
          stroke="#F51111"
        />
      </svg>
    );
  }
  return (
    <rect
      x="0.5"
      y="0.5"
      width={ width - 1 }
      height={ height - 1 }
      rx={ r }
      fill="white"
      stroke="#F51111"
    />
  );
}
Shape.propTypes = {
  shape: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  r: PropTypes.number,
};

function LabelImage({ shape = 2 }) {
  const { t } = useTranslation();
  const h = 120;
  const w = shape === 0 ? 120 : 180;
  const r = 5;
  return (
    <svg
      width={ w }
      height={ h }
      viewBox={ `-80 0 ${w + 80} ${h}` }
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="startarrow"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polyline points="10 0,0 3.5, 10 7" stroke="#000" />
        </marker>
        <marker
          id="endarrow"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polyline points="0 0,10 3.5, 0 7" stroke="#000" />
        </marker>
      </defs>
      <Shape shape={ shape } width={ w } height={ h } r={ r } />
      <line
        x1="-5"
        y1="0"
        x2="-5"
        y2={ h }
        stroke="#000"
        markerEnd="url(#endarrow)"
        markerStart="url(#startarrow)"
      />
      <text x="-10" y={ h / 2 } dy="5" textAnchor="end" fill="#000">
        { t('quotation.height') }
      </text>
      <line
        x1="0"
        y1={ h + 5 }
        x2={ w }
        y2={ h + 5 }
        stroke="#000"
        markerEnd="url(#endarrow)"
        markerStart="url(#startarrow)"
      />
      <text x={ w / 2 } y={ h + 10 } dy="10" textAnchor="middle" fill="#000">
        { t('quotation.width') }
      </text>
    </svg>
  );
}

LabelImage.propTypes = {
  shape: PropTypes.number,
};

export default LabelImage;
