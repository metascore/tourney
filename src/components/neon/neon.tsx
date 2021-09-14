import React from 'react';
import Styles from './neon.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function Neon ({ children } : Props) {
    return <div className={Styles.root}>
        {children}
    </div>
};