import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AuthService, TAuthFormValue } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('authForm') authFormRef!: ElementRef<HTMLFormElement>;
  authFormGroup!: FormGroup;
  private _fb = new FormBuilder();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.resetLoginStatus();
    this._initAuthFormGroup();
  }
  ngAfterViewInit() {
    this._observeLoginSubmit();
  }

  private _observeLoginSubmit() {
    const loginSubmit$ = fromEvent(this.authFormRef.nativeElement, 'submit').pipe(
      filter(() => this.authFormGroup.valid),
      map(() => this._authFormValue)
    );
    this._authService.loginSubscribe(loginSubmit$);
  }

  get nameError() {
    return this.authFormGroup.controls.name?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.name?.errors?.required
      ? 'Enter name'
      : '';
  }

  get passwordError() {
    return this.authFormGroup.controls.password?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.password?.errors?.required
      ? 'Enter password'
      : '';
  }

  private get _authFormValue() {
    return this.authFormGroup.value as TAuthFormValue;
  }

  private _initAuthFormGroup() {
    this.authFormGroup = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}