import httpService from '../services/HttpService';

class GroupApi {
    static listAllGroups(pid, callback) {
        let url = 'project/${pid}/groups';

        return httpService.get(url, callback);
    }

    static createGroup(pid, group, callback) {
        let url = 'project/${pid}/group';

        return httpService.post(url, group, callback);
    }

    static updateGroupName(pid, gid, callback) {
        let url = 'project/${pid}/group/${gid}';

        return httpService.put(url, callback);
    }

    static deleteGroup(pid, gid, callback) {
        let url = 'project/${pid}/group/${gid}';

        return httpService.delete(url, callback);
    }
}

export default GroupApi;