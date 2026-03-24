import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth-component/auth-component';
import { AdminEventsList } from './features/admin/events/admin-events-list/admin-events-list';
import { AdminEventsForm } from './features/admin/events/admin-events-form/admin-events-form';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';
import { EventList } from './features/events/event-list/event-list';
import { MyTickets } from './features/tickets/my-tickets/my-tickets';
import { TicketPurchase } from './features/tickets/ticket-purchase/ticket-purchase';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },

  { path: 'home', component: Home, canActivate: [authGuard] },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth', // rota padrão
  },

    //client
  {
    path: 'events',
    component: EventList,
    canActivate: [authGuard],
  },

  {
    path: 'my-tickets',
    component: MyTickets,
    canActivate: [authGuard],
  },

  {
    path: 'tickets/purchase',
    component: TicketPurchase,
    canActivate: [authGuard],
  },

  //admin

{ path: 'admin/events', component: AdminEventsList, canActivate: [authGuard, adminGuard] },
{ path: 'admin/events/new', component: AdminEventsForm, canActivate: [authGuard, adminGuard] },
{ path: 'admin/events/:id/edit', component: AdminEventsForm, canActivate: [authGuard, adminGuard] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
