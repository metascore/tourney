import React from 'react';
import Styles from './socials.module.css';
import Github from 'assets/socials/github.svg';
import Telegram from 'assets/socials/telegram.svg';
import Twitter from 'assets/socials/twitter.svg';

interface Props {};


export default function Socials ({} : Props) {

    const socials : { icon : string; link : string; }[] = [{
        icon: Github,
        link: 'https://github.com/metascore/metascore',
    }, {
        icon: Twitter,
        link: 'https://twitter.com/MetascoreHACK'
    }, {
        icon: Telegram,
        link: 'https://t.co/i906ywqr5u',
    }];

    return <div className={Styles.root}>
        {socials.map((social, i) => <div className={Styles.icon} key={`${i}social`}>
            <a href={social.link} className={Styles.link} target="_blank">
                <img className={Styles.icon} src={social.icon} />
            </a>
        </div>)}
    </div>
};