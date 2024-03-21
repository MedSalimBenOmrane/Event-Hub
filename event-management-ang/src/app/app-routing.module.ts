import { DummyComponent } from './home/dummy/dummy.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchatticketComponent } from './pages/achatticket/achatticket.component';
import { ListTicketsComponent } from './MesTickets/list-tickets/list-tickets.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { MesEventComponent } from './pages/mes-event/mes-event.component';
import { Error404Component } from './pages/error404/error404.component';
import { LogInSignInComponent } from './login_signin/log-in-sign-in/log-in-sign-in.component';
import { ModifEventComponent } from './pages/modif-event/modif-event.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

const routes: Routes = [
  { path: '', component: AboutusComponent },
  {
    path: 'user', children: [
      { path: '', component: DummyComponent },
      { path: 'home', component: DummyComponent },
      { path: 'tickets', component: ListTicketsComponent },
      { path: 'createEvent', component: CreateEventComponent },
      { path: 'Event', component: MesEventComponent },
      { path: 'achat/:id', component: AchatticketComponent },
      { path: 'modifier/:id', component: ModifEventComponent },
      { path: 'connexion', component: LogInSignInComponent },
    ]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
