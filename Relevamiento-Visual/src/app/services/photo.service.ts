import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  imagenes: any[];
  misImagenes:any[]=[];
  linda:string;
  user:Usuario=<Usuario>JSON.parse(localStorage.getItem('user'));
  rutaDeLaColeccion="/fotos";
  referenciaAlaColeccion:AngularFireList<any>

  constructor(private bd: AngularFireDatabase) {
    this.referenciaAlaColeccion = bd.list(this.rutaDeLaColeccion);
  }
  async sacarFoto() {//saco foto y la subo al firebase Storage

    let capturedPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      webUseInput: true,
    });//capturo la Foto

    ///los `let` setean algunas cosas
    let dataUrl = capturedPhoto.dataUrl;//obtengo el dataUrl
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = "/" + this.user.perfil + hora;//le digo la ubicacion de la foto en el firebaseStorage
    let ref = firebase.default.storage().ref(ubicacion);//asigno la ubicacion
    
    ref.putString(dataUrl, 'data_url',{
      contentType: 'image/jpeg',
    }).then(()=>{
      this.guardarReferencia(ubicacion);///despues de que se suba la imagen la va a guardar con datos en el firebase realtime database
    })
  }

  guardarReferencia(pReferencia: string){
    let storage = firebase.default.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child(pReferencia);//bueno hay q ser sinceros.. hay pasos que desconozco que hacen pero funciona asiq para adelante
    let array:string[]=['tomaslodola1@gmail.com']
    spaceRef.getDownloadURL().then(url => {
      debugger;
      let messagesRef = firebase.default.database().ref().child("fotos");
      this.linda=localStorage.getItem('lindo');
      console.log(this.linda)
      messagesRef.push({ esLinda:this.linda, usuario: this.user.correo, votos:0, referencia: url,like:array});//guardo en el realtime la referencia a la foto y mas datos
    });
  }

  ObtenerTodos()
  {
    var misFotos =firebase.default.database().ref().child("fotos");
    misFotos.on('child_added',datos=>{
      this.misImagenes.push({id:datos.key, esLinda:datos.child("esLinda").val(), usuario:datos.child("usuario").val(),  votos:datos.child("votos").val(), referencia:datos.child("referencia").val(), like:datos.child("like").val()});
    })
    return this.misImagenes;
  }

  modificarFoto(foto:any,id){
    this.referenciaAlaColeccion.update(id,foto);
  }
    
}
