import URLS from '../constants/urls';

class HttpService {
    handleResponse(xhr, callbackSuccess) {
        xhr.onloadend = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.response);
                    callbackSuccess(response);
                } else {
                    //alert("unable to process request: " + xhr.status);
                }
            }
        }
    }

    async get(path, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.api_url + path;
        console.log("GET url: " + url)

        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send();
        this.handleResponse(xhr, callback);

        return xhr;
    }

    async post(path, data, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.api_url + path;
        console.log("POST url: " + url);

        var js = JSON.stringify(data)
        console.log(js);

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(js);

        this.handleResponse(xhr, callback);
        return xhr;
    }

    async put(path, data, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.api_url + path;
        console.log("PUT url: " + url)

        var js = JSON.stringify(data)

        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(js);

        this.handleResponse(xhr, callback);

        return xhr;
    }

    async delete(path, callback) {
        let xhr = new XMLHttpRequest();
        const url = URLS.api_url + path;
        console.log("DELETE url: " + url)

        xhr.open('DELETE', url, true);
        xhr.send();
        this.handleResponse(xhr, callback);

        return xhr;
    }
}

const httpService = new HttpService();
export default httpService;