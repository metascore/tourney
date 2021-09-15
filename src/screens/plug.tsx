import React from 'react';
import PlugConnect from '@psychedelic/plug-connect';

export default function Plug () {
    return (
        <>
            <h1>Connect Plug</h1>
            <PlugConnect
                dark
                title="Connect Wallet"
                onConnectCallback={() => console.log("Some callback")}
                host="http://localhost:3000/plug"
                whitelist={['oagmd-5iaaa-aaaah-qbnma-cai']}
            />
        </>
    );
};