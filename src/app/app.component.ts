import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, AfterViewInit  {
  title = 'contact-book';

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    // $('button').click(function() {
    //   alert('Wass up!');
    // });

    $('#inputmaskid').inputmask('(999) 999-9999');
  }

  // tslint:disable-next-line:typedef
  ngAfterViewInit() {

  }

}
