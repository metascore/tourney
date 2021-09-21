import Panel, { Label } from 'components/panel/panel';
import React from 'react';
import Styles from './score-panel.module.css';
import { usePlayerStats } from 'context/player-stats';

interface Props {
    children?: React.ReactNode;
};

export default function ScorePanel ({ children } : Props) {
    const { metascore, loading } = usePlayerStats();
    return (
        <div className={Styles.root}>
            <Panel loading={loading?.metascore}>
                <Label>Your Metascore</Label>
                <div className={Styles.zero}>{formatBigScore(metascore)}</div>
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
        return <div className={Styles.score}>
            {Math.round(n / 1000)}
            <div className={Styles.label}>Thousand</div>
        </div>;
    } else if (n < 500_000_000) {
        return <div className={Styles.score}>
            <div className={Styles.number}>
                <div className={Styles.numberBig}>{(n / 1_000_000).toFixed(2).split('.')[0]}</div>
                <div className={Styles.numberSmall}>.{(n / 1_000_000).toFixed(2).split('.')[1]}</div>
            </div>
            <div className={Styles.label}>Million</div>
        </div>;
    } else if (n < 500_000_000_000) {
        return <div className={Styles.score}>
            <div className={Styles.number}>
                <div className={Styles.numberBig}>{(n / 1_000_000_000).toFixed(2).split('.')[0]}</div>
                <div className={Styles.numberSmall}>.{(n / 1_000_000_000).toFixed(2).split('.')[1]}</div>
            </div>
            <div className={Styles.label}>Billion</div>
        </div>;
    } else {
        return <div className={Styles.score}>
            <div className={Styles.number}>
                <div className={Styles.numberBig}>{(n / 1_000_000_000_000).toFixed(2).split('.')[0]}</div>
                <div className={Styles.numberSmall}>.{(n / 1_000_000_000_000).toFixed(2).split('.')[1]}</div>
            </div>
            <div className={Styles.label}>Trillion</div>
        </div>;
    };
};