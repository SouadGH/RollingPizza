import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor() { }

  public static roundTwoDecimals(val: Number):any {

   // return Math.round((Number(val) + Number.EPSILON) * 100) / 100;
   return Number(val).toFixed(2);
   }

}
