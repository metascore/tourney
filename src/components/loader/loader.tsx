import React from 'react';
import Styles from './loader.module.css';

export default function Loader () {
    return <svg className={Styles.root} width="16" height="16" viewBox="0 0 16 16">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 16C3.58173 16 0 12.4183 0 8C0 3.58173 3.58173 0 8 0C12.4183 0 16 3.58173 16 8H14C14 4.68629 11.3137 2 8 2C4.68628 2 2 4.68629 2 8C2 11.3137 4.68628 14 8 14V16Z" fill="#FCE6FF"/>
    </svg>
};