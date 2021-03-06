import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorComponent } from './error.component';

@Injectable()
export class ErrorHandlerService {
  error$$ = new ReplaySubject<Error>();
  constructor(private matSnackBar: MatSnackBar) {
    this.error$$.subscribe((error) => {
      this.matSnackBar.openFromComponent(ErrorComponent, {
        duration: 5000,
      });
    });
  }
}
