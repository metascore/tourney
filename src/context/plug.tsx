import React from 'react';
import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { MetascoreQuery, createMetascoreActor } from '@metascore/query';
import { useEnv } from './env';
import { AccountsPrincipal, AccountsPrincipalLocal } from './account';


interface PlugState {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: boolean;
    principal?: Principal;
    actor?: ActorSubclass<MetascoreQuery>;
    agent?: HttpAgent;
};

interface PlugProviderProps {
    children?: React.ReactNode;
};

const DefaultState: PlugState = {
    connect: async () => {},
    disconnect: async () => {},
    isConnected: false,
}

export const PlugContext = React.createContext<PlugState>(DefaultState);
export const usePlug = () => React.useContext(PlugContext);

export default function PlugProvider({ children }: PlugProviderProps) {

    const { metascorePrincipal, metascoreHost, isLocal } = useEnv();

    const whitelist = [metascorePrincipal, isLocal ? AccountsPrincipalLocal : AccountsPrincipal];
    const host = metascoreHost;

    const [isConnected, setIsConnected] = React.useState<boolean>(DefaultState.isConnected);
    const [principal, setPrincipal] = React.useState<Principal>();
    const [actor, setActor] = React.useState<ActorSubclass<MetascoreQuery>>();
    const [agent, setAgent] = React.useState<HttpAgent>();

    async function connect () {

        // If the user doesn't have plug, send them to get it!
        if (window?.ic?.plug === undefined) {
            window.open('https://plugwallet.ooo/', '_blank');
            return;
        }
        
        window.ic.plug.requestConnect({ whitelist: whitelist.filter(x => x !== undefined) as string[], host })
        .then(initActor)
        .catch(() => {
            console.error('Error connecting plug...');
            setIsConnected(false);
            setPrincipal(undefined);
            setActor(undefined);
        });
    };

    async function disconnect () {
        setIsConnected(false);
        setPrincipal(undefined);
        setActor(undefined);
        window.ic?.plug?.deleteAgent();
        window.sessionStorage.removeItem('plugIsConnected');
        window.sessionStorage.removeItem('plugPrincipal');
    };

    async function checkConnection () {
        const connection = (window?.ic?.plug === undefined) ? false : await window.ic.plug.isConnected();
        // setIsConnected(connection);
        return connection;
    };

    async function checkAgent () {
        if (window?.ic?.plug === undefined) return false;
        if (!isConnected) return;
        if (!window.ic.plug.agent) {
            await window.ic.plug.createAgent({ whitelist: whitelist.filter(x => x !== undefined) as string[], host })
        };
        return true;
    };

    async function checkConnectionAndAgent () {
        await checkAgent();
        return await checkConnection();
    };

    React.useEffect(() => {
        checkConnectionAndAgent();
        initActor();
    }, []);

    async function initActor() {
        if (!window?.ic?.plug?.agent) return;
        const agent = await window.ic.plug.agent;
        if (isLocal) agent.fetchRootKey();
        const principal = await agent.getPrincipal();
        const actor = createMetascoreActor(agent, metascorePrincipal);
        window.sessionStorage.setItem('plugIsConnected', 'true');
        window.sessionStorage.setItem('plugPrincipal', principal.toText());
        setIsConnected(true);
        setPrincipal(principal);
        setActor(actor);
        setAgent(agent);
    };

    return <PlugContext.Provider
        value={{
            connect,
            disconnect,
            principal,
            isConnected,
            actor,
            agent,
        }}
        children={children}
    />;
};


// This is the stuff that plug wallet extension stuffs into the global window namespace.
// I stole this for Norton: https://github.com/FloorLamp/cubic/blob/3b9139b4f2d16bf142bf35f2efb4c29d6f637860/src/ui/components/Buttons/LoginButton.tsx#L59
declare global {
    interface Window {
        ic?: {
            plug?: {
                agent: any;
                isConnected: () => Promise<boolean>;
                createAgent: (args?: {
                    whitelist: string[];
                    host?: string;
                }) => Promise<undefined>;
                requestBalance: () => Promise<
                    Array<{
                        amount: number;
                        canisterId: string | null;
                        image: string;
                        name: string;
                        symbol: string;
                        value: number | null;
                    }>
                >;
                requestTransfer: (arg: {
                    to: string;
                    amount: number;
                    opts?: {
                        fee?: number;
                        memo?: number;
                        from_subaccount?: number;
                        created_at_time?: {
                            timestamp_nanos: number;
                        };
                    };
                }) => Promise<{ height: number }>;
                requestConnect: (opts: any) => Promise<{}>;
                deleteAgent: () => Promise<void>;
            };
        };
    }
}