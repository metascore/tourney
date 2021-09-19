import React from 'react';
import { useStoic } from './stoic';
import { usePlug } from './plug';
import { AccountRecord, AuthRequest } from '@metascore/query/generated/metascore.did';


interface AccountState {
    account?: AccountRecord;
    isConnected: boolean;
    disconnect: () => void;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: AccountState = {
    isConnected: false,
    disconnect: () => {},
};

export const accountContext = React.createContext<AccountState>(defaultState);
export const useAccount = () => React.useContext(accountContext);

export default function AccountProvider({ children }: ContextProviderProps) {

    const [isConnected, setIsConnected] = React.useState<boolean>(defaultState.isConnected);
    const [account, setAccount] = React.useState<AccountRecord>();
    const [loading, setLoading] = React.useState<{[key: string] : boolean}>();

    const { isConnected : connectedS, actor : actorS, principal : principalS } = useStoic();
    const { isConnected : connectedP, actor : actorP, principal : principalP } = usePlug();

    function disconnect () {
        setAccount(undefined);
        setIsConnected(false);
    }

    React.useEffect(() => {
        // Fetch account data when we connect a wallet
        const actor = actorS || actorP;
        const wallet : 'stoic' | 'plug' = actor === actorS ? 'stoic' : 'plug';
        const principal = wallet === 'stoic' ? principalS : principalP;
        if (actor && !account && !loading?.account) {
            console.info(`Requesting Metascore account...`);
            setLoading(Object.assign({}, loading, { account : true }));
            const authRequest : AuthRequest = {
                // @ts-ignore
                authenticate: {
                    [wallet]: principal
                }
            };
            actor.authenticateAccount(authRequest).then(resp => {
                //@ts-ignore
                setAccount(resp?.ok?.account);
            })
            .finally(() => {
                setLoading(Object.assign({}, loading, { account : false }));
            });
        };
        // If two wallets are connected and account has room, attempt to link the wallets
        if (actorS && actorP && principalS && principalP && account && !loading?.multisig) {
            if (account.plugAddress.length === 0 || account.stoicAddress.length === 0) {
                console.info(`Performing multisig wallet link...`);
                setLoading(Object.assign({}, loading, { multisig : false }));
                const stoicSig : AuthRequest = {
                    link: {
                        plug: principalP,
                    },
                };
                const plugSig : AuthRequest = {
                    link: {
                        stoic: principalS,
                    },
                };
                console.info(`Signing with stoic...`);
                actorS.authenticateAccount(stoicSig)
                .then(r => {
                    console.info(`Signing with plug...`);
                    return actorP.authenticateAccount(plugSig);
                }).then(r => {
                    console.info(`Complete!`);
                    //@ts-ignore
                    setAccount(r?.ok?.account);
                })
                .catch(console.error)
                .finally(() => {
                    setLoading(Object.assign({}, loading, { multisig : false }));
                });
            };
        };
    }, [actorS, actorP, principalS, principalP, account]);

    return <accountContext.Provider
        value={{
            isConnected,
            disconnect,
            account,
        }}
        children={children} 
    />
};