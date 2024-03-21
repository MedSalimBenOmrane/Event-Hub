import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './components/events/events.component';
import { CreatorsComponent } from './pages/creators/creators.component';
import { SellpointsComponent } from './pages/sellpoints/sellpoints.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapCupStraw,
  bootstrapPersonFillSlash,
  bootstrapWatch,
} from '@ng-icons/bootstrap-icons';
import { AuthenticateGuard } from './services/guards/authenticate.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    EventsComponent,
    CreatorsComponent,
    SellpointsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      bootstrapCupStraw,
      bootstrapPersonFillSlash,
      bootstrapWatch,
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [AuthenticateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
