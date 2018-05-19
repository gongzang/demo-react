var HTTPUtil = {};
const urlHead = 'http://localhost:3010';
const defaultHeaders = {
    'Content-Type': 'application/json'
}

/**  
 * 基于 fetch 封装的 GET请求  
 * @param url  
 * @param params {}  
 * @param headers  
 * @returns {Promise}  
 */
HTTPUtil.get = function (url, params, headers) {
    url = urlHead + url;
    if (params) {
        let paramsArray = [];
        //encodeURIComponent    
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}


/**  
 * 基于 fetch 封装的 POST请求  FormData 表单数据  
 * @param url  
 * @param formData    
 * @param headers  
 * @returns {Promise}  
 */
HTTPUtil.post = function (url, formData, headers = defaultHeaders) {
    url = urlHead + url;
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}
/**  
 * 基于 fetch 封装的 put请求  FormData 表单数据  
 * @param url  
 * @param formData    
 * @param headers  
 * @returns {Promise}  
 */
HTTPUtil.put = function (url, formData, headers = defaultHeaders) {
    url = urlHead + url;
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}
/**  
 * 基于 fetch 封装的 DELETE请求  
 * @param url  
 * @param id    
 * @param headers  
 * @returns {Promise}  
 */
HTTPUtil.delete = function (url, id, headers) {
    url = urlHead + url + '/' + id;
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'delete',
            headers: headers,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({ status: response.status })
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject({ status: -1 });
            })
    })
}

export default HTTPUtil;