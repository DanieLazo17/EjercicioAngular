import { Injectable } from '@angular/core';
import { Usuario } from '../entidades/usuario';

@Injectable({
  providedIn: 'root'
})

export class MensajeService {
  
  private miMensaje !: string;
  
  public get MiMensaje() : string {
    return this.miMensaje;
  }
  public set MiMensaje(v : string) {
    this.miMensaje = v;
  }
  
  private miUsuario !: Usuario;
  
  public get MiUsuario() : Usuario {
    return this.miUsuario;
  }
  public set MiUsuario(v : Usuario) {
    this.miUsuario = v;
  }

  private miNombreUsuario : string = '';

  public get MiNombreUsuario() : string {
    return this.miNombreUsuario;
  }
  public set MiNombreUsuario(v : string) {
    this.miNombreUsuario = v;
  }
  
  constructor() { }
}
