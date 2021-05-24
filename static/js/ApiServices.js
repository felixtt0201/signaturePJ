const storeApi = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

const getPostsInfo = () => storeApi.get('comments');
const postSingature = (data) => storeApi.post('comments', data);

export { getPostsInfo, postSingature }