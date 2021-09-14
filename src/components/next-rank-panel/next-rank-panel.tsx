import Panel, { Label } from 'components/panel/panel';
import Progress from 'components/progress/progress';
import React from 'react';
import Styles from './next-rank-panel.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function NextRankPanel ({ children } : Props) {
    return (
        <div className={Styles.root}>
            <Panel>
                <Label>Next Rank</Label>
                <h4>Gamer</h4>
                <Progress />
            </Panel>
        </div>
    );
};