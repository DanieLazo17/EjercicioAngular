import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { ApiService } from 'src/app/servicios/api.service';
import { MensajeService } from 'src/app/servicios/mensaje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;
  btnIngreso: boolean;
  mensaje!: string;

  constructor(private ruteo: Router, private api: ApiService, private servicioMensajes: MensajeService) {
    this.usuario = new Usuario();
    this.btnIngreso = true;
    if (sessionStorage.getItem("usuario") != null) {
      this.ruteo.navigate(["/perfil"]);
    }
  }

  ngOnInit(): void {
  }

  validar() {
    var patt = new RegExp(/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/);
    var resultado = patt.test(this.usuario.contrasena);
    if (this.usuario.usuario.length >= 6 && resultado) {
      this.btnIngreso = false;
    } else {
      this.btnIngreso = true;
    }
  }

  ingresar(): void {
    this.btnIngreso = true;
    let datos = new FormData();
    datos.append("usuario", this.usuario.usuario);
    datos.append("contrasena", this.usuario.contrasena);
    //La función subscribe() es asíncrono
    this.api.validarUsuario(datos).subscribe(
      respuesta => { this.funcionIngresar(respuesta)},
      //error => {alert()},
      //() => {alert('Cargando..')}
    );
  }

  funcionIngresar(respuesta:Object) {
    this.usuario = <Usuario>respuesta;
    if (this.usuario.usuario == null) {
      this.mensaje = "Los datos ingresados no son correctos";
    }
    if (this.usuario.usuario != null) {
      this.mensaje = "Acceso correcto";
      sessionStorage.setItem("usuario", this.usuario.usuario);
      this.servicioMensajes.MiUsuario = this.usuario;
      this.ruteo.navigate(['/perfil']);
    }
  }
}
