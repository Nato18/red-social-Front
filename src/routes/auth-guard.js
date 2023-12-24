
import store from '../store/index.js';


const isAuthenticatedGuard = async( to, from, next ) => {
    return new Promise( () => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            console.log('está autenticado')
            next()
        } else {
            console.log('bloqueado por el isAuthenticatedGuard')
            next({ name: 'login' })
        }

    })
}

export default isAuthenticatedGuard
