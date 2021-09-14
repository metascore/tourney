import Panel, { Label } from 'components/panel/panel';
import Progress from 'components/progress/progress';
import React from 'react';
import Styles from './next-rank-panel.module.css';
import Badge1 from 'assets/badges/1.webp';
import Badge2 from 'assets/badges/2.webp';
import Badge3 from 'assets/badges/3.webp';
import Badge4 from 'assets/badges/4.webp';
import Badge5 from 'assets/badges/5.webp';
import Badge6 from 'assets/badges/6.webp';

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
                <div className={Styles.badgeContainer}>
                    <img className={Styles.badge} width={56} height={56} src={Badge1} />
                    <div className={Styles.text}>~1 Trillion Points</div>
                </div>
            </Panel>
        </div>
    );
};