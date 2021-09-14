import Panel, { Label } from 'components/panel/panel';
import React from 'react';
import Styles from './rank-panel.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function RankPanel ({ children } : Props) {
    return (
        <div className={Styles.root}>
            <Panel>
                <Label>Your Rank</Label>
            </Panel>
        </div>
    );
};