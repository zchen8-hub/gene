import httpService from '../services/HttpService';

class CommentApi {
    static listAllComment(uid, tid, callback) {
        let url = `user/${uid}/transaction/${tid}/comments`;

        return httpService.get(url, callback);
    }
    static addComment(uid, tid, comment, callback) {
        let url = `user/${uid}/transaction/${tid}/comment`;

        return httpService.post(url, comment, callback)
    }

    static deleteComment(uid, tid, cid, callback) {
        let url = `user/${uid}/transaction/${tid}/comment/${cid}`;

        return httpService.delete(url, callback)
    }
}

export default CommentApi;