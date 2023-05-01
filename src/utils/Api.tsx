import { InterfaceUser, InterfaceCard } from '../types/types'

export class Api{
    _basedUrl: string;

    constructor(options: {basedUrl: string}){
        this._basedUrl = options.basedUrl;
    }

    getUserInfo() {
        return fetch(`${this._basedUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              }
        }).then(this._getResponseData)
    }

    getCard() {
        return fetch(`${this._basedUrl}/cards`, {
            method: 'GET',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              }
        }).then(this._getResponseData)
    }

    changeUserInfo(data: {name: string, about: string}) {
        return fetch(`${this._basedUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                about: data.about
              })
        }).then(this._getResponseData)
    }

    changeUserAvatar(data: {avatar?: string}) {
        return fetch(`${this._basedUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                avatar: data.avatar
              })
        }).then(this._getResponseData)
    }

    postCard(data: {name: string, link: string}) {
        return fetch(`${this._basedUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._getResponseData)
    }

    deleteCard(data?: InterfaceCard) {
        return fetch(`${this._basedUrl}/cards/${data?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              }
        }).then(this._getResponseData)
    }

    setLikeCard(data: InterfaceCard) {
        return fetch(`${this._basedUrl}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              }
        }).then(this._getResponseData)
    }

    deleteLikeCard(data: InterfaceCard) {
        return fetch(`${this._basedUrl}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
                'Content-Type': 'application/json'
              }
        }).then(this._getResponseData)
    }

    changeLikeCardStatus(data: InterfaceCard, isLiked: boolean) { 
        if (isLiked) { 
          return this.setLikeCard(data); 
        } else { 
          return this.deleteLikeCard(data); 
        } 
      } 

      _getResponseData(res: Response) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    } 
}

export const api = new Api({
    basedUrl: 'https://mesto.nomoreparties.co/v1/cohort-25', 
});