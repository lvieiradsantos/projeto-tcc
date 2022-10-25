import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })

    this.token = localStorage.getItem('token');
  }

  sendLogin() {
    const { email, password } = this.loginForm.value;

    this.apiService.login(email, password).subscribe((response) => {
      console.log('Pronto');
    })
  }

}
