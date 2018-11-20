import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Col } from '../models/col';

export type ModifyEvent = {
  index: number;
  row: any;
  callback?: () => void;
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()
  cols: Col[];

  @Input()
  rows: any[];

  @Output()
  editClicked = new EventEmitter<ModifyEvent>();

  @Output()
  saveClicked = new EventEmitter<ModifyEvent>();

  editModeActivated?: number = null;

  rowInEdit: any = null;

  constructor() {}

  ngOnInit() {}

  edit(index: number, row: any) {
    this.editModeActivated = index;
    this.rowInEdit = JSON.parse(JSON.stringify(row));
    this.editClicked.emit({
      index,
      row
    });
  }

  save(index: number, row: any) {
    this.saveClicked.emit({
      index,
      row: this.rowInEdit,
      callback: () => {
        this.editModeActivated = null;
      }
    });
  }
}
