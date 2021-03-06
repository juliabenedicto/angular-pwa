import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/image.interface';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  image!: Image;

  constructor(
    private imagesService: ImagesService,
    // to read parameter from url
    private activatedRoute: ActivatedRoute,
    // to redirect the user of this view if we don't have a valid identifier
    private router: Router
    ) { }


    ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier -->', identifier);

    if (identifier){
    this.imagesService.getImageById(identifier).subscribe((image) => {
      if(!image){
        this.router.navigateByUrl('/');
      }
      this.image = image || null;
      console.log('Image -->', this.image);
    });
  }
}};
