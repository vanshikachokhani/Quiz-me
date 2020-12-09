import React from 'react';

export default function Backdrop(props) {
  const style = {
    zIndex: '100',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return props.close ? null : <div style={style}>{props.children}</div>;
}
