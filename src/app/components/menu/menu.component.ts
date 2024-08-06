import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  private auth$ = inject(AuthService);
  router = inject(Router);

  toggleF: boolean = true;
  user: any;
  userId: any;

  constructor() {}

  endSession() {
    this.auth$.signOutSession();
    this.router.navigate(['/home']);
  }

  private getUserId() {
    const storedData = localStorage.getItem('whentheuserislogged');
    const parsedData = JSON.parse(storedData);
    if (parsedData != null) {
      this.userId = parsedData.userId;
    } else {
      this.userId = '';
    }
  }


  ngOnInit(): void {
    this.getUserId();
    //this.loadUser();

    this.auth$.isAuthenticated.subscribe((isAuthenticated) => {
      this.toggleF = !isAuthenticated;
    });
  }

}
