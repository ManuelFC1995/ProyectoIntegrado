import { Injectable } from '@angular/core';
import { Direccion } from '../model/Direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
Direcion:Direccion;
  constructor() { }

  GetDireccion(){
    return this.Direcion;
  }

  setDireccion(Direcion:Direccion){
    this.Direcion=Direcion;
  }

  CleanDireccion(){
    this.Direcion=null;
  }
}
