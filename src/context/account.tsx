import React from 'react';
import { useStoic } from './stoic';
import { usePlug } from './plug';
import { Account, AuthenticationRequest } from '@metascore/query/generated/accounts/accounts.did';
import { createAccountsActor } from '@metascore/query';
import { useEnv } from './env';

export const AccountsPrincipal = 'upsxs-oyaaa-aaaah-qcaua-cai';
export const AccountsPrincipalLocal = 'ryjl3-tyaaa-aaaaa-aaaba-cai';


interface AccountState {
    account?: Account;
    accountsCanister?: string;
    isConnected: boolean;
    disconnect: () => void;
    loadingAccount: boolean;
    loadingMultisig: boolean;
    accountLinkResponse?: string;
    setAccount: (acc : Account) => void;
};

interface ContextProviderProps {
    children?: React.ReactNode;
};

const defaultState: AccountState = {
    isConnected: false,
    disconnect: () => {},
    loadingAccount: false,
    loadingMultisig: false,
    setAccount: (acc : Account) => {},
};

export const accountContext = React.createContext<AccountState>(defaultState);
export const useAccount = () => React.useContext(accountContext);

export default function AccountProvider({ children }: ContextProviderProps) {

    const [account, setAccount] = React.useState<Account>();
    const [principal, setPrincipal] = React.useState<string>();
    const [isConnected, setIsConnected] = React.useState<boolean>(defaultState.isConnected);
    const [loadingAccount, setLoadingAccount] = React.useState<boolean>(false);
    const [loadingMultisig, setLoadingMultisig] = React.useState<boolean>(false);
    const [accountLinkResponse, setAccountLinkResponse] = React.useState<string>();

    const { isConnected : connectedS, principal : principalS, agent : agentS } = useStoic();
    const { isConnected : connectedP, principal : principalP, agent : agentP } = usePlug();
    const { isLocal } = useEnv();

    React.useEffect(() => {
        setPrincipal(isLocal ? AccountsPrincipalLocal : AccountsPrincipal)
    }, []);

    const actorS = React.useMemo(() => agentS ? createAccountsActor(agentS, principal) : undefined, [agentS]);
    const actorP = React.useMemo(() => agentP ? createAccountsActor(agentP, principal) : undefined, [agentP]);

    function disconnect () {
        setAccount(undefined);
        setIsConnected(false);
    }

    React.useEffect(() => {
        console.info(`Using ${isLocal ? 'LOCAL' : 'PROD'} account canister: ${principal}`)
    }, [principal]);

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
        if (actorS && actorP && principalS && principalP && account && !loadingMultisig) {
            if (account.plugAddress.length === 0 || account.stoicAddress.length === 0) {
                console.info(`Performing multisig wallet link...`);
                setAccountLinkResponse(undefined);
                setLoadingMultisig(true);
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
                setAccountLinkResponse('Signing with stoic...')
                actorS.authenticateAccount(stoicSig)
                .then(r => {
                    console.info(`Signing with plug...`);
                    setAccountLinkResponse('Signing with plug...')
                    return actorP.authenticateAccount(plugSig);
                }).then(r => {
                    console.info(`Complete!`, r);
                    //@ts-ignore
                    if (r?.err?.message) {
                        //@ts-ignore
                        setAccountLinkResponse('Error linking accounts: ' + r?.err?.message)
                    } else {
                        setAccountLinkResponse('Wallet link success!');
                    }
                    //@ts-ignore
                    setAccount(r?.ok?.account);
                })
                .catch(e => {
                    console.error(e)
                })
                .finally(() => {
                    setLoadingMultisig(false);
                });
            };
        };
    }, [actorS, actorP, principalS, principalP, account, connectedP, connectedS, principalP, principalS]);

    return <accountContext.Provider
        value={{
            accountsCanister: principal,
            isConnected,
            disconnect,
            account,
            loadingAccount,
            loadingMultisig,
            setAccount,
            accountLinkResponse
        }}
        children={children} 
    />
};