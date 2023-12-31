import { Component } from '@angular/core';
import { INote } from './interfaces/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedNote!: INote;

  selectNote(selectedNote: INote) {
    this.selectedNote = selectedNote;
  }
}
