import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [ { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.get(HttpTestingController);
    component.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl()
    });
    component.loginForm.username = 'Bret';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('good init', () => {
    expect(component.logged).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });
  it('connection working', () => {
    expect(component.logged).toBeFalsy();
    expect(component.loginForm.username).toEqual('Bret');

    component.onSubmit(component.loginForm);
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/users?username=' + component.loginForm.username);
    req.flush([{username: 'test'}]);
    httpTestingController.verify();
    expect(component.logged).toBeTruthy();
  });

});
