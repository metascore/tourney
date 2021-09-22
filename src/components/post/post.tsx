import React from 'react';
import Styles from './post.module.css';
import Neon from 'components/neon/neon';
import {Helmet} from 'react-helmet';

interface Props {
    title: string;
    children?: React.ReactNode;
    og?: string;
};

export default function Post ({ og, children, title } : Props) {
    return (
        <div className={Styles.root}>
            <Helmet>
                <meta name="og:title" content={title} />
                <meta name="og:image" content={og} />
            </Helmet>
            <Neon>{title}</Neon>
            <div className={Styles.divider} />
            {children}
        </div>
    );
};