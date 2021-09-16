import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { usePlug } from 'context/plug';
import { useStoic } from 'context/stoic';
import Button from 'components/button/button';
import Styles from './head.module.css';
import logo from 'assets/logo.webp';
import logoSmall from 'assets/logo-small.svg';
import stoic from 'assets/stoic.png';
import plug from 'assets/plug.png';

export default function Head () {

    const { isConnected : isConnectedS } = useStoic();
    const { isConnected : isConnectedP } = usePlug();
    const isConnected = isConnectedP || isConnectedS;

    const smallLogo = useMediaQuery({ query: '(max-width: 459px'});

    return (
        <header className={Styles.root}>
            <Link to='/'>
                <img
                    width={smallLogo ? 50 : 400}
                    height={50}
                    src={smallLogo ? logoSmall : logo}
                    alt="Metascore Logo"
                    className={Styles.logo}
                />
            </Link>
            <nav className={Styles.nav}>
                <Link to='/guide'><Button><span className={Styles.textSurvival}>Survival&nbsp;</span> Guide</Button></Link>
                <div className={Styles.flavour}>
                    Connect <span className={Styles.extraFlavour}>wallet</span> 👝
                    Play <span className={Styles.extraFlavour}>games</span> 🕹
                    Win <span className={Styles.extraFlavour}>NFTs</span> 💎
                </div>
                <div className={Styles.utilNav}>
                    {isConnected ? <Account /> : <Connect />}
                </div>
            </nav>
        </header>
    );
};

function Connect () {
    const isCombinedView = useMediaQuery({ query: '(max-width: 1190px'});
    const { connect : connectP } = usePlug();
    const { connect : connectS } = useStoic();
    if (isCombinedView) return (
        <>
            <Link to='/connect'>
                <Button>
                    Connect
                    <span className={Styles.textWallet}>&nbsp;Wallet</span>
                </Button>
            </Link>
        </>
    );
    return (
        <>
            <Button onClick={connectS}>Connect Stoic</Button>
            <Button onClick={connectP}>Connect Plug</Button>
        </>
    );
};

function Account () {
    const { isConnected : isConnectedS, principal : principalS } = useStoic();
    const { isConnected : isConnectedP, principal : principalP } = usePlug();
    
    const wallet = isConnectedS ? 'stoic' : isConnectedP ? 'plug' : undefined;
    const principal = principalS?.toText() || principalP?.toText();

    return (
        <Link to='/account'>
            <Button>
                <img src={wallet === 'stoic' ? stoic : plug} width={22} height={22} />
                {principal?.slice(0, 5)}...{principal?.slice(principal?.length - 3)}
            </Button>
        </Link>
    );
};