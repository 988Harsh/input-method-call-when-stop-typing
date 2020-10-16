import { Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'input-call-function-after-typing';
  islistening = true;
  @ViewChild('methodTarget', { static: true }) paragraph: ElementRef;

  methodToCall($event) {
    if (this.islistening) {
      this.islistening = false;
      fromEvent($event.target, 'input')
        .pipe(debounceTime(300))
        .subscribe(event => this.someMethod(event));
    }
  }
  someMethod($event) {
    this.islistening = true;
    this.paragraph.nativeElement.textContent = $event.target.value;
  }
}
