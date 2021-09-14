import React from 'react';
import Styles from './leaderboard-panel.module.css';
import Panel from 'components/panel/panel';
import Neon from 'components/neon/neon';

interface Props {
    children?: React.ReactNode;
};

export default function LeaderboardPanel ({ children } : Props) {

    return (
        <div className={Styles.root}>
            <Panel>
                <Neon>Tournament Leaderboard</Neon>
            </Panel>
        </div>
    );
};
