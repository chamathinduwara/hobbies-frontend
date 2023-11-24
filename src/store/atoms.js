import { atom } from "recoil";

export const ATOM_ME = atom({
    key: 'me',
    default: ''
})

export const isAuth = atom(
    {
        key: 'isAuth',
        default: document.cookie.includes('accessToken')
    }
)


export const USER_STATE = atom({
    key: 'userState',
    default: {
        name: '',
        email: '',
        hobbies: [],
        contacts: [],
    }
})
