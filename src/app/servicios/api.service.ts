import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api:string = 'https://backend-ejercicio.herokuapp.com/';

  constructor(private clienteHttp: HttpClient) {
  }

  validarUsuario(datos:FormData){
    return this.clienteHttp.post(this.api + 'Usuario/Validacion', datos);
  }

  traerInfo(id:number, datos:FormData){
    return this.clienteHttp.post(this.api + 'Cliente/Informacion/' + id, datos);
  }

  cambiarCorreo(id:number, datos:FormData){
    return this.clienteHttp.post(this.api + 'Cliente/Correo/' + id, datos);
  }

  cambiarNombre(id:number, datos:FormData){
    return this.clienteHttp.put(this.api + 'Cliente/Nombre/' + id, datos);
  }

  cambiarApellido(id:number, datos:FormData){
    return this.clienteHttp.post(this.api + 'Cliente/Apellido/' + id, datos);
  }

  cambiarDni(id:number, datos:FormData){
    return this.clienteHttp.post(this.api + 'Cliente/DNI/' + id, datos);
  }
}
