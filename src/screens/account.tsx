import { createAccountsActor, ACCOUNTS_PRINCIPAL } from '@metascore/query';
import { Account } from '@metascore/query/generated/metascore.did';
import Button from 'components/button/button';
import Grid, { GridRow } from 'components/grid/grid';
import Loader from 'components/loader/loader';
import Panel from 'components/panel/panel';
import { useAccount } from 'context/account';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import React from 'react';

export default function AccountScreen() {

    const [done, setDone] = React.useState<boolean>(false);

    const { agent : agentS, isConnected: isConnectedS, principal: principalS, disconnect: disconnectS, connect: connectS } = useStoic();
    const { agent : agentP, isConnected: isConnectedP, principal: principalP, disconnect: disconnectP, connect: connectP } = usePlug();
    const { account, disconnect: disconnectA, loadingAccount, loadingMultisig, setAccount : setAccountA, accountsCanister, accountLinkResponse } = useAccount();
    const actorS = React.useMemo(() => agentS ? createAccountsActor(agentS, accountsCanister || ACCOUNTS_PRINCIPAL) : undefined, [agentS, accountsCanister]);
    const actorP = React.useMemo(() => agentP ? createAccountsActor(agentP, accountsCanister || ACCOUNTS_PRINCIPAL) : undefined, [agentP, accountsCanister]);

    const [alias, setAlias] = React.useState(account?.alias);
    const [avatar, setAvatar] = React.useState(account?.avatar);
    const [flavorText, setFlavorText] = React.useState(account?.flavorText);
    const [primaryWallet, setPrimaryWallet] = React.useState(account?.primaryWallet);
    const [editing, setEditing] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        // Push account updates from server to UI
        setAlias(account?.alias);
        setAvatar(account?.avatar);
        setFlavorText(account?.flavorText);
        setPrimaryWallet(account?.primaryWallet);
    }, [account]);

    function disconnect() {
        // We just remove the wallets from the session, we don't remove them from the account.
        disconnectS();
        disconnectP();
        disconnectA();
        setDone(true);
    };

    async function connect(wallet: 'stoic' | 'plug') {
        if (wallet === 'stoic') {
            connectS();
        }
        if (wallet === 'plug') {
            connectP();
        }
    }

    function updateAccount(account : Account) {
        setAccountA(account);
        setAlias(account.alias);
        setAvatar(account.avatar);
        setFlavorText(account.flavorText);
        setEditing(false);
        const actor = actorP || actorS;
        if (actor) {
            setLoading(true);
            actor.updateAccount({
                alias: account.alias,
                avatar: account.avatar,
                flavorText: account.flavorText,
                primaryWallet: account.primaryWallet ? [account.primaryWallet] : [],
            })
            .finally(() => setLoading(false));
        };
    };

    function cancelEdit () {
        setEditing(false);
    };

    return (
        <Grid>
            <GridRow>
                <Panel>
                    <h1>Connect Wallets</h1>
                    <hr />
                    <h2>Stoic</h2>
                    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {principalS
                            ? <>
                                <strong>Principal: </strong> {principalS.toText().slice(0, 5)}...{principalS.toText().slice(principalS.toText().length - 3)}
                                <Button onClick={disconnectS}>Disconnect</Button>
                            </>
                            : <Button onClick={() => connect('stoic')}>
                                Connect Stoic
                            </Button>}
                            <small><em>Brave users: ensure shields is disabled.</em></small>
                    </div>
                    <hr />
                    <h2>Plug</h2>
                    {/* <small><em>Plug is temporarily disabled.</em></small> */}
                    {principalP ? principalP.toText() : <Button onClick={() => connect('plug')}>
                        Connect Plug
                    </Button>}
                    <hr />
                    <div style={{display: 'flex', gap: '10px'}}>
                    {
                        loadingMultisig && <>  
                            <Loader />
                            Linking wallets...&nbsp;
                        </>
                    }
                    {
                        accountLinkResponse && <>
                            {accountLinkResponse}
                        </>
                    }
                    </div>
                    
                </Panel>
                <Panel loading={loadingAccount || loading}>
                    <h1>Account</h1>
                    <hr />
                    {editing && account
                        ? <AccountEdit
                            account={Object.assign({}, account, {alias, avatar, flavorText, primaryWallet})}
                            update={updateAccount}
                            cancel={cancelEdit}
                        />
                        : <AccountView
                            account={account ? Object.assign({}, account, {alias, avatar, flavorText, primaryWallet}) : undefined}
                            edit={() => setEditing(true)}
                        />
                    }
                </Panel>
                {/* {done && <Redirect to='/' />} */}
            </GridRow>
        </Grid>
    );
};

function AccountView({account, edit}: {account?: Account, edit: () => void}) {
    return <>
        <div style={{display: 'flex', gap: '15px', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div>
                <h3>Avatar</h3>
                <img
                    src={
                        account?.avatar && account.avatar[0]
                        ? account?.avatar[0]
                        : `https://generative-placeholders.glitch.me/image?width=100&height=100&style=cellular-automata&cells=10`
                    }
                    width={100}
                    height={100}
                />
            </div>
            <div>
                <h3>Alias</h3>
                <div>{account?.alias || '-'}</div>
            </div>
            <div>
                <h3>Flavor Text</h3>
                <div>{account?.flavorText || '-'}</div>
            </div>
            <div>
                <h3>Primary Wallet</h3>
                {account ? account.primaryWallet?.hasOwnProperty('stoic') ? 'Stoic' : 'Plug' : '-'}</div>
            <div>
                <h3>Linked Plug Wallet</h3>
                {account?.plugAddress && account.plugAddress.length
                    ? `${account?.plugAddress[0]?.toText().slice(0, 5)}...${account?.plugAddress[0]?.toText().slice(account?.plugAddress[0]?.toText().length - 3)}`
                    : '-'
                }
            </div>
            <div>
                <h3>Linked Stoic Wallet</h3>
                {account?.stoicAddress && account.stoicAddress.length
                    ? `${account?.stoicAddress[0]?.toText().slice(0, 5)}...${account?.stoicAddress[0]?.toText().slice(account?.stoicAddress[0]?.toText().length - 3)}`
                    : '-'
                }
            </div>
            {account?.id !== undefined && <Button onClick={() => edit()}>Edit</Button>}
        </div>
    </>
};

function AccountEdit({
    account,
    update,
    cancel,
} : {
    account: Account;
    update: (account: Account) => void;
    cancel : () => void;
}) {
    const [alias, setAlias] = React.useState<string>(account?.alias[0] || '');
    const [avatar, setAvatar] = React.useState<string>(account?.avatar[0] || '');
    const [flavorText, setFlavorText] = React.useState<string>(account?.flavorText[0] || '');

    function save () {
        update({
            id: account.id,
            alias: [alias],
            avatar: [avatar],
            flavorText: [flavorText],
            primaryWallet: account.primaryWallet,
            stoicAddress: account.stoicAddress,
            plugAddress: account.plugAddress,
        });
    };

    return <>
        <div style={{display: 'flex', gap: '15px', flexDirection: 'column', alignItems: 'flex-start'}}>
            <div>
                <h3>Avatar</h3>
                <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.currentTarget.value)}
                />
                <br /><small><em>Input a URL for an already hosted image.</em></small>
            </div>
            <div>
                <h3>Alias</h3>
                <input
                    type="text"
                    value={alias}
                    onChange={(e) => setAlias(e.currentTarget.value)}
                />
            </div>
            <div>
                <h3>Flavor Text</h3>
                <input
                    type="text"
                    value={flavorText}
                    onChange={(e) => setFlavorText(e.currentTarget.value)}
                />
            </div>
            <div style={{display: 'flex', gap: '10px'}}>
                <Button onClick={save}>Save</Button>
                <Button onClick={cancel}>Cancel</Button>
            </div>
        </div>
    </>
};
