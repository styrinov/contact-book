import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {ContactBookService} from '../services/contact-book.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListComponent ],
      providers: [
        BsModalService,
        BsModalRef,
        HttpClient,
        HttpHandler,
        { provide: ContactBookService, useClass: ContactBookService }
      ],
      imports: [ModalModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
