import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DriversService {
  constructor(public http: Http) {}

  getDrivers() {
    let url = `http://remote-challenge.pickles.fr./drivers`;
    return this.http.get(url)
      .map((res) => res.json());
  }
  postDriver(name:string,email:string,longitude:number,latitude:number){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers,method:"post" });
    let body = JSON.stringify({"name":name,"email":email,"longitude":longitude,"latitude":latitude});
    return this.http.post('http://remote-challenge.pickles.fr./drivers',body, headers)
    .map((res) => res.json());
  }
  updateDriver(driver) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(driver);
      return this.http.put('http://remote-challenge.pickles.fr./drivers/' + driver.id, body, headers)
  }
  deleteDriver(driver) {
    return this.http.delete('http://remote-challenge.pickles.fr./drivers/' + driver.id);
  }

}
