import { Principal } from '@dfinity/principal';
import React from 'react';

interface PlugState {
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    isConnected: boolean;
    principal?: Principal;
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
export default function PlugProvider({ children }: PlugProviderProps) {

    const whitelist = ['oagmd-5iaaa-aaaah-qbnma-cai'];
    const host = window.location.host;

    const [isConnected, setIsConnected] = React.useState<boolean>(DefaultState.isConnected);
    const [principal, setPrincipal] = React.useState<Principal>();

    async function connect () {
        // If the user doesn't have plug, send them to get it!
        if (window?.ic?.plug === undefined) {
            window.open('https://plugwallet.ooo/', '_blank');
            return;
        }

        switch (await checkConnectionAndAgent()) {
            case true:
                setIsConnected(true);
                window.ic.plug.agent.getPrincipal().then(setPrincipal);
                return;
            case false:
                break;
        }
        
        switch (await window.ic.plug.requestConnect({ whitelist, host })) {
            case true:
                setIsConnected(true);
                window.ic.plug.agent.getPrincipal().then(setPrincipal);
                break
            case false:
                console.error('Error connecting plug...');
                setIsConnected(false);
                setPrincipal(undefined);
                break;
        }
    };

    async function disconnect () {
        // TODO
    };

    async function checkConnection () {
        const connection = (window?.ic?.plug === undefined) ? false : await window.ic.plug.isConnected();
        setIsConnected(connection);
        return connection;
    };

    async function checkAgent () {
        console.log('checkagent');
        if (window?.ic?.plug === undefined) return false; 
        console.log(window.ic.plug.agent);
        if (!window.ic.plug.agent) {
            await window.ic.plug.createAgent({ whitelist, host })
        };
        console.log(window.ic.plug.agent);
        return true;
    };

    async function checkConnectionAndAgent () {
        if (window?.ic?.plug === undefined) return;
        const connected = await checkConnection();
        if (!connected) return false;
        await checkAgent();
        window.ic.plug.agent.getPrincipal().then(setPrincipal);
        return true;
    };

    React.useEffect(() => {
        checkConnectionAndAgent()
    }, []);

    const value = { connect, disconnect, principal, isConnected };

    return <PlugContext.Provider value={value} children={children} />;
};
export const usePlug = () => React.useContext(PlugContext);

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
                requestConnect: (opts: any) => Promise<boolean>;
            };
        };
    }
}