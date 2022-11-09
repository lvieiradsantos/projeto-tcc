import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      userType: ['', [Validators.required]],
      termsAccepted: [false, [Validators.required]]
    })
  }


  sendResgister() {
    const { name, email, password, type, termsAccepted } = this.signUp.value

    const user = { name, email, password, type, termsAccepted }

    this.apiService.createUsuario(user).pipe(take(1)).subscribe({
      next: (v) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário cadastrado com sucesso',
          icon: 'success',
          confirmButtonText: 'Fechar'
        }).then(() =>
          this.router.navigate(['/login']))
      }
    })
  }
}
