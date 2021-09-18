import React from 'react';
import Styles from './sponsors.module.css';
import ImgToniq from 'assets/sponsors/toniq.webp';
import ImgICPuppies from 'assets/sponsors/icpuppies.webp';
import ImgMotokoSchool from 'assets/sponsors/motoko-school.webp';
import ImgMyArtBar from 'assets/sponsors/myartbar.webp';
import ImgNFTStudio from 'assets/sponsors/nft-studio.webp';
import ImgPokedstudio from 'assets/sponsors/pokedstudio.webp';
import ImgTheSword from 'assets/sponsors/thesword.webp';
import ImgVisions from 'assets/sponsors/visions.webp';
import ImgICPSquad from 'assets/sponsors/icpsquad.webp';
import ImgICPM from 'assets/sponsors/icpm.webp';

interface Props {};

interface Sponsor {
    image : string;
    title : string;
    link : string;
};

export default function Sponsors ({} : Props) {
    const sponsors : Sponsor[] = [{
        image: ImgToniq,
        title: 'Toniq Game Studios',
        link: 'https://twitter.com/ToniqGames',
    }, {
        image: ImgMotokoSchool,
        title: 'Motoko School',
        link: 'https://twitter.com/MotokoSchool',
    }, {
        image: ImgVisions,
        title: 'Visions Graphics',
        link: 'https://twitter.com/Visions_GFX',
    }, {
        image: ImgICPuppies,
        title: 'ICPuppies',
        link: 'https://twitter.com/ICPuppies',
    }, {
        image: ImgMyArtBar,
        title: 'MyArtBar',
        link: 'https://twitter.com/MyArtBar',
    }, {
        image: ImgPokedstudio,
        title: 'pokedstudio',
        link: 'https://twitter.com/pokedstudiouk',
    }, {
        image: ImgTheSword,
        title: 'The Sword NFT',
        link: 'https://twitter.com/TheSwordNft',
    }, {
        image: ImgNFTStudio,
        title: 'NFT Studio Poland',
        link: 'https://twitter.com/NFTStudioPoland',
    }, {
        image: ImgICPSquad,
        title: 'ICPSquad',
        link: 'https://twitter.com/ICPSquad',
    }, {
        image: ImgICPM,
        title: 'ICP Maximalist Network',
        link: 'https://t.me/icpmaximalistnetwork',
    }];

    return <div className={Styles.root}>
        {sponsors.map((sponsor, i) => <div className={Styles.sponsor} key={`${i}sponsor`}>
            <a href={sponsor.link} className={Styles.link} target="_blank">
                <img className={Styles.image} src={sponsor.image} />
                <div className={Styles.title}>{sponsor.title}</div>
            </a>
        </div>)}
    </div>
};