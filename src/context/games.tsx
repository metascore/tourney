import { HttpAgent } from '@dfinity/agent';
import { createActor, GamePrincipal, Metadata } from '@metascore/query';
import React from 'react';
import { useEnv } from './env';

type Games = [GamePrincipal, Metadata][];

interface GamesState {
    games: Games;
};

interface GamesProviderProps {
    children?: React.ReactNode;
};

export const GamesContext = React.createContext<GamesState>({ games: [], });
export default function GamesProvider({ children }: GamesProviderProps) {

    const { metascorePrincipal, metascoreHost } = useEnv();

    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost,
        });
        return createActor(agent, metascorePrincipal);
    }, []);

    const [games, setGames] = React.useState<[GamePrincipal, Metadata][]>([]);
    const value = { games, };

    React.useEffect(() => { metascore.getGames().then(setGames).catch(console.error) }, []);

    return <GamesContext.Provider value={value} children={children} />;
};
export const useGames = () => React.useContext(GamesContext);