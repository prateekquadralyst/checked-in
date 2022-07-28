import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-post-upload',
  templateUrl: './post-upload.component.html',
  styleUrls: ['./post-upload.component.scss'],
})
export class PostUploadComponent implements OnInit {

  constructor(
    private routerService: NavigationService,
  ) { }

  ngOnInit() {}


  public navigateTo(url: string): void {
    this.routerService.navigateTo(url);
  }
  public backTo(): void {
    this.routerService.backTo();
  }

}
