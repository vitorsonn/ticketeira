import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Layout } from './layout/layout';
import { Home } from './features/home/home';
import { EventList } from './features/events/event-list/event-list';
import { TicketPurchase } from './features/tickets/ticket-purchase/ticket-purchase';
import { MyTickets } from './features/tickets/my-tickets/my-tickets';
import { AuthComponent } from './features/auth/auth-component/auth-component';
import { RouterModule } from '@angular/router';
import { EventDetails } from './features/events/event-details/event-details';
@NgModule({
    declarations: [App, EventDetails],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthComponent,
        Layout,
        Home,
        EventList,
        TicketPurchase,
        MyTickets,
        RouterModule
    ],
    providers: [
        provideBrowserGlobalErrorListeners(),
    ],
    bootstrap: [App]
})
export class AppModule { }
