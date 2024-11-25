import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedInNavbar: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loggedInNavbar = this.auth.isLoggedIn();
  }
  onClickSair() {
    this.auth.logout();
    this.router.navigate(['login'])
    this.loggedInNavbar = false;
  }
}
