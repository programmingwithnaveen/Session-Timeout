import { HttpModule } from '@angular/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarModalComponent } from './progressbar-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProgressBarModalComponent]
})
export class AppModule { }
