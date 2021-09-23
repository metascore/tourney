import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { createActor, GamePrincipal } from '@metascore/query';
import Loader from 'components/loader/loader';
import { useAccount } from 'context/account';
import { useEnv } from 'context/env';
import React from 'react';
import { useParams } from 'react-router-dom';
import Styles from './game-list.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function GameList ({ children } : Props) {
    return <div className={Styles.root}>
        {children}
    </div>
};

interface GameProps {
    title: string;
    gamep: GamePrincipal;
}

export function Game ({ title, gamep, } : GameProps) {
    const { metascorePrincipal, metascoreHost } = useEnv();
    const { principal } = useParams<{principal?: string}>();
    const { account } = useAccount();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [score, setScore] = React.useState<number>();
    
    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost,
        });
        return createActor(agent, metascorePrincipal);
    }, []);

    const active = principal === gamep.toString() ? Styles.active : 'inactive';
    
    React.useEffect(() => {
        if (account) {
            setLoading(true);
            metascore.getMetascore(gamep, account.id)
            .then((r) => setScore(Number(r)))
            .catch(console.error)
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setScore(undefined);
        }
    }, [account, gamep]);
    
    return <div className={[
        Styles.game,
        active,
    ].join(' ')}>
        <div className={Styles.gameTitle}>{title}</div>
        <div className={Styles.gameScore}>
            {loading ? <Loader /> : formatBigScore(Number(score)) || '-'}
        </div>
    </div>
};

function formatBigScore (n : number) {
    if (!n) return '';
    if (n === 0) {
        return <div className={Styles.score}>Zero</div>;
    } else if (n < 100_000) {
        return <div className={Styles.score}>n</div>;
    } else if (n < 500_000) {
        return Math.round(n / 1000) + 'K';
    } else if (n < 500_000_000) {
        return Math.round(n / 1_000_000) + 'M';
    } else if (n < 500_000_000_000) {
        return Math.round(n / 1_000_000_000) + 'B';
    } else {
        return Math.round(n / 1_000_000_000_000) + ' T';
    };
};

export function UnrankedGame ({title} : {title: string}) {
    return <div className={[
        Styles.game
    ].join(' ')}>
        <div className={Styles.gameTitle}>{title}</div>
        <div className={Styles.gameScore}>

        </div>
    </div>
};