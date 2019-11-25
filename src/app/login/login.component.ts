import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  logged = false;
  loading = false;
  user;
  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl()
    });
  }

  onSubmit(formData) {
    this.loading = true;
    this.http.get('https://jsonplaceholder.typicode.com/users?username=' + formData.username).subscribe(
      user => {
        this.user = user;
        console.log(user);
        if (this.user.length > 0) {
          this.logged = true;
          this.openSnackBar('Connecté', 'Cacher');
        } else {
          this.openSnackBar('Erreur', 'Cacher');
        }
        this.loading = false;
      }
    );
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  ngOnInit() {
  }

}
