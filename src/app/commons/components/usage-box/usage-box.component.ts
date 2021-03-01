import { TimerModel } from './../../models/timer.model';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-usage-box-component',
  templateUrl: './usage-box.component.html',
  styleUrls: ['./usage-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsageBoxComponent {

  @Input() timer = new TimerModel();

  constructor(
    private domSantizer: DomSanitizer
  ) { }

  safeUrl(url: string): string {
    // tslint:disable-next-line: no-string-literal
    return this.domSantizer.bypassSecurityTrustUrl(url)['changingThisBreaksApplicationSecurity'];
  }
}
