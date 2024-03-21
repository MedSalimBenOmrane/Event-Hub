import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  isLoggedIn = false

  ngOnInit(): void {
    this.authenticationService.authenticated.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn
    })
  }

  logout() {
    this.authenticationService.logout()
    this.router.navigate(['/login'])
  }
}
