import httpService from '../services/HttpService';

class UserApi {
    static signup(user, callback) {
        let url = 'user/signup';

        return httpService.post(url, user, callback)
    }

    static login(callback) {
        let url = 'user/login';

        return httpService.get(url, callback)
    }
}

export default UserApi;