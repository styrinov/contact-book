import {Component, OnDestroy, OnInit} from '@angular/core';
import { BsModalRef, BsModalService } from  'ngx-bootstrap/modal/';
import { ItemAddComponent } from '../item-add/item-add.component';
import {Contact} from '../models/contact-book.models';
import {Subscription} from 'rxjs';
import {ContactBookService} from '../services/contact-book.service';
import {environment} from '../../environments/environment';
import {mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  contactBooks: Contact[];
  isHowInfo: boolean = false;
  isHowInfoMsg: string = '';
  isHowInfo2: boolean = false;
  isHowInfoMsg2: string = '';

  constructor(private modalService: BsModalService,
              private contactBookService: ContactBookService ) { }

  ngOnInit(): void  {
    // this.subscription1 = this.contactBookService.getTestContactBook().subscribe((data: Contact[]) => {
    //   this.contactBooks = data;
    // }, error => {
    //   console.log(error);
    // });

    this.isHowInfo = false;
    this.isHowInfoMsg = '';
    this.isHowInfo2 = false;
    this.isHowInfoMsg2 = '';

    this.subscription1 = this.contactBookService.getContactBooks().subscribe((data: Contact[]) => {
      this.contactBooks = data;
    }, error => {
      console.log(error);
      this.isHowInfo = true;
      this.isHowInfoMsg = error.message + '( ' +  error.status + ' )';
      setTimeout(() => {
        this.isHowInfo = false;
        this.isHowInfoMsg = '';
      }, 5000);
    });

  }

  ngOnDestroy(): void {
    if (this.subscription1)  this.subscription1.unsubscribe();
    if (this.subscription2)  this.subscription2.unsubscribe();
    if (this.subscription3)  this.subscription3.unsubscribe();
    if (this.subscription4)  this.subscription4.unsubscribe();
  }

  openModalWithComponent(contact: Contact) {
    const initialState = {
      list: [
        {tag: 'Count', value: this.contactBooks.length, contact, editMode: (contact ? 1 : 0)}
      ]
    };
    this.bsModalRef = this.modalService.show(ItemAddComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.event.subscribe((con: Contact ) => {
      if (environment.isDebugMode) {
        if (!con.id){
          con.id = Math.floor(Math.random() * 100);
        }
        if (con.editMode === 0){
          this.contactBooks.push(con);
        } else if (con.editMode === 1){
          const filteredVal = this.contactBooks.filter( (cont: Contact ) => cont.id !== con.id );
          // @ts-ignore
          filteredVal.push(con);
          this.contactBooks = filteredVal;
        }
      } else {
        if (con.editMode === 0){
          this.doActionAddContact(con);
        } else if (con.editMode === 1){
          this.doActionEditContact(con);
        }
      }
    });
  }

  doActionAddContact(cont: Contact ) {
    const result  = this.contactBookService.addContact(cont).pipe(
      tap((data: any) => console.log('New item = ', data)),
      mergeMap((data: any) => {
        return this.contactBookService.getContactBooks();
      })
    );

    this.subscription2 = result.subscribe((data: Contact[]) => {
      this.contactBooks = data;
    }, error => {
      console.log(error);
      this.isHowInfo = true;
      this.isHowInfoMsg = error.message + '( ' +  error.status + ' )';
      setTimeout(() => {
        this.isHowInfo = false;
        this.isHowInfoMsg = '';
      }, 5000);
    });
  }

  doActionEditContact(cont: Contact ) {
    const result  = this.contactBookService.editContact(cont.id, cont).pipe(
      tap((data: any) => console.log('Edit item = ', data)),
      mergeMap((data: any) => {
        return this.contactBookService.getContactBooks();
      })
    );

    this.subscription4 = result.subscribe((data: Contact[]) => {
      this.contactBooks = data;
    }, error => {
      console.log(error);
      this.isHowInfo = true;
      this.isHowInfoMsg = error.message + '( ' +  error.status + ' )';
      setTimeout(() => {
        this.isHowInfo = false;
        this.isHowInfoMsg = '';
      }, 5000);
    });
  }

  editeContact(contact: Contact) {
    this.openModalWithComponent(contact);
  }

  deleteContact(id: number) {
    if (environment.isDebugMode) {
      const filteredVal = this.contactBooks.filter( (cont: Contact ) => cont.id !== id );
      this.contactBooks = filteredVal;
    } else {
      const result  = this.contactBookService.deletedContact(id).pipe(
        tap((data: any) => console.log('Deleted item = ', data)),
        mergeMap((data: any) => {
          return this.contactBookService.getContactBooks();
        })
      );
      this.subscription3 = result.subscribe((data: Contact[]) => {
        this.contactBooks = data;
      }, error => {
        console.log(error);
        this.isHowInfo = true;
        this.isHowInfoMsg = error.message + '( ' +  error.status + ' )';
        setTimeout(() => {
          this.isHowInfo = false;
          this.isHowInfoMsg = '';
        }, 5000);
      });
    }
  }
}
