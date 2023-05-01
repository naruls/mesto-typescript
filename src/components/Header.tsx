import React, {FC} from 'react';

const headerLogo: string = require("../images/mesto-logo.svg").default;

interface HeaderProps {
    children: React.ReactChild | React.ReactNode;
}

const Header:FC<HeaderProps> = ({children}) => {
    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="логотип проекта место"/>
            {children}
        </header>
    );
};

export default Header;