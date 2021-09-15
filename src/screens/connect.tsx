import Button from 'components/button/button';
import Panel from 'components/panel/panel';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import React from 'react';
import { Redirect } from 'react-router';

export default function Connect () {

    const [done, setDone] = React.useState<boolean>(false);

    const { connect : connectP } = usePlug();
    const { connect : connectS } = useStoic();

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
            <Panel>
                <h1>Connect Wallet</h1>
                <Button onClick={() => connectS().then(() => setDone(true))}>Connect Stoic</Button>
                <Button onClick={() => connectP().then(() => setDone(true))}>Connect Plug</Button>
            </Panel>
            {done && <Redirect to='/' />}
        </div>
    );
};