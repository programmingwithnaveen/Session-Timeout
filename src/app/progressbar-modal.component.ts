import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'progressbar-modal-comp',
  template: `
    <div id="ac90819em1" class="modal-header">
      <h4 id="ac90819h41" class="modal-title">Session Timeout warning</h4>
    </div>
    <div id="ac90819di1" class="modal-body">
      You will be timed out in {{(countMinutes !== 0 ? + countMinutes+' Minute'+(countMinutes > 1 ? 's ' : ' ') : '') + countSeconds+' Seconds'}}
      <p>
        <ngb-progressbar type="danger" [value]="progressCount" [max]="300" animate="false" id="ac90819ou1"
                         class="progress-striped active">
        </ngb-progressbar>
      </p>
    </div>
    <div id="ac90819di2" class="modal-footer">
      <button type="button" id="ac90819bu1" class="btn btn-primary" (click)="continue()">Continue</button>
      <button type="button" id="ac90819bu2" class="btn btn-primary" (click)="logout()">Logout</button>
    </div>
  `
})
export class ProgressBarModalComponent {

  @Input() countMinutes: number;
  @Input() countSeconds: number;
  @Input() progressCount: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  continue() {
    this.activeModal.close(null);
  }

  logout() {
    this.activeModal.close('logout');
  }
}

