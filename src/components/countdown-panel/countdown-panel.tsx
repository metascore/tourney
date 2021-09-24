import React from 'react';
import Styles from './countdown-panel.module.css';
import Panel, { Label } from 'components/panel/panel';

const start = new Date ('September 22 2021 00:00:00 PST').getTime();
const end = new Date ('September 25 2021 00:00:00 PST').getTime();

interface Props {
    children?: React.ReactNode;
};

export default function CountdownPanel ({ children } : Props) {
    const now = new Date().getTime();

    const status : 'countdown' | 'on' | 'done' = 
        now <= start
        ? 'countdown'
        : now < end
            ? 'on'
            : 'done';
    
    const zero : number = status === 'countdown' ? start : end;

    const [delta, setDelta] = React.useState<number>(zero - now);

    React.useEffect(() => {
        if (status !== 'done') {
            const iter = setInterval(() => {
                setDelta(Math.max(zero - new Date().getTime(), 0));
            }, 1000)
            return () => clearInterval(iter)
        }
    }, [status, now]);

    return (
        <div className={Styles.root}>
            <Panel>
                <Label>
                    <div className={Styles.label}>
                        <div>Tournament {status === 'countdown' ? 'Begins' : status === 'on' ? 'Ends' : 'Finished'}</div>
                        <div>Midnight, Sept {new Date(zero).getDate()}</div>
                    </div>
                </Label>
                <div className={Styles.countdown}>
                    {countdownFormat(delta)}
                </div>
            </Panel>
        </div>
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