import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INote } from 'src/app/interfaces/note';

import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnChanges, OnInit {
  @Input() selectedNote!: INote;

  noteForm!: FormGroup;
  isEdit!: boolean;

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    this.noteService.getEditable().subscribe((response) => {
      this.isEdit = response;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedNote']?.currentValue) {
      const newSelectedNoteValue = changes['selectedNote'].currentValue;

      this.noteForm.patchValue({
        id: newSelectedNoteValue.id,
        title: newSelectedNoteValue.title,
        content: newSelectedNoteValue.content,
      });
    }
  }

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      id: 1,
      title: ['', Validators.required],
      content: [''],
    });
  }

  onSubmit() {
    console.log('note form :: on submit');

    if (this.noteForm.valid) {
      const note: INote = this.noteForm.value;
      console.log('note :: ', note);

      if (this.isEdit) {
        this.noteService.updateNote(note);
        this.noteService.setEditable(false);
      } else {
        this.noteService.createNote(note);
      }

      this.noteForm.reset();
    }
  }
}
