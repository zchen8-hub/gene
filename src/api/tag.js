import httpService from '../services/HttpService';

class TagApi {
    static listAllTags(pid, callback) {
        let url = `project/${pid}/tags`;

        return httpService.get(url, callback);
    }

    static createTag(uid, pid, tag, callback) {
        let url = `user/${uid}/project/${pid}/tag`;

        return httpService.post(url, tag, callback);
    }

    static updateTag(uid, pid, tagId, tag, callback) {
        let url = `user/${uid}/project/${pid}/tag/${tagId}`;

        return httpService.put(url, tag, callback);
    }

    static deleteTag(uid, pid, tagId, callback) {
        let url = `user/${uid}/project/${pid}/tag/${tagId}`;

        return httpService.delete(url, callback);
    }
}

export default TagApi;