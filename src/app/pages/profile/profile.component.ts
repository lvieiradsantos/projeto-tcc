import { Component, OnInit, OnChanges } from '@angular/core';
import { ProfileModel } from 'src/app/model/profile.model';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
        name: [this.profileInfo.name],
        email: [this.profileInfo.email],
        phone: [this.profileInfo.phone],
        type: [this.profileInfo.type],
        country: [this.profileInfo.country],
        ageGroup: [this.profileInfo.ageGroup],
        hearing: [this.profileInfo.hearing]
      })
    })
  }


  sendUpdate() {
    const { name, email, phone, type, country, ageGroup, hearing } = this.updateProfile.value

    const userUpdated = { name, email, phone, type, country, ageGroup, hearing};
    console.log(hearing);

    this.apiService.editUsuario(this.userId, userUpdated).pipe(take(1)).subscribe({
      next: (v) => {
        alert('Alterações feitas com sucesso!')
      }, error: (e) => alert(e.error.message)
    })
  }
}
