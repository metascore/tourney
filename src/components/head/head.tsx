import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Styles from './head.module.css';
import logo from 'assets/logo.webp'
import Button from 'components/button/button';
import Frame from 'components/frame/frame';

export default function Head () {

    return (
        <header className={Styles.root}>
            <img
                width={400}
                height={50}
                src={logo}
                alt="Metascore Logo"
                className={Styles.logo}
            />
            <nav className={Styles.nav}>
                <Button><span className={Styles.textSurvival}>Survival&nbsp;</span> Guide</Button>
                <div className={Styles.flavour}>
                    Connect <span className={Styles.extraFlavour}>wallet</span> 👝
                    Play <span className={Styles.extraFlavour}>games</span> 🕹
                    Win <span className={Styles.extraFlavour}>NFTs</span> 💎
                </div>
                <div className={Styles.utilNav}>
                    <Connect />
                </div>
            </nav>
        </header>
    );
};

function Connect () {
    const isCombinedView = useMediaQuery({ query: '(max-width: 1190px'});
    if (isCombinedView) return (
        <>
            {/* <Frame
                opened={[]}
                closed={[]}
                head={<>
                    Connect
                    <span className={Styles.textWallet}>&nbsp;Wallet</span>
                </>}
                body={<>
                    Some big amount of content.
                </>}
            /> */}
            <Button>
                Connect
                <span className={Styles.textWallet}>&nbsp;Wallet</span>
            </Button>
        </>
    );
    return (
        <>
            <Button>Connect Stoic</Button>
            <Button>Connect Plug</Button>
        </>
    );
};