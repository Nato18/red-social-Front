<template>
    <div class="bg-black">
        <div class="flex justify-center pt-10 px-80 pb-10 flex-col">
            <div>
                <p class="text-white text-bold mb-4">Publica un pensamiento</p>
            </div>
            <input v-model="text" type="text" placeholder="publica algo" class="bg-slate-200 rounded-lg h-20 pl-4">
            <div>
                <button class="bg-white py-2 px-5 mt-5 rounded-lg" @click="send_tweet()">Publicar</button>
            </div>
        </div>
        <div class="h-full">
            <div class="">
                <h1 class="font-bold text-3xl text-white py-10 px-40">PUBLICACIONES</h1>
                <div v-for="(item,i) in tweets" :key="i" class="px-80 pb-5 border-t-gray-500 border-t">
                    <p class="pt-6 text-white pb-2 font-bold"> <span class="bg-white text-black rounded-lg py-2 px-2">{{ item.byUser.user_handle }}</span></p>
                    <div class="rounded-lg py-5 px-5 text-white">
                        <p>{{ item.tweet_text }}</p>         
                    </div>
                    <div class="flex gap-15 mb-5">
                        <button @click="like(item.tweet_id, i)" class=" flex text-white underline hover:font-bold mr-4"> {{ findLike(item) }}</button>
                        <p class="text-white">Me Gustas: {{ item.num_likes }}</p>
                    </div>
                    <p class="text-white text-sm"><span>{{formatDate(item.created_at)}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ApiService from '@/service/api';
import io from 'socket.io-client';
import dayjs from 'dayjs';

export default{
    data(){
        return{
            text: '',
            tweets: [],
            socket: null,
            userInfo: JSON.parse(localStorage.getItem("userData")),
            tweetIndex: 0
        }
    },

    mounted(){

         this.alltweets();
         this.socket = io(import.meta.env.VITE_API_HOST);
         
         this.socket.on('newTweet', (newTweet) => {
            this.tweets.unshift(newTweet); // Agregar el nuevo tweet al principio de la lista
         });

         this.socket.on('newLike', (newLike) =>{
            this.tweets[this.tweetIndex] = newLike;
         })
    },
    methods:{
        async alltweets(){
            const response = await ApiService.allTweets(this.userInfo.user_id);
            if(response){
                this.tweets = response.data;
                console.log(this.tweets);
            }
        },
        async send_tweet(){
            if(this.text != ''){
                let localData = localStorage.getItem("userData")
                const userData = JSON.parse(localData);
                let data = {user_id: userData.user_id, tweet_text: this.text};
                const response = await ApiService.send_tweet(data);
                if(response){
                    this.text = '';
                    this.socket.emit('newTweet');
                }
            }
        },
        formatDate(date){
            return dayjs(date).format('DD/MM/YYYY HH:mm')
        },
        async like(id,i){
            this.tweetIndex = i;
            let data = {tweet_id: id, user_id: this.userInfo.user_id};
            const response = await ApiService.like_tweet(data);
            if(response){
                this.socket.emit('newLike');
            }
        },
        findLike(tweet){
            if(tweet.myLike == null){
                return 'Me Gusta';
            }else{
                return 'Quitar Me Gusta';
            }
        }

    },
}
</script>