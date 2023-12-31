import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { NoteService } from 'src/app/services/note.service';

import { INote } from 'src/app/interfaces/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit {
  notes: INote[] = [];
  @Output() selectedNote = new EventEmitter<INote>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotesObservable().subscribe((notes) => {
      this.notes = notes;
      console.log('subscriber :: notes ', notes);
    });
  }

  editNote(note: INote): void {
    this.selectedNote.emit(note);
    this.noteService.setEditable(true);
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
  }
}
