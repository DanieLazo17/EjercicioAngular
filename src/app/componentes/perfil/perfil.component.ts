import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/entidades/cliente';
import { ApiService } from 'src/app/servicios/api.service';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  cliente!:Cliente;
  modificaCorreo!:boolean;
  modificaNombre!:boolean;
  modificaApellido!:boolean;
  modificaDni!:boolean;
  mensaje!:string;
  respuestaServidor!:Array<any>;
  btnAceptarCorreo!:boolean;
  btnAceptarNombre!:boolean;
  btnAceptarApellido!:boolean;
  btnAceptarDni!:boolean;

  constructor(private api: ApiService, private ruteo: Router, public servicioMensajes: MensajeService) {
    this.cliente = new Cliente();
    this.modificaCorreo = false;
    this.modificaNombre = false;
    this.modificaApellido = false;
    this.modificaDni = false;
    this.btnAceptarCorreo = true;
    this.btnAceptarNombre = true;
    this.btnAceptarApellido = true;
    this.btnAceptarDni = true;
    this.mensaje = "";
    if(this.servicioMensajes.MiUsuario != null){
      let datos = new FormData();
      datos.append("token", this.servicioMensajes.MiUsuario.token);
      this.api.traerInfo(this.servicioMensajes.MiUsuario.idUsuario, datos).subscribe(
        respuesta => { this.mostrarInfo(respuesta)},
      );
    }
    if(this.servicioMensajes.MiUsuario == null){
      this.salir();
    }
  }

  ngOnInit(): void {
  }

  salir() {
    sessionStorage.removeItem("usuario");
    this.ruteo.navigate([""]);
  }

  mostrarInfo(respuesta:Object) {
    this.cliente = <Cliente>respuesta;
  }

  modificarCorreo():void{
    this.modificaCorreo = true;
  }

  noModificarCorreo():void{
    this.modificaCorreo = false;
  }

  validarCorreo():void{
    var pattCorreo = new RegExp(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    var testCorreo = pattCorreo.test(this.cliente.email);
    if (testCorreo) {
      this.btnAceptarCorreo = false;
    } else {
      this.btnAceptarCorreo = true;
    }
  }

  cambiarCorreo():void{
    this.modificaCorreo = false;
    let datos = new FormData();
    datos.append("email", this.cliente.email);
    this.api.cambiarCorreo(this.servicioMensajes.MiUsuario.idUsuario, datos).subscribe(
      respuesta => { this.mostrarRespuesta(respuesta)},
    );
  }

  modificarNombre():void{
    this.modificaNombre = true;
  }

  noModificarNombre():void{
    this.modificaNombre = false;
  }

  validarNombre():void{
    if (this.cliente.nombre.length >= 2) {
      this.btnAceptarNombre = false;
    } else {
      this.btnAceptarNombre = true;
    }
  }

  cambiarNombre():void{
    this.modificaNombre = false;
    let datos = new FormData();
    datos.append("nombre", this.cliente.nombre);
    this.api.cambiarNombre(this.servicioMensajes.MiUsuario.idUsuario, datos).subscribe(
      respuesta => { this.mostrarRespuesta(respuesta)},
    );
  }

  modificarApellido():void{
    this.modificaApellido = true;
  }

  noModificarApellido():void{
    this.modificaApellido = false;
  }

  validarApellido():void{
    if (this.cliente.apellido.length >= 2) {
      this.btnAceptarApellido = false;
    } else {
      this.btnAceptarApellido = true;
    }
  }

  cambiarApellido():void{
    this.modificaApellido = false;
    let datos = new FormData();
    datos.append("apellido", this.cliente.apellido);
    this.api.cambiarApellido(this.servicioMensajes.MiUsuario.idUsuario, datos).subscribe(
      respuesta => { this.mostrarRespuesta(respuesta)},
    );
  }

  modificarDni():void{
    this.modificaDni = true;
  }

  noModificarDni():void{
    this.modificaDni = false;
  }

  validarDni():void{
    var pattDni = new RegExp(/^([0-9]{7,8})*$/);
    var testDni = pattDni.test(this.cliente.dni);
    if (testDni) {
      this.btnAceptarDni = false;
    } else {
      this.btnAceptarDni = true;
    }
  }

  cambiarDni():void{
    this.modificaDni = false;
    let datos = new FormData();
    datos.append("dni", this.cliente.dni);
    this.api.cambiarDni(this.servicioMensajes.MiUsuario.idUsuario, datos).subscribe(
      respuesta => { this.mostrarRespuesta(respuesta)},
    );
  }

  mostrarRespuesta(respuesta:any):void{
    if(respuesta['estado']==true){
      this.mensaje = respuesta['mensaje'];
    } else {
      this.mensaje = respuesta['mensaje'];
    }
    setTimeout(() => {
      this.mensaje = "";
    }, 2000);
  }
}