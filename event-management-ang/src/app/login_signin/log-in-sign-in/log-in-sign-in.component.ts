import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-sign-in',
  templateUrl: './log-in-sign-in.component.html',
  styleUrls: ['./log-in-sign-in.component.css']
})
export class LogInSignInComponent implements OnInit {
  isActive: any;
  emailError: null | string = null;
  passwordError: null | string = null;
  loading: boolean = false;

  constructor(
    private toggleService: ToggleService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toggleService.isLoginActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  isCinInvalid(cin: number): boolean {
    const cinString = cin.toString();
    return cinString.length !== 8;
  }

  login(email: string, password: string) {
    this.loading = true;
    this.emailError = null;
    this.passwordError = null;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.error) {
          this.toastr.error(response.message || `Quelque chose s'est mal passé`);
        } else if (response.access_token) {
          this.authService.updateToken(response.access_token);
          this.router.navigate(['/user/home']);
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

  toggleLogin() {
    this.toggleService.toggleLogin();
  }

  signUp(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const participantData = {
      email: form.value.email,
      firstname: form.value.firstname,
      name: form.value.name,
      phoneNumber: form.value.phone,
      cin: form.value.cin,
      password: form.value.password,
    };

    this.authService.signUp(participantData).subscribe(
      response => {
        this.toastr.success('Utilisateur inscrit avec succès !');
        this.toggleLogin();
      },
      error => {
        this.toastr.error(`Erreur lors de l’inscription. L'email existe déjà!`);
      }
    );
  }
}
