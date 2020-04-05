import httpService from "../services/HttpService";

class TransactionApi {
    static listAllTransaction(gid, callback) {
        let url = 'group/${gid}/transactions';

        return httpService.get(url, callback);
    }

    static listAllTagsInTransaction(tid, callback) {
        let url = 'transaction/${tid}/tags';

        return httpService.get(url, callback);
    }

    static listAllUsersInTransaction(tid, callback) {
        let url = 'transaction/${tid}/users';

        return httpService.get(url, callback);
    }

    static createTransaction(gid, transaction, callback) {
        let url = 'group/${gid}/transaction';

        return httpService.post(url, transaction, callback);
    }

    static updateTransaction(gid, tid, transaction, callback) {
        let url = 'group/${gid}/transaction/${tid}';

        return httpService.put(url, transaction, callback);
    }

    static deleteTransaction(gid, tid, callback) {
        let url = 'group/${gid}/transaction/${tid}';

        return httpService.delete(url, callback);
    }

    static addUserToTransaction(tid, uid, callback) {
        let url = 'transaction/${tid}/user/${uid}';

        return httpService.post(url, null, callback);
    }

    static deleteUserFromTransaction(tid, uid, callback) {
        let url = 'transaction/${tid}/user/${uid}';

        return httpService.delete(url, callback);
    }

    static addTagToTransaction(tid, tagId, callback) {
        let url = 'transaction/${tid}/user/${tagId}';

        return httpService.post(url, null, callback);
    }

    static deleteTagFromTransaction(tid, tagId, callback) {
        let url = 'transaction/${tid}/user/${tagId}';

        return httpService.delete(url, callback);
    }
}

export default TransactionApi;