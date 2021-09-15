import Button from 'components/button/button';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Connect () {
    return (
        <>
            <h1>Connect Wallet</h1>
            <Link to='/stoic'>
                <Button>Connect Stoic</Button>
            </Link>
            <Link to='/plug'>
                <Button>Connect Plug</Button>
            </Link>
        </>
    );
};