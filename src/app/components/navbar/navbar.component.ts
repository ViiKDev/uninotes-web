import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  loggedInNavbar: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngAfterViewInit(): void {
    this.loggedInNavbar = this.auth.isLoggedIn();
  }

  onClickSair(): void {
    this.auth.logout();
    this.loggedInNavbar = false; 
    this.router.navigate(['login']); 
  }
}
