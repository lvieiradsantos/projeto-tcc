import { Component, OnInit, OnChanges } from '@angular/core';
import { ProfileModel } from 'src/app/model/profile.model';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId: string | any;
  updateProfile: FormGroup | any;
  profileInfo: ProfileModel | any;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.getUserProfile();
  }





  getUserProfile() {
    this.userId = localStorage.getItem('userId');
    this.apiService.getUsuario(this.userId).pipe(take(1)).subscribe(userInfo => {
      this.profileInfo = userInfo;

      this.updateProfile = this.formBuilder.group({
        name: [this.profileInfo.name, [Validators.required, Validators.minLength(5)]],
        email: [this.profileInfo.email, [Validators.required, Validators.email]],
        phone: [this.profileInfo.phone, [Validators.required]],
        type: [this.profileInfo.type, [Validators.required]],
        country: [this.profileInfo.country, [Validators.required]],
        ageGroup: [this.profileInfo.ageGroup, [Validators.required, Validators.maxLength(2)]],
        hearing: [this.profileInfo.hearing, [Validators.required]]
      })
    })
  }


  sendUpdate() {
    const { name, email, phone, type, country, ageGroup, hearing } = this.updateProfile.value

    const userUpdated = { name, email, phone, type, country, ageGroup, hearing };
    console.log(hearing);

    this.apiService.editUsuario(this.userId, userUpdated).pipe(take(1)).subscribe({
      next: (v) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Seus dados foram alterados com sucesso',
          icon: 'success',
          confirmButtonText: 'Fechar'
        })
      }, error: (e) => Swal.fire({
        title: 'Erro',
        text: e.error.message,
        icon: 'error',
        confirmButtonText: 'Fechar'
      })
    })
  }
}
