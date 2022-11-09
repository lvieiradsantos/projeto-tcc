import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.token = localStorage.getItem('token');
  }

  sendLogin() {
    const { email, password } = this.loginForm.value;

    this.apiService.login(email, password).subscribe({

      next: (v) => {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        })
      },
      error: (e) => alert(e.error.message)
    })
  }
}
