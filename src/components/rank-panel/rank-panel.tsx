import Panel, { Label } from 'components/panel/panel';
import { usePlayerStats } from 'context/player-stats';
import React from 'react';
import Styles from './rank-panel.module.css';
import Badge1 from 'assets/badges/1.webp';
import Badge2 from 'assets/badges/2.webp';
import Badge3 from 'assets/badges/3.webp';
import Badge4 from 'assets/badges/4.webp';
import Badge5 from 'assets/badges/5.webp';
import Badge6 from 'assets/badges/6.webp';

interface Props {
    children?: React.ReactNode;
};

export const ranks = [{
    title: <>Not&nbsp;<br/>Ranked</>,
    badge: undefined,
}, {
    title: <>Gamer</>,
    badge: Badge1,
}, {
    title: <>Strong&nbsp;<br/>Gamer</>,
    badge: Badge2,
}, {
    title: <>Elite&nbsp;<br/>Gamer</>,
    badge: Badge3,
}, {
    title: <>3rd Best&nbsp;<br/>Gamer</>,
    badge: Badge4,
}, {
    title: <>2nd Best&nbsp;<br/>Gamer</>,
    badge: Badge5,
}, {
    title: <>The Best&nbsp;<br/>Gamer</>,
    badge: Badge6,
}];

export default function RankPanel ({ children } : Props) {
    const { tier, loading } = usePlayerStats();

    return (
        <div className={Styles.root}>
            <Panel loading={loading.thresholds || loading.top3}>
                <Label>Your Rank</Label>
                <h4 className={Styles.title}>{ranks[tier].title}</h4>

                <div className={Styles.badgeContainer}>
                    {tier === 0
                        ? <div className={Styles.badgeUnranked}></div>
                        : <img className={Styles.badge} width={100} height={100} src={ranks[tier].badge}/>
                    }
                </div>
            </Panel>
        </div>
    );
};