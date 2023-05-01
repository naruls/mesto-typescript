import React, {FC} from "react";
import Header from "./Header"
import { Link } from 'react-router-dom'; 
import * as auth from '../utils/authMesto';
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setLoggedIn: (data: boolean) => void;

}

const Login:FC<LoginProps> = ({setLoggedIn}) => {  
    const navigate = useNavigate();   
    const [userEmail, setUserEmail] = React.useState<string>('');
    const [userPassword, setUserPassword] = React.useState<string>('');

    function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserEmail(e.target.value);
    }

    function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserPassword(e.target.value);
    }

    function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        auth.authorize(userEmail, userPassword)
        .then((data) => {
            console.log(data)
            if (data?.token) {
                navigate('/', {replace: true});
                setLoggedIn(true);
            }
        })
        .catch(err => console.log(err));
    }
    

    return(
        <>
            <Header children={
            <div className='header__right-panel'>
            <Link to="/sign-up"className='header__button'>Регистрация</Link>
            </div>
            }/>
            <div className="login">
                <p className="login__text">Вход</p>
                <form className="login__form" name="login-form" onSubmit={handelSubmit} >
                    <input placeholder="Email" className="login__input" onChange={emailChange} required type="email"/>
                    <input placeholder="Password" className="login__input" onChange={passwordChange} required type="password"/>
                    <button className="login__button">Войти</button>
                </form>
            </div>
        </>
    );
}

export default Login;