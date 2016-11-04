import {Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import {DriversService} from '../shared/drivers.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MapsAPILoader,AgmCoreModule } from 'angular2-google-maps/core';

declare var google:any;

@Component({
  selector: 'drivers',
  templateUrl: './drivers.component.html',
  providers:[DriversService]
  })

export class DriversComponent implements OnInit {

  id: number;
  name:string;
  email:string;
  public latitude:number;
  public longitude:number;
  public zoom: number;
  public radius:number;
  drivers: any[];
  postMyDriverToServer:string;
  visible = false;
  hidden = false;
  driverPosition:number;

  constructor(public driversService: DriversService, private route: ActivatedRoute,private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit() {
    // get the list of driver on load
    this.driversService.getDrivers().subscribe((data)=>this.drivers=data);
    this.zoom = 12;
    this.latitude = 48.866667;
    this.longitude = 2.333333;
    this.radius=0;
    // set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.submitSearch();
    }

  createDriver() {
    this.driversService.postDriver(this.name,this.email,this.longitude,this.latitude).subscribe(
      //call the post
          data => {
            this.postMyDriverToServer = JSON.stringify(data) // put the data returned from the server in our variable
            //  refresh the list
            this.driversService.getDrivers().subscribe((data)=>this.drivers=data);
          }
      );
    }

  updateDriver(driver) {
    this.driversService.updateDriver(driver).subscribe(
       data => {
        //  refresh the list
         this.driversService.getDrivers().subscribe((data)=>this.drivers=data);
         return true;
       }
       ,
       error => {
         console.error("Error saving food!");
         return Observable.throw(error);
       }
    );
    }

  deleteDriver(driver) {
    if (confirm("Are you sure you want to delete " + driver.name + "?")) {
      this.driversService.deleteDriver(driver).subscribe(
        data => {
          // refresh the list
          this.driversService.getDrivers().subscribe((data)=>this.drivers=data);
          return true;
        },
        error => {
          console.error("Error deleting food!");
          return Observable.throw(error);
        }
      );
    }
  }

  // set current position
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
}
// search adress form
  submitSearch(){
    var input : any = document.getElementById('google_adress');
    var options = {
    componentRestrictions: {country: 'fr'}
  };
    //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(input,options);
        autocomplete.addListener("place_changed", () => {
          //get the place result
          let place= google.maps.places.PlaceResult = autocomplete.getPlace();
          //set latitude and longitude
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom=15;
        });
      });
  }
  // input radius form
  submitRadius(){
    var inputradius : any = document.getElementById('google_radius');
    this.radius=parseFloat(inputradius.value);

  }
  // set position of each driver on map
  getPositionDriver(driver){
    this.latitude = driver.latitude;
    this.longitude = driver.longitude;
    this.zoom=17;
  }
  // toggle add form
  toggleForm(){
    this.visible= !this.visible;
  }
  // toggle modify driver form
  toggleListForm(id){
    this.hidden= !this.hidden;
    console.log(this.hidden)
    }

  findClosestMarker(driver) {
    // var isInArea=[];
    var driverPosition=new google.maps.LatLng(driver.latitude,driver.longitude);
    var coordinates = new google.maps.LatLng(this.latitude,this.longitude);
    var distance=google.maps.geometry.spherical.computeDistanceBetween(driverPosition, coordinates);
    return distance;
    // console.log(distance);
  }

  ifClose(driver){
    var distance=this.findClosestMarker(driver);
    if(distance<=this.radius){
      return true;
    }
    else{
      return false;
    }
  }

}
