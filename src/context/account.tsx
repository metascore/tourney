import React from 'react';
import { useStoic } from './stoic';
import { usePlug } from './plug';
import { Actor } from '@dfinity/agent';
import { Account, AuthenticationRequest } from '@metascore/query/generated/metascore.did';
import { createAccountsActor } from '@metascore/query';

const AccountsPrincipal = 'upsxs-oyaaa-aaaah-qcaua-cai';


interface AccountState {
    account?: Account;
    isConnected: boolean;
    disconnect: () => void;
    loading: { [key : string] : boolean };
    setAccount: (acc : Account) => void;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: AccountState = {
    isConnected: false,
    disconnect: () => {},
    loading: {},
    setAccount: (acc : Account) => {},
};

export const accountContext = React.createContext<AccountState>(defaultState);
export const useAccount = () => React.useContext(accountContext);

export default function AccountProvider({ children }: ContextProviderProps) {

    const [isConnected, setIsConnected] = React.useState<boolean>(defaultState.isConnected);
    const [account, setAccount] = React.useState<Account>();
    const [loadingAccount, setLoadingAccount] = React.useState<boolean>(false);
    const [loadingMultiSig, setLoadingMultiSig] = React.useState<boolean>(false);

    const { isConnected : connectedS, principal : principalS, agent : agentS } = useStoic();
    const { isConnected : connectedP, principal : principalP, agent : agentP } = usePlug();

    const actorS = React.useMemo(() => agentS ? createAccountsActor(agentS, AccountsPrincipal) : undefined, [agentS]);
    const actorP = React.useMemo(() => agentP ? createAccountsActor(agentP, AccountsPrincipal) : undefined, [agentP]);

    function disconnect () {
        setAccount(undefined);
        setIsConnected(false);
    }

    React.useEffect(() => {
        // Fetch account data when we connect a wallet
        const actor = actorS || actorP;
        const wallet : 'stoic' | 'plug' = actor === actorS ? 'stoic' : 'plug';
        const principal = wallet === 'stoic' ? principalS : principalP;
        if (principal && actor && !account && !loadingAccount) {
            console.info(`Requesting Metascore account...`);
            setLoadingAccount(true);
            const authRequest : AuthenticationRequest = {
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
                setLoadingAccount(false);
            });
        };
        // If two wallets are connected and account has room, attempt to link the wallets
        if (actorS && actorP && principalS && principalP && account && !loadingMultiSig) {
            if (account.plugAddress.length === 0 || account.stoicAddress.length === 0) {
                console.info(`Performing multisig wallet link...`);
                setLoadingMultiSig(false);
                const stoicSig : AuthenticationRequest = {
                    link: [
                        { plug: principalP, },
                        { stoic: principalS, },
                    ],
                };
                const plugSig : AuthenticationRequest = {
                    link: [
                        { stoic: principalS, },
                        { plug: principalP, },
                    ],
                };
                console.info(`Signing with stoic...`);
                actorS.authenticateAccount(stoicSig)
                .then(r => {
                    console.info(`Signing with plug...`);
                    return actorP.authenticateAccount(plugSig);
                }).then(r => {
                    console.info(`Complete!`, r);
                    //@ts-ignore
                    setAccount(r?.ok?.account);
                })
                .catch(console.error)
                .finally(() => {
                    setLoadingMultiSig(false);
                });
            };
        };
    }, [actorS, actorP, principalS, principalP, account, connectedP, connectedS, principalP, principalS]);

    return <accountContext.Provider
        value={{
            isConnected,
            disconnect,
            account,
            loading : {
                account: loadingAccount,
                multisig: loadingMultiSig,
            },
            setAccount
        }}
        children={children} 
    />
};