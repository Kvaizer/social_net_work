import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': process.env.REACT_APP_BACK_API_KEY || ''
    }
})

export const usersAPI = {
    'API-KEY': 'e26bf4e6-e8de-4bf0-84a3-1a67eec1ff12',
    baseUrl: 'https://social-network.samuraijs.com/api/1.0/',

    getUsers(currentPage: number = 10, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    deleteUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
    },

    postFollow(id: number) {
        return instance.post(`follow/${id}`)
    }
}

export const profileAPI = {

    getProfile(id: number) {
        return instance.get(`profile/${id}`)
    },

    getStatus(id: number) {
        return instance.get(`profile/status/${id}`)
    },

    updateStatus(status: string) {
        return instance.put('profile/status', {status})
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then(response => response.data)
    },

    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },

    logout() {
        return instance.delete('auth/login')
    }
}




