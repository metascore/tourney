import React from 'react';
import Styles from './post.module.css';
import Neon from 'components/neon/neon';

interface Props {
    title: string;
    children?: React.ReactNode;
};

export default function Post ({ children, title } : Props) {
    return (
        <div className={Styles.root}>
            <Neon>{title}</Neon>
            <div className={Styles.divider} />
            {children}
        </div>
    );
};