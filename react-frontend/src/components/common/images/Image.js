import React from 'react'
import Style from './Image.module.scss'

import classNames from 'classnames'

const Image = (props) => {
    return (
        <img src={props.src} style={props.style} className={classNames(Style.img, Style.imgRadius)} alt={props.alt || '사진'} />
    )
}

export default Image
