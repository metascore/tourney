import React from 'react';
import { StoicIdentity } from 'ic-stoic-identity';
import { Principal } from '@dfinity/principal';


interface StoicState {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: boolean;
    principal?: Principal;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: StoicState = {
    connect: async () => { },
    disconnect: async () => { },
    isConnected: false,
};

export const stoicContext = React.createContext<StoicState>(defaultState);
export const useStoic = () => React.useContext(stoicContext);

export default function StoicProvider({ children }: ContextProviderProps) {

    async function connect() {
        StoicIdentity.load().then(async (identity: any) => {
            if (identity === false) {
                identity = await StoicIdentity.connect();
            };

            setIsConnected(true);
            setPrincipal(identity.getPrincipal());
        })
    };
    async function disconnect() {
        StoicIdentity.disconnect();
    };

    const [isConnected, setIsConnected] = React.useState<boolean>(defaultState.isConnected);
    const [principal, setPrincipal] = React.useState<Principal>();

    const value = { connect, disconnect, isConnected, principal };
    return <stoicContext.Provider value={value} children={children} />
};