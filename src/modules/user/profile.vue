!<template>
    <headerApp></headerApp>
    <div class="text-white bg-black h-screen">
        <div class="flex items-center gap-20 px-40 ">
            <img width="150" src="../../assets/profile.png" alt="">
            <h1 class="text-xl font-bold">{{ userInfo.first_name}} {{ userInfo.last_name}} <span class="text-lg font-normal">({{ userInfo.user_handle }})</span></h1>
        </div>
        <div class="px-40 py-10">
            <p>Correo Electronico: {{ userInfo.email_address}}</p>
            <p>Numero de Telefono: {{ userInfo.phonenumber }}</p>
            <p>Cuenta creada: {{ formatDatePubli(userInfo.created_at) }}</p>
        </div>
        <div class="h-full bg-black">
            <h1 class="font-bold text-3xl text-while py-10 px-40">MIS PUBLICACIONES</h1>
            <div v-if="my_tweetsData != null">
                <div v-for="(item, i) in my_tweetsData" :key="i" class="px-80 pb-5 border-t-gray-500 border-t">
                    <p class="pt-6 text-white pb-2 font-bold"> <span class="bg-white text-black rounded-lg py-2 px-2">{{ item.byUser.user_handle }}</span></p>
                    <div class="rounded-lg py-5 px-5 text-white">
                        <p>{{ item.tweet_text }}</p>
                    </div>
                    <p class="text-white text-sm"> {{ formatDatePubli(item. created_at)}}</p>
                </div>
            </div>
            <div v-else>
                <p class="px-40 text-xl text-red-400">No tienes publicaciones</p>
            </div>
        </div>

    </div>
</template>
<script>
import headerApp from './layouts/header.vue';
import dayjs from 'dayjs'
import ApiService from '@/service/api';
export default{
    components:{
        headerApp
    },
    data(){
        return{
            userInfo: JSON.parse(localStorage.getItem("userData")),
            my_tweetsData: null           
        }
    },
    mounted(){
        this.my_tweets(this.userInfo);
    },
    methods:{
        formatDate(date){return dayjs(date).format('DD/MM/YYYY')},
        formatDatePubli(date){return dayjs(date).format('DD/MM/YYYY HH:mm')},
                
        async my_tweets(userInfo){
            const response = await ApiService.my_tweets(userInfo);
            if(response){
                this.my_tweetsData = response.data;
                console.log(this.my_tweetsData);
            }
        }
    },
}
</script>