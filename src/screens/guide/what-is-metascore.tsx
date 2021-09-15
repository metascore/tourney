import Neon from 'components/neon/neon';
import React from 'react';
import { attributes, ReactComponent } from 'posts/what-is-metascore-en.md';

export default function WhatIsMetascore () {
    return (
        <>
            <Neon>{(attributes as any).title}</Neon>
            <ReactComponent />
        </>
    );
};