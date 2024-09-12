import React, { useEffect, useRef, useState } from 'react';

const DIRS = {
  t: style => style.paddingTop,
  b: style => style.paddingBottom,
  l: style => style.paddingLeft,
  r: style => style.paddingRight,
  x: style => style.paddingLeft,
  y: style => style.paddingTop,
  a: style => style.padding,
};

export const PaddingItem = ({ dir, level }) => {
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
    backgroundColor: '#c3deb7',
    outline: '1px solid #ccc',
    height: '130px',
  };
  const boxDivStyle = {
    backgroundColor: '#fff',
    height: '100%',
  };
  const [padding, setPadding] = useState('');

  useEffect(() => {
    if (el.current) {
      const style = getComputedStyle(el.current);

      setPadding(DIRS[dir](style));
    }
  });

  return (
    <div>
      <div ref={el} style={boxStyle} className={`ik-p${dir}-${level}`}>
        <div style={boxDivStyle}></div>
      </div>
      <div style={titleStyle}>
        <b>ik-p{dir}-{level}</b>
        <code style={{color: '#aaa', fontSize: 12}}>{padding}</code>
      </div>
    </div>
  )
}
