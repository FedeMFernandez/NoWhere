import { Component, ViewEncapsulation, Input } from '@angular/core';


@Component({
  selector: 'app-no-content-text-component',
  templateUrl: 'no-content-text.component.html',
  styleUrls: ['no-content-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoContentTextComponent {
  @Input() text = '';
  @Input() color = '';
  @Input() icon = '';
}

