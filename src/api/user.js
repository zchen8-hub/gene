import httpService from '../services/HttpService';

class UserApi {
    static signup(user, callback) {
        let url = 'user/signup';

        return httpService.post(url, user, callback)
    }

    static login(user, callback) {
        let url = 'user/login';

        return httpService.post(url, user, callback)
    }
}

export default UserApi;