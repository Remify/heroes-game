import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';
import { Image } from '../../models/image';
/**
 *  Composant pour uploadé une Image
 *  Le module AngularFire2 ne gère pas encore le storage. On va donc faire à la main
 *  Inspiré de : https://gist.github.com/StephenFluin/6c63bb45e76629e79da08d3ac0472834
 */
@Component({
  selector: 'image-upload',
  styleUrls: ['./upload.css'],
  template: `
  <h3><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Ajoutez une image</h3>
  
  
  <div class="row">
    <div class="col-md-6">
    
      <div [hidden]="image.downloadURL">
          <input  class="form-control" id="file" name="file" type="file" (change)="upload()" required>
          <button type="button" class="btn btn-default" (click)="upload()">Upload</button>
      </div>
      
        <div *ngIf="image.downloadURL">
           <div class="alert alert-success">
            <strong>Nice ! </strong> Image uploadé.
          </div>
        </div>
    </div>
      
    <div class="col-md-6 image">
      <div *ngIf="! image.downloadURL">
       <img src="https://placehold.it/300?text=?">
      </div>
      <div *ngIf="image.downloadURL">
       <img [src]="image.downloadURL">
       <button type="button" class="btn btn-danger "(click)="remove()">Supprimer</button>
      </div>
    </div>
    
  
  </div>
  
  `,
})
export class UploadComponent {

  folder: string = 'images';

  @Input() image: Image;
  @Output() newUrl = new EventEmitter();

  constructor(public af: AngularFire, public router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    let storage = firebase.storage();
    console.log(changes);

  }

  /**
   * Upload d'une image
   */
  upload() {
    // Root reference
    let storageRef = firebase.storage().ref();

    let success = false;

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
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

        let key = af.database.list(`/${folder}`).push({ path: path, filename: selectedFile.name }).key;

        iRef.getDownloadURL().then(url => {

          this.image.downloadURL = url;
          this.newUrl.next({
            path: path,
            filename: selectedFile.name,
            downloadURL: url,
            key: key
          });
          success = true;
        });

      });
    }
    return false;
  }

  delete(image: Image) {
    let storagePath = image.path;
    let referencePath = `${this.folder}` + image.key;

    // Delete sur Storage
    firebase.storage().ref().child(storagePath).delete()
      .then(
      () => {
        this.image = {
            path: '',
            filename: '',
            downloadURL: undefined,
            key: undefined
          };
      },
      (error) => console.error("Error deleting stored file", storagePath)
      );

    // Delete la reference
    this.af.database.object(referencePath).remove();
  }

  remove() {
    this.delete(this.image);
  }
}
