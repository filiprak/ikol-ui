import React, { useEffect, useRef, useState } from 'react';

const DIRS = {
  t: style => style.marginTop,
  b: style => style.marginBottom,
  l: style => style.marginLeft,
  r: style => style.marginRight,
  x: style => style.marginLeft,
  y: style => style.marginTop,
  a: style => style.margin,
};

export const MarginItem = ({ dir, level }) => {
  const el = useRef(null);
  const titleStyle = {
    display: 'flex',
    padding: '5px',
    outline: '1px solid #ccc',
    marginTop: '1px',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const boxStyle = {
    display: 'grid',
    backgroundColor: '#f9cc9d',
    outline: '1px solid #ccc',
    height: '130px',
  };
  const boxDivStyle = {
    backgroundColor: '#fff',
  };
  const [margin, setMargin] = useState('');

  useEffect(() => {
    if (el.current) {
      const style = getComputedStyle(el.current);

      setMargin(DIRS[dir](style));
    }
  });

  return (
    <div>
      <div style={boxStyle}>
        <div ref={el} style={boxDivStyle} className={`ik-m${dir}-${level}`}></div>
      </div>
      <div style={titleStyle}>
        <b>ik-m{dir}-{level}</b>
        <code style={{color: '#aaa', fontSize: 12}}>{margin}</code>
      </div>
    </div>
  )
}
