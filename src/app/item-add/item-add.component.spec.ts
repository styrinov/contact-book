import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAddComponent } from './item-add.component';
import {FormBuilder} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {ContactBookService} from '../services/contact-book.service';
import {Contact} from '../models/contact-book.models';

describe('ItemAddComponent', () => {
  let component: ItemAddComponent;
  let fixture: ComponentFixture<ItemAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAddComponent ],
      providers: [
        FormBuilder,
        BsModalService,
        BsModalRef,
        HttpClient,
        HttpHandler,
        { provide: ContactBookService, useClass: ContactBookService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAddComponent);
    component = fixture.componentInstance;
    const contact: Contact = new Contact();
    component.list = [
      {tag: 'Count', value: 1, contact, editMode: (contact ? 1 : 0)}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
