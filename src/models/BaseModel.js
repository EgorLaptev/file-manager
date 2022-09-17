export default class BaseModel {

    static baseURL = 'http://localhost:8000/api/'

    static fetchData(url, method='GET', data={}) {
        return new Promise((resolve, reject) => {

            const body = JSON.stringify(data)

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

            fetch(this.baseURL + url, { body, method, headers })
                .then(resp => resp.json())
                .then(data => resolve(data))
                .catch(err => reject(err))

        })
    }

}