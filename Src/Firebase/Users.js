import {Auth, Database} from './Firebase';
import translate from 'google-translate-api';

function Crear(User){
  Auth.createUserWithEmailAndPassword(User.Email, User.Password).then((User) =>{
   return User.updateProfile({displayName: User.Nombre+' '+User.Apellido, }).catch((error) =>{
     User.delete();
   })
  });
}

module.exports = {Crear}