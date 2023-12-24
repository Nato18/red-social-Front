import axios from 'axios';

const apiClient = axios.create({
    basURL: process.env.VUE_APP_API_HOST
});


export default{
    async saludo(){
        const response = await apiClient.get("/inicio");
        return response.data.data;
    },
    async login(data){
        const response = await apiClient.post("/session/login",data);
        return response.data;
    },
    async register(data){
        const response = await apiClient.post("/session/register", data);
        return response.data.success;
    },
    async send_tweet(id){
        try{
            const response = await apiClient.post("/user/send_tweet",id);
            return response.data
        }catch(error){
            console.error(error)
        }

    },
    async allTweets(user_id){
        const response = await apiClient.get("/user/all_tweets?user_id="+user_id);
        return response.data;
    },
    async my_tweets(data){
        const response = await apiClient.get(`/user/my_tweets?user_id=${data.user_id}`);
        return response.data;
    },
    async like_tweet(data){
        const response = await apiClient.post('user/like_tweet', data);
        return response.data;
    }
}