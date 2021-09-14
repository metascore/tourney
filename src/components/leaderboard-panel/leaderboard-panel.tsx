import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    return (
        <div className={Styles.root}>
            <Panel>
                <h2>Leaderboard</h2>
            </Panel>
        </div>
    );
};
