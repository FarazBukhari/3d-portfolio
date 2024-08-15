import React from 'react';
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';

const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText} <img src={arrow} className="w-4 h-4 object-contain" />
        </Link>
    </div>
);

const renderContent = {
    1: (
        <h1 className="sm:text-xl sx:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
            Hi, I am <span className="font-semibold">Faraz</span> 👋🏻
            <br />A Software Engineer from Pakistan
        </h1>
    ),
    2: (
        <h1>
            <InfoBox text="Worked with many people and picked up many skills along the way" link="/about" btnText="Learn More" />
        </h1>
    ),
    3: (
        <h1>
            <InfoBox
                text="Lead multiple projects to success over the years. Curious about the impact?"
                link="/projects"
                btnText="Visit my portfolio"
            />
        </h1>
    ),
    4: (
        <h1>
            <InfoBox
                text="Needs a project done or looking for a dev? I'm just a few keystrokes away"
                link="/contact"
                btnText="Let's talk"
            />
        </h1>
    )
};

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null;
};

export default HomeInfo;
