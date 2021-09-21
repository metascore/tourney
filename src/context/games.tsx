import { HttpAgent } from '@dfinity/agent';
import { createActor, GamePrincipal, Metadata } from '@metascore/query';
import React from 'react';
import { useAccount } from './account';
import { useEnv } from './env';

interface GamesState {
    games: [GamePrincipal, Metadata][];
    loading: boolean;
};

interface GamesProviderProps {
    children?: React.ReactNode;
};

export const GamesContext = React.createContext<GamesState>({ games: [], loading: false });
export default function GamesProvider({ children }: GamesProviderProps) {

    const { metascorePrincipal, metascoreHost } = useEnv();
    const { account } = useAccount();

    const [loading, setLoading] = React.useState<boolean>(false);

    const metascore = React.useMemo(() => {
        const agent = new HttpAgent({
            host: metascoreHost,
        });
        return createActor(agent, metascorePrincipal);
    }, []);

    const [games, setGames] = React.useState<[GamePrincipal, Metadata][]>([]);
    const value = { games, loading };

    React.useEffect(() => {
        setLoading(true)
        metascore.getGames()
        .then((r) => {
            setGames(r)
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [account]);

    return <GamesContext.Provider value={value} children={children} />;
};
export const useGames = () => React.useContext(GamesContext);