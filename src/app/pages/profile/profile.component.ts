import { Component, OnInit } from '@angular/core';
import { ProfileModel } from 'src/app/model/profile.model';
import { take } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateProfile: FormGroup | any;
  profileInfo: ProfileModel | any;

  faAddressCard = faAddressCard;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.apiService.getUsuario(this.utilService.getDecodedUser().id).pipe(take(1)).subscribe(userInfo => {
      this.profileInfo = userInfo;

      this.updateProfile = this.formBuilder.group({
        name: [this.profileInfo.name, [Validators.required, Validators.minLength(5)]],
        email: [this.profileInfo.email, [Validators.required, Validators.email]],
        phone: [this.profileInfo.phone],
        type: [this.profileInfo.type],
        country: [this.profileInfo.country],
        ageGroup: [this.profileInfo.ageGroup, [Validators.maxLength(2)]],
        hearing: [this.profileInfo.hearing, [Validators.required]]
      })
    })
  }

  sendUpdate() {
    const { name, email, phone, type, country, ageGroup, hearing } = this.updateProfile.value

    const userUpdated = { name, email, phone, type, country, ageGroup, hearing };
    this.apiService.editUsuario(this.utilService.getDecodedUser().id, userUpdated).pipe(take(1)).subscribe({
      next: (v) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Seus dados foram alterados com sucesso',
          icon: 'success',
          confirmButtonText: 'Fechar'
        })
      }
    })
  }

  deleteProfileUser() {
    Swal.fire({
      title: 'Você realmente deseja deletar este usuário?',
      text: "Seus dados serão apagado do nosso sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar agora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteUser(this.utilService.getDecodedUser().id).subscribe(
          {
            next: (v) => {
              Swal.fire(
                'Usuário deletado com sucesso!',
              ).then(() => {
                this.utilService.logout();
              }
              )
            }
          })
      }
    })
  }
}
