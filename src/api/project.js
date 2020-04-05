import httpService from '../services/HttpService';

class ProjectApi {
    static createproject(uid, project, callback) {
        let url = 'user/${uid}/project';

        return httpService.post(url, project, callback);
    }

    static listAllProject(uid, callback) {
        let url = 'user/${uid}/project';

        return httpService.get(url, callback);
    }

    static deleteProject(uid, pid, callback) {
        let url = 'user/${uid}/project/${pid}';

        return httpService.delete(url, callback);
    }

    static createInviteCode(uid, pid, callback) {
        let url = 'user/${uid}/project/${pid}';

        return httpService.post(url, null, callback);
    }

    static addUsertoProject(uid, code, callback) {
        let url = 'user/${uid}/invicode/${code}';

        return httpService.post(url, null, callback);
    }
}

export default ProjectApi;