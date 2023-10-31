import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

import { Logo } from './components/logo';
import { WithSeparator } from './components/with-separator';
import { useAuth } from './auth-context';

import { CCConfig } from '../cc-config';
let config: CCConfig = require('../cc-config.json')

interface MenuLink {
    to: string;
    text: string;
    external?: boolean;
    disabled?: boolean;
    note?: string;
}


/*
function getCurrentActiveCityLinks(username: string): MenuLink[][] {
    return [
        [
            {
                to: "/view/categories",
                text: "View Maps"
            },
            {
                to: "/edit/categories",
                text: "Edit Maps"
            },
            {
                to: "/data-extracts.html",
                text: "Download data"
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Open Manual - Wiki",
                external: true
            },
            {
                to: config.githubURL,
                text: "Open code",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Colouring Cities Open Manual/Wiki",
                disabled: false,
                external: true
            },
            {
                to: "/showcase.html",
                text: "Case Study Showcase",
                disabled: true,
            },
        ],
    ];
}
*/

function getCurrentMenuLinks(username: string): MenuLink[][] {
    return [
        [
            ...(
                username != undefined ?
                    [
                        {
                            to: "/my-account.html",
                            text: `Account (${username})`
                        }
                    ] :
                    [
                        {
                            to: "/login.html",
                            text: "Log in"
                        },
                        {
                            to: "/sign-up.html",
                            text: "Sign up"
                        }
                    ]
            )
        ],
        [
            {
                to: "/view/categories",
                text: "View Maps"
            },
            {
                to: "/edit/categories",
                text: "Edit Maps"
            },
            {
                to: "/data-extracts.html",
                text: "Download data"
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Open Manual - Wiki",
                external: true
            },
            {
                to: config.githubURL,
                text: "Open code",
                external: true
            },
            {
                to: "https://github.com/colouring-cities/manual/wiki",
                text: "Colouring Cities Open Manual/Wiki",
                disabled: false,
                external: true
            },
            {
                to: "/showcase.html",
                text: "Case Study Showcase",
                disabled: true,
            },
        ],
        [
            {
                to: "https://www.ahdap.org/colouring-australia",
                text: "About",
                external: true
            },
            {
                to: "https://www.ahdap.org/colouring-australia#data_categories",
                text: "Data Categories",
                external: true
            },
            {
                to: "https://www.ahdap.org/colouring-australia#who_are_we",
                text: "Who's Involved?",
                external: true
            },
        ],
        [
            {
                to: "/leaderboard.html",
                text: "Top Contributors"
            },
        ],
        [
            {
                to: "/data-ethics.html",
                text: "Data Ethics",
                external: true
            },
            {
                to: "/privacy-policy.html",
                text: "Privacy Policy"
            },
            {
                to: "/contributor-agreement.html",
                text: "Contributor Agreement"
            },
            {
                to: "/code-of-conduct.html",
                text: "Code of Conduct"
            },
            {
                to: "/data-accuracy.html",
                text: "Data Accuracy Agreement"
            },
        ],
        [
            {
                to: "/contact.html",
                text: "Contact"
            },
        ],
    ];
}

const ActiveCityMenu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    return (
        <WithSeparator separator={<hr />}>
            <ul key={`menu-section`} className="navbar-nav flex-container">
                {Object.keys(config.cityLinkMap).map(item =>
                    <li className='nav-item' key={`${item}`}>
                        {
                            item == config.cityName ?
                                <LinkStub note="">{item}</LinkStub> :
                                <ExternalNavLink to={config.cityLinkMap[item]}>{item}</ExternalNavLink>
                        }
                    </li>
                )}
            </ul>
        </WithSeparator>
    );
};

const Menu: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    const { user } = useAuth();

    const menuLinkSections = getCurrentMenuLinks(user?.username);
    return (
        <WithSeparator separator={<hr />}>
            {menuLinkSections.map((section, idx) =>
                <ul key={`menu-section-${idx}`} className="navbar-nav flex-container">
                    {section.map(item => (
                        <li className='nav-item' key={`${item.to}-${item.text}`}>
                            {
                                item.disabled ?
                                    <LinkStub note={item.note}>{item.text}</LinkStub> :
                                    item.external ?
                                        <ExternalNavLink to={item.to}>{item.text}</ExternalNavLink> :
                                        <InternalNavLink to={item.to} onClick={onNavigate}>{item.text}</InternalNavLink>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </WithSeparator>
    );
};

const InternalNavLink: React.FC<{to: string; onClick: () => void}> = ({ to, onClick, children}) => (
    <NavLink className="nav-link" to={to} onClick={onClick}>
        {children}
    </NavLink>
);

const ExternalNavLink: React.FC<{to: string}> = ({ to, children }) => (
    <a className="nav-link" href={to}>
        {children}
    </a>
);

const LinkStub: React.FC<{note: string}> = ({note, children}) => (
    <a className="nav-link disabled">
        {children}
        <span className="link-note">{note}</span>
    </a>
);

export const Header: React.FC<{
    animateLogo: boolean;
}> = ({ animateLogo }) => {
    const [openMenuName, setOpenMenuName] = useState("");
    const handleNavigate = () => setOpenMenuName("");

    return (
    <header className="main-header navbar navbar-light">
        <div className="nav-header">
            <NavLink to="/">
                <Logo variant={animateLogo ? 'animated' : 'default'}/>
            </NavLink>
            <button className="navbar-toggler" type="button"
                onClick={() => setOpenMenuName(openMenuName == "activeCity" ? "" : "activeCity")} aria-expanded={(openMenuName == "activeCity")} aria-label="Toggle cityselector">
                {config.cityName}&nbsp;
                {
                    !(openMenuName == "activeCity") ?
                        <span className="navbar-toggler-icon"></span>
                        : <span className="close">&times;</span>
                }
            </button>
            <button className="navbar-toggler" type="button"
                onClick={() => setOpenMenuName(openMenuName == "menu" ? "" : "menu")} aria-expanded={(openMenuName == "menu")} aria-label="Toggle cityselector">
                Menu&nbsp;
                {
                    !(openMenuName == "menu") ?
                        <span className="navbar-toggler-icon"></span>
                        : <span className="close">&times;</span>
                }
            </button>
        </div>
        <nav className={(openMenuName != "activeCity") ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <ActiveCityMenu onNavigate={handleNavigate}></ActiveCityMenu>
        </nav>
        <nav className={(openMenuName != "menu") ? 'collapse navbar-collapse' : 'navbar-collapse'}>
            <Menu onNavigate={handleNavigate}></Menu>
        </nav>
    </header>
    );
}
