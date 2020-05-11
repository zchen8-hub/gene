import httpService from '../services/HttpService';

class TagApi {
    static listAllTags(pid, callback) {
        let url = `project/${pid}/tags`;

        return httpService.get(url, callback);
    }

    static createTag(uid, pid, tag, callback) {
        let url = 'user/${uid}/project/${pid}/tag';

        return httpService.post(url, tag, callback);
    }

    static updateTag(uid, pid, tagid, tag, callback) {
        let url = 'user/${uid}/project/${pid}/tag/${tagid}';

        return httpService.put(url, tag, callback);
    }

    static deleteTag(uid, pid, callback) {
        let url = 'user/${uid}/project/${pid}/tag/${tagid}';

        return httpService.delete(url, callback);
    }
}

export default TagApi;