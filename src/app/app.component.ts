import {ProgressBarModalComponent} from './progressbar-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {Keepalive} from '@ng-idle/keepalive';
import {EventTargetInterruptSource, Idle} from '@ng-idle/core';
import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Session Timeout Demo';
  idleState = 'NOT_STARTED';
  timedOut = false;
  lastPing?: Date = null;
  progressBarPopup: NgbModalRef;

  constructor(private element: ElementRef, private idle: Idle, private keepalive: Keepalive, private ngbModal: NgbModal) {
    // sets an idle timeout of 15 minutes.
    idle.setIdle(600);
    // sets a timeout period of 5 minutes.
    idle.setTimeout(300);
    idle.setInterrupts([new EventTargetInterruptSource(this.element.nativeElement, 'keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll')]);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'NO_LONGER_IDLE';
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'TIMED_OUT';
      this.timedOut = true;
      this.closeProgressForm();

    });
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'IDLE_START', this.openProgressForm(1);
    });
    idle.onTimeoutWarning.subscribe((countdown: any) => {
      this.idleState = 'IDLE_TIME_IN_PROGRESS';

      this.progressBarPopup.componentInstance.count = (Math.floor((countdown - 1) / 60) + 1);
      this.progressBarPopup.componentInstance.progressCount = this.reverseNumber(countdown);
      this.progressBarPopup.componentInstance.countMinutes = (Math.floor(countdown / 60));
      this.progressBarPopup.componentInstance.countSeconds = countdown%60;

    });
    // sets the ping interval to 15 seconds
    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.reset();
  }

  ngOnDestroy() {
    this.resetTimeOut();

  }

  reverseNumber(countdown: number) {
    return (300 - (countdown - 1));
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  openProgressForm(count: number) {
    this.progressBarPopup = this.ngbModal.open(ProgressBarModalComponent, {
      backdrop: 'static',
      keyboard: false
    });
    this.progressBarPopup.componentInstance.count = count;
    this.progressBarPopup.result.then((result: any) => {
      if (result !== '' && 'logout' === result) {
        this.logout();
      } else {
        this.reset();
      }
    });
  }

  logout() {
    this.resetTimeOut();
  }

  closeProgressForm() {
    this.progressBarPopup.close();
  }

  resetTimeOut() {
    this.idle.stop();
    this.idle.onIdleStart.unsubscribe();
    this.idle.onTimeoutWarning.unsubscribe();
    this.idle.onIdleEnd.unsubscribe();
    this.idle.onIdleEnd.unsubscribe();
  }
}
