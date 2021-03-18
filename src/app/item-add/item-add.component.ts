import { Component, OnInit, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Contact} from '../models/contact-book.models';

declare var $: any;

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  itemform: FormGroup;
  list: any[] = [];
  clickOnCancelBtn = false;
  public event: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.itemform = this.formBuilder.group({
      firstName: [this.list[0].contact ? this.list[0].contact.firstName : '', Validators.required],
      lastName: [this.list[0].contact ? this.list[0].contact.lastName : '', Validators.required],
      phone: this.list[0].contact ? this.list[0].contact.phone : '',
    });
    // $('#phoneid').inputmask('(999) 999-9999', { removeMaskOnSubmit: true });
    console.log(this.list);
  }

  saveToList(form) {
  }

  saveContact() {
    if (this.itemform.value){
      const editMode = this.list[0].editMode;
      let  contact: Contact ;
      if (editMode === 0){
        contact = new Contact();
      } else if (editMode === 1){
        contact = this.list[0].contact;
      }
      contact.firstName = this.itemform.value.firstName;
      contact.lastName = this.itemform.value.lastName;
      contact.phone = this.itemform.value.phone;
      contact.editMode = editMode;
      this.triggerEvent(contact);
      this.bsModalRef.hide();
    }
  }

  triggerEvent(contact: Contact ) {
    this.event.emit(contact);
  }
}
