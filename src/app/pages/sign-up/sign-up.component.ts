import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUp: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUp = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      userType: [null, Validators.required],
      compliance: [false, Validators.required]
    })
  }


  sendResgister() {
    const { name, email, password, confirmPassword, userType, compliance } = this.signUp.value

    const user = { name, email, password }

    this.apiService.createUsuario(user).pipe(take(1)).subscribe({
      next: (v) => {
        this.router.navigate(['/login'])
      }, error: (e) => alert(e.error.message)
    })
  }

}
