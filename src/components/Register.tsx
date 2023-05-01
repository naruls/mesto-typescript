import React from "react";
import Header from "./Header";
import { Link } from 'react-router-dom'; 
import * as auth from '../utils/authMesto';
import { useNavigate } from "react-router-dom";

function Register() {
const navigate = useNavigate();     
const [registetEmail, setRegisterEmail] = React.useState<string>('');
const [registerPassword, setRegisterPassword] = React.useState<string>('');


function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterEmail(e.target.value);
}

function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterPassword(e.target.value);
}

function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    auth.register(registetEmail, registerPassword)
    .then((res) => {
        navigate('/sign-in'); 
    })

}

    return(
        <>
            <Header children={
            <div className='header__right-panel'>
            <Link to="/sign-in" className='header__button'>Войти</Link>
            </div>
            }/>
            <div className="register">
                <p className="register__text">Регистрация</p>
                <form onSubmit={handelSubmit} className="register__form" name="login-form">
                    <input placeholder="Email" className="register__input" onChange={emailChange} required type="email"/>
                    <input placeholder="Password" className="register__input" onChange={passwordChange} required type="password"/>
                    <button className="register__button">Зарегистрироваться</button>
                </form>
                <p className="register__note">Уже зарегистрированы? <Link to="/sign-in" className="register__inform-link">Войти</Link></p>
            </div>
        </>
    );
}

export default Register;