import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) { }

  emailError: null | string = null
  passwordError: null | string = null
  loading: boolean = false

  login(email: string, password: string) {
    this.loading = true;
    this.emailError = null;
    this.passwordError = null;

    this.authenticationService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.error) {
          this.toastr.error(response.message || `Quelque chose s'est mal passé`);
        } else if (response.access_token) {
          this.authenticationService.updateToken(response.access_token);
          this.router.navigate(['']);
        } else {
          this.toastr.error('La connexion a échoué, veuillez réessayer.');
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error(error.error?.message || `Une erreur s'est produite lors de la connexion`);
      }
    });
  }
}
