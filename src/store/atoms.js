import { atom } from "recoil";

export const ATOM_ME = atom({
    key: 'me',
    default: {
        name: '',
        email: '',
        hobbies: [],
        contacts: [],
    }
})

export const isAuth = atom(
    {
        key: 'isAuth',
        default: document.cookie.includes('accessToken')
    }
)

