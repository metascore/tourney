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
                <h4>Not<br/>Ranked</h4>

                <div className={Styles.badgeContainer}>
                    <div className={Styles.badgeUnranked}></div>
                </div>
            </Panel>
        </div>
    );
};