import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { INote } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: INote[] = [];
  private notesSubject = new BehaviorSubject<INote[]>([]);
  private isEdit = new BehaviorSubject<boolean>(false);

  constructor() {}

  getEditable() {
    return this.isEdit.asObservable();
  }

  setEditable(newValue: boolean) {
    this.isEdit.next(newValue);
  }

  getNotesObservable(): Observable<INote[]> {
    return this.notesSubject.asObservable();
  }

  createNote(note: INote): void {
    note.id = new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: INote) {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);

    if (index !== -1) {
      this.notes[index] = updatedNote;
      this.notesSubject.next(this.notes);
    }
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter((note) => note.id !== id);

    this.notesSubject.next(this.notes);
  }
}
