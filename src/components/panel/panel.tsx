import Loader from 'components/loader/loader';
import React from 'react';
import Styles from './panel.module.css';

interface Props {
    children?: React.ReactNode;
    row?: boolean;
    size?: 'sm';
    wrapContent?: boolean;
    wide?: boolean;
    loading?: boolean;
};

export default function Panel ({ children, row, size, wrapContent, wide, loading } : Props) {
    return (
        <div className={[
            Styles.root,
            wrapContent && Styles.wrapContent,
            row && Styles.row,
            size && Styles[size],
            wide && Styles.wide,
            loading && Styles.loading,
        ].join(' ')}>
            {children}
            <div className={Styles.loader}><Loader /></div>
        </div>
    );
};

export function Label ({ children } : Props) {
    return (
        <div className={Styles.label}>
            {children}
        </div>
    );
};