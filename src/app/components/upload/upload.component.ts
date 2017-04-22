import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';


interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'image-upload',
  styles: ['img { width:150px; float:right;}'],
  template: `
  <h3><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Ajoutez une image</h3>
  
  
  <div class="row">
    <div class="col-md-6">
    
      <form ngNoForm [hidden]="link">
          <input  class="form-control" id="file" name="file" type="file" required>
          <button type="button" class="btn btn-default" (click)="upload()">Upload</button>
      </form>
      
        <div *ngIf="link">
           <div class="alert alert-success">
            <strong>Nice ! </strong> Image uploadé.
          </div>
        </div>
    </div>
      
    <div class="col-md-6">
      <div *ngIf="! link">
       <img src="https://placehold.it/300?text=?">
      </div>
      <div *ngIf="link">
       <img [src]="link">
      </div>
    </div>
    
  
  </div>
  
  `,
})
export class UploadComponent {
  /**
   * The name of the folder for images
   * eg. posts/angular-is-awesome
   */
  folder: string = 'images';

  @Input() link: string;
  @Output() imageKey: string;
  @Output() newUrl = new EventEmitter();
  fileList: FirebaseListObservable<Image[]>;
  imageList: Observable<Image[]>;

  constructor(public af: AngularFire, public router: Router) {
  }

  ngOnInit() {


  }

  ngOnChanges() {
    console.log("new values for folder");
    let storage = firebase.storage();
  }

  /**
   * Upload d'une image
   */
  upload() {
    // Root reference
    let storageRef = firebase.storage().ref();

    let success = false;

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      console.log(selectedFile);
      // Copie des services de this - Sinon ne marche pas
      let router = this.router;
      let af = this.af;
      let folder = this.folder;
      // Création du chemin d'accès
      let path = `/${this.folder}/${selectedFile.name}`;

      // Image reference
      var iRef = storageRef.child(path);

      // Upload de l'image
      iRef.put(selectedFile).then((snapshot) => {

        let key = af.database.list(`/${folder}/images/`).push({path: path, filename: selectedFile.name}).key;

        iRef.getDownloadURL().then( url => {
          this.link = url;
          this.newUrl.next({key : key, url: url});
          success = true;
        });

      });
    }
    return false;
  }

  delete(image: Image) {
    let storagePath = image.path;
    let referencePath = `${this.folder}/images/` + image.$key;

    // Do these as two separate steps so you can still try delete ref if file no longer exists

    // Delete from Storage
    firebase.storage().ref().child(storagePath).delete()
      .then(
        () => {
        },
        (error) => console.error("Error deleting stored file", storagePath)
      );

    // Delete references
    this.af.database.object(referencePath).remove()
  }
}
