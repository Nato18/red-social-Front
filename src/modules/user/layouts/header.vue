<template>
    <div class="flex justify-between bg-black text-white pt-10 px-40 ">
        <div>
            <router-link to="/home"><img width="35" src="../../../assets/x-twitter.svg"></router-link>
        </div>
        <div class="flex gap-40">
            <router-link to="/home">Inicio</router-link>
            <router-link to="/profile">Perfil</router-link>
            <router-link to="">Seguidores</router-link>
        </div>
        <div class="flex gap-10">
            <p>Configuracion</p>
            <p @click="closeSession()">Cerrar Session</p>
        </div>
    </div>
</template>
<script>
export default{
    methods:{
        closeSession(){
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("userData");
            this.$router.push("/")
        }
    }
}
</script>