import React from 'react';
import { useStoic } from './stoic';
import { usePlug } from './plug';
import { Player, Score } from '@metascore/query';
import { Score__1 } from '@metascore/query/generated/metascore/metascore.did';
import { useAccount } from './account';

const tierPercentiles = {
    gamer: 0,
    strong: .5,
    elite: .85,
};

interface PlayerStatsState {
    metascore: number;
    // percentile?: number;
    // ranking?: number;
    tier: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    thresholds?: {
        gamer?: number,
        strong?: number,
        elite?: number,
    };
    topScores?: Score__1[];
    loading: { [key : string] : boolean };
};

const defaultState : PlayerStatsState = {
    metascore: 0,
    tier: 0,
    loading: {},
};

interface PlayerStatsProviderProps {
    children?: React.ReactNode;
};

export const PlayerStatsContext = React.createContext<PlayerStatsState>(defaultState);
export const usePlayerStats = () => React.useContext(PlayerStatsContext);

export default function PlayerStatsProvider({ children }: PlayerStatsProviderProps) {

    const { actor : actorS, principal : principalS } = useStoic();
    const { actor : actorP, principal : principalP } = usePlug();
    const { account } = useAccount();
    
    const [metascore, setMetascore] = React.useState<number>(defaultState.metascore);
    const [thresholds, setThresholds] = React.useState<PlayerStatsState['thresholds']>();
    const [topScores, setTopScores] = React.useState<PlayerStatsState['topScores']>();
    // const [percentile, setPercentile] = React.useState<number>();
    // const [ranking, setRanking] = React.useState<number>();
    
    const [loadingMetascore, setLoadingMetascore] = React.useState<boolean>(false);
    const [loadingThresholds, setLoadingThresholds] = React.useState<boolean>(false);
    const [loadingTop3, setLoadingTop3] = React.useState<boolean>(false);


    // React.useEffect(() => {
    //     const actor = actorS || actorP;

    //     // Clear player state if actor is disconnected and return
    //     if (!actor || !account) {
    //         setMetascore(0);
    //         return;
    //     };

    //     queryMetascore();
    //     queryThresholds();
    //     queryTop3();
        
    // }, [actorS, actorP, account]);
    
    // React.useEffect(() => {
    //     const i = setInterval(() => {
    //         if (document.hasFocus()) {
    //             queryMetascore();
    //             queryThresholds();
    //             queryTop3();
    //         };
    //     }, 15_000);
    //     return () => clearInterval(i);
    // }, [queryMetascore, queryThresholds, queryTop3]);

    // function queryMetascore () {
    //     const actor = actorS || actorP;
    //     if (account && actor && !loadingMetascore) {
    //         setLoadingMetascore(true);
    //         actor.getOverallMetascore(account.id)
    //         .then((r) => setMetascore(Number(r)))
    //         .finally(() => setLoadingMetascore(false));
    //     };
    // };

    // function queryThresholds () {
    //     const actor = actorS || actorP;
    //     if (actor && !loadingThresholds) {
    //         setLoadingThresholds(true);
    //         Promise.all([
    //             actor.getPercentileMetascore(tierPercentiles.strong),
    //             actor.getPercentileMetascore(tierPercentiles.elite),
    //         ])
    //         .then(([strong, elite]) => setThresholds({
    //             gamer: 0,
    //             strong: Number(strong),
    //             elite: Number(elite),
    //         }))
    //         .catch(console.error)
    //         .finally(() => setLoadingThresholds(false));
    //     };
    // };

    // function queryTop3 () {
    //     const actor = actorS || actorP;
    //     if (actor && !loadingTop3) {
    //         setLoadingTop3(true);
    //         actor.getMetascores([BigInt(3)], [])
    //         .then((r) => setTopScores(r))
    //         .catch(console.error)
    //         .finally(() => setLoadingTop3(false));
    //     };
    // };

    const tier : PlayerStatsState['tier'] = React.useMemo(() => {
        if (!topScores || !account || !thresholds || !thresholds?.elite || !thresholds?.strong) return 0;
        const podium = topScores.map(score => score[0]).indexOf(account.id);
        if (podium === 0) {
            return 6;
        } else if (podium === 1) {
            return 5;
        } else if (podium === 2) {
            return 4;
        } else if (metascore >= thresholds.elite) {
            return 3;
        } else if (metascore >= thresholds.strong) {
            return 2;
        } else {
            return 1;
        }
    }, [topScores, metascore, thresholds, account]);

    return <PlayerStatsContext.Provider
        value={{
            metascore,
            tier,
            // percentile,
            // ranking,
            thresholds,
            topScores,
            loading: {
                metascore: loadingMetascore,
                top3: loadingTop3,
                thresholds: loadingThresholds,
            },
        }}
        children={children}
    />;
};
