import React from 'react';
import Styles from './countdown-panel.module.css';
import Panel, { Label } from 'components/panel/panel';

interface Props {
    children?: React.ReactNode;
};

export default function CountdownPanel ({ children } : Props) {
    const stopCount = new Date ('2021-09-26');
    const [countdown, setCountdown] = React.useState<number>(new Date(stopCount).getTime() - new Date().getTime());

    React.useEffect(() => {
        const iter = setInterval(() => {
            setCountdown(new Date(stopCount).getTime() - new Date().getTime());
        }, 1000)
        return () => clearInterval(iter)
    }, []);
    return (
        <Panel>
            <Label>
                <div className={Styles.label}>
                    <div>Tournament Ends</div>
                    <div>Midnight, Sept 25</div>
                </div>
            </Label>
            <div className={Styles.countdown}>
                {countdownFormat(countdown)}
            </div>
        </Panel>
    );
};

function pad(n: number) { return n < 10 ? `0${n}` : `${n}` }

export function countdownFormat(countdown: number) : string {
    // This expects a number representing a duration of time remaining.
    // Returns a string "0:00:00:00"
    const t = countdown / 1000;
    const d = Math.floor(t / (60 * 60 * 24));
    const h = Math.floor(t % (60 * 60 * 24) / (60 * 60));
    const m = Math.floor(t % (60 * 60) / 60);
    const s = Math.floor(t % (60 * 60) % 60);
    return `${d}:${pad(h)}:${pad(m)}:${pad(s)}`;
}