import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated!: boolean;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void { }

  logout() {
    this.authService.logout();
  }
}
