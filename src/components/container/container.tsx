import React from 'react';
import Styles from './container.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function Container ({ children } : Props) {
    return <div className={Styles.root}>{children}</div>
};