import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './shared/Login.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './shared/event-bus.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;
  title = 'Cinemark';
  env = environment;
  
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
        this.storageService.clean();
        window.location.reload(); 
  }
}
