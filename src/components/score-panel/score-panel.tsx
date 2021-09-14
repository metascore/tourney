import Panel, { Label } from 'components/panel/panel';
import React from 'react';
import Styles from './score-panel.module.css';

interface Props {
    children?: React.ReactNode;
};

export default function ScorePanel ({ children } : Props) {
    return (
        <Panel>
            <Label>Your Score</Label>
        </Panel>
    );
};