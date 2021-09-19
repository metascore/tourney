import { Player } from '@metascore/query';
import Button from 'components/button/button';
import Panel from 'components/panel/panel';
import { useAccount } from 'context/account';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import React from 'react';
import { Redirect } from 'react-router';

export default function Account () {

    const [done, setDone] = React.useState<boolean>(false);

    const { actor : actorS, isConnected : isConnectedS, principal : principalS, disconnect : disconnectS, connect : connectS } = useStoic();
    const { actor : actorP, isConnected : isConnectedP, principal : principalP, disconnect : disconnectP, connect : connectP } = usePlug();
    const { account, disconnect : disconnectA } = useAccount();

    const [alias, setAlias] = React.useState<string>('');
    const [avatar, setAvatar] = React.useState<string>('');
    const [flavorText, setFlavorText] = React.useState<string>('');
    const [primaryWallet, setPrimaryWallet] = React.useState<Player>();

    React.useEffect(() => {
        // Push account updates from server to UI
        setAlias(account?.alias[0] || '');
        setAvatar(account?.avatar[0] || '');
        setFlavorText(account?.flavorText[0] || '');
        setPrimaryWallet(account?.primaryWallet);
    }, [account]);

    function disconnect () {
        // We just remove the wallets from the session, we don't remove them from the account.
        disconnectS();
        disconnectP();
        disconnectA();
        setDone(true);
    };

    async function connect (wallet : 'stoic' | 'plug') {
        const connect = wallet === 'plug' ? connectP : connectS;
        const actor = wallet === 'plug' ? actorP : actorS;
        const principal = wallet === 'plug' ? principalP : principalS;
        await connect();
        // @ts-ignore
        actor && principal && actor?.authenticateAccount({'authenticate': { [wallet] : principal }})
    }

    function updateAccount () {
        const actor = actorP || actorS;
        if (actor) {
            console.log('Update account!', {
                alias: alias ? [alias] : [],
                avatar: avatar ? [avatar] : [],
                flavorText: flavorText ? [flavorText] : [],
                primaryWallet: primaryWallet ? [primaryWallet] : [],
            })
            actor.updateAccount({
                alias: alias ? [alias] : [],
                avatar: avatar ? [avatar] : [],
                flavorText: flavorText ? [flavorText] : [],
                primaryWallet: primaryWallet ? [primaryWallet] : [],
            })
        };
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
            <Panel>
                <h1>Account</h1>
                <div>
                    Avatar:
                    <input
                        type="text"
                        value={avatar}
                        onChange={(e) => setAvatar(e.currentTarget.value)}
                    />
                </div>
                <div>
                    Alias:
                    <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.currentTarget.value)}
                    />
                </div>
                <div>
                    Flavor Text:
                    <input
                        type="text"
                        value={flavorText}
                        onChange={(e) => setFlavorText(e.currentTarget.value)}
                    />
                </div>
                <div>Primary Wallet: {account ? account.primaryWallet?.hasOwnProperty('stoic') ? 'stoic' : 'plug' : ''}</div>
                <div>Linked Plug Wallet: {account?.plugAddress[0]?.toText()}</div>
                <div>Linked Stoic Wallet: {account?.stoicAddress[0]?.toText()}</div>
                <Button onClick={() => updateAccount()}>Save</Button>
                <h2>Connected Wallets</h2>
                <h3>Stoic</h3>
                {principalS ? principalS.toText() : <Button onClick={() => connect('stoic')}>
                    Connect Stoic
                </Button>}
                <h3>Plug</h3>
                {principalP ? principalP.toText() : <Button onClick={() => connect('plug')}>
                    Connect Plug
                </Button>}
                <Button onClick={disconnect}>Disconnect</Button>
            </Panel>
            {done && <Redirect to='/' />}
        </div>
    );
};