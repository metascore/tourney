import Panel, { Label } from 'components/panel/panel';
import Progress from 'components/progress/progress';
import React from 'react';
import Styles from './next-rank-panel.module.css';
import { ranks } from 'components/rank-panel/rank-panel';
import { usePlayerStats } from 'context/player-stats';

interface Props {
    children?: React.ReactNode;
};

export default function NextRankPanel ({ children } : Props) {

    const { metascore, tier, thresholds, topScores } = usePlayerStats();
    const nextTier = Math.min(tier + 1, ranks.length - 1);
    const nextRank = ranks[nextTier];
    const threshold = React.useMemo(() => {
        if (nextTier === 2) {
            return thresholds?.strong;
        } else if (nextTier === 3) {
            return thresholds?.elite;
        } else if (nextTier === 4) {
            return topScores ? topScores[2][1] : metascore;
        } else if (nextTier === 5) {
            return topScores ? topScores[1][1] : metascore;
        } else if (nextTier === 6) {
            return topScores ? topScores[0][1] : metascore;
        }
    }, [metascore, tier, thresholds, topScores]);

    return (
        <div className={Styles.root}>
            <Panel>
                <Label>Next Rank</Label>
                <h4 className={Styles.title}>{nextRank.title}</h4>
                <Progress width={Math.round(metascore / Number(threshold) * 100)} />
                <div className={Styles.badgeContainer}>
                    <img className={Styles.badge} width={56} height={56} src={nextRank.badge} />
                    <div className={Styles.text}>{formatBigScore(Number(threshold))} Points</div>
                </div>
            </Panel>
        </div>
    );
};

function formatBigScore (n : number) {
    if (n === 0) {
        return <div className={Styles.score}>Zero</div>;
    } else if (n < 100_000) {
        return <div className={Styles.score}>n</div>;
    } else if (n < 500_000) {
        return Math.round(n / 1000) + ' Thousand';
    } else if (n < 500_000_000) {
        return (n / 1_000_000).toFixed(2) + ' Million';
    } else if (n < 500_000_000_000) {
        return (n / 1_000_000_000).toFixed(2) + ' Billion';
    } else {
        return (n / 1_000_000_000_000).toFixed(2) + ' Trillion';
    };
};