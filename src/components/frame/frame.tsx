import React from 'react';
import Styles from './frame.module.css';

interface Props {
    head: React.ReactNode;
    body: React.ReactNode;
    opened: [number, number];
    closed: [number, number];
};

export default function Frame ({ head, body, opened, closed } : Props) {

    const headRef = React.useRef<HTMLDivElement>(null);
    const bodyRef = React.useRef<HTMLDivElement>(null);

    const headBox = [
        headRef.current?.clientWidth,
        headRef.current?.clientHeight,
    ];

    const [active, setActive] = React.useState<boolean>(false);

    return (
        <div
            className={Styles.root}
            onClick={() => setActive(!active)}
            style={{
                width: active ? opened[0] : closed[0],
                height: active ? opened[1] : closed[1],
            }}
        >
            <div className={Styles.head} ref={headRef}>{head}</div>
            <div className={Styles.body} ref={bodyRef}>{body}</div>
        </div>
    );
};