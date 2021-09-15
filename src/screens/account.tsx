import Button from 'components/button/button';
import Panel from 'components/panel/panel';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import React from 'react';
import { Redirect } from 'react-router';

export default function Account () {

    const [done, setDone] = React.useState<boolean>(false);

    const { isConnected : isConnectedS, principal : principalS, disconnect : disconnectS } = useStoic();
    const { isConnected : isConnectedP, principal : principalP, disconnect : disconnectP } = usePlug();

    const wallet = isConnectedS ? 'stoic' : isConnectedP ? 'plug' : undefined;
    const principal = principalS?.toText() || principalP?.toText();

    function disconnect () {
        disconnectS();
        disconnectP();
        setDone(true);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
            <Panel>
                <h1>Account</h1>
                <div>{wallet}: {principal}</div>
                <Button onClick={disconnect}>Disconnect</Button>
            </Panel>
            {done && <Redirect to='/' />}
        </div>
    );
};