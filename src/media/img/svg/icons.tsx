import React from 'react'


const defaultProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  xmlns: 'http://www.w3.org/2000/svg'
}

type Props = {
  fill?: string,
  className?: string,
}

export function Close(props: Props) {
  return(
    <svg
      {...defaultProps}
      fill = {props.fill}
      className={props.className}
    >
      {/* eslint-disable-next-line max-len */}
      <path d="M18.997 6.417l-1.414-1.414L12 10.586 6.417 5.003 5.003 6.417 10.586 12l-5.583 5.583 1.414 1.414L12 13.414l5.583 5.583 1.414-1.414L13.414 12z"/>
    </svg>
  )
}

export function Arrow(props: Props) {
  return(
    <svg
      {...defaultProps}
      fill={props.fill}
      className={props.className}
    >
      <path d="M13.993 19.997L5.996 12l7.997-7.997 1.414 1.414L8.824 12l6.583 6.583z"/>
    </svg>
  )
}