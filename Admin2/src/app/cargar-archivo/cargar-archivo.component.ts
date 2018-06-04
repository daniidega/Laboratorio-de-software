import { Component, OnInit } from '@angular/core';

//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/upload';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.scss']
})
export class CargarArchivoComponent implements OnInit {

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'upload'});

  public title = 'Cargar archivo';

  constructor() { }

  ngOnInit() {

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };

  }

}
