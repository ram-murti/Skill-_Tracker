import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.css']
})
export class ModalTestComponent implements OnInit {
  display='none';


  constructor() { }

  ngOnInit() {
  }

  openModal()
  {
    this.display='block';
  }

  onCloseHandled()
  {
    this.display='none';
  }
}
