import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js'

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommerceService {
private mCliente : any;

  constructor() { 
  this.mCliente=new Commerce(environment.CommerceApykey, !environment.production);
  }

  public get Client():any{
    return this.mCliente;
  }
}
