import {InterfaceUser} from '../types/types'
export const BASE_URL = 'https://auth.nomoreparties.co'; 

export const register = (email: string, password :string) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((response) => { 
        console.log(response)
        try { 
          if (response.status === 201){ 
            return response.json(); 
          } 
        } catch(e){ 
          return (e) 
        } 
      }) 
    .then((res) => {
        return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (email: string, password :string) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
    .then((response => response.json())) 
    .then((data: {token: string}) => {
      console.log(data)
        if (data.token){ 
          localStorage.setItem('jwt', data.token); 
          return data; 
        } 
      }) 
    }; 

    export const getContent = (token: string) => {
        return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data => data)
    } 