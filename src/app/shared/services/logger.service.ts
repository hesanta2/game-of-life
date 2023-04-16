import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public log(message: any): void {
    if (!environment.logger) {
      console.log(message);
    }
  }

}
