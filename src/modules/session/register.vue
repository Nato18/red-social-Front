<template>
    <div class="h-screen grid grid-cols-2 ">
        <div class="flex justify-center items-center bg-purple-600">

            <div class="bg-white rounded-lg py-5 px-10 w-2/4">
                <h3 class="text-center font-bold text-lg pb-5">Crear Cuenta</h3>
                <div>
                    <div class="flex flex-col">
                        <label class="font-bold" for="">Nombre de Usuario</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="user" type="text" placeholder="ingresa un nombre de usuario">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold mb-2" for="">Correo Electronico</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="email" type="text" placeholder="Ingresa tu Correo Electronico">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold" for="">Contraseña</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="password" type="password" placeholder="ingresa tu contraseña">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold" for="">Nombre</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="first_name" type="text" placeholder="ingresa tu Nombre">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold" for="">Apellido</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="last_name" type="text" placeholder="ingresa tu Apellido">
                    </div>
                    <div class="flex flex-col mt-4">
                        <label class="font-bold" for="">Numero de Telefono</label>
                        <input class="bg-slate-200 rounded-lg py-2 pl-4" v-model="phonenumber" type="text" placeholder="ingresa tu numero de telefono">
                    </div>
                    <div class="mt-4">
                        <router-link class="text-purple-500" to="/">¿Ya tienes una cuenta?</router-link>
                    </div>
                    <div class="flex justify-center mt-10 mb-5">
                        <button @click="register()" class="bg-purple-400 text-white py-2 px-5 rounded-lg font-bold" type="button">Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center bg-white">
            <div class="flex justify-center items-center">
                <h1 class="text-xl">Estas Creando una cuenta en Z</h1>
            </div>
        </div>
    </div>    
</template>

<script>
import ApiService from '../../service/api';

export default {

    data(){
        return{
            user:'',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phonenumber: ''
        }
    },
    methods:{
        async register(){
            let data= {
                email: this.email,
                password: this.password,
                user: this.user,
                first_name: this.first_name,
                last_name: this.last_name,
                phonenumber: this.phonenumber                
            };
            const response = await ApiService.register(data);
            if(response){
                this.$router.push("/");
            }
        } 
    }
    
}
</script>