import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleQuestion, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { UtilService } from 'src/app/services/util.service';
import { ProfileModel } from 'src/app/model/profile.model';

@Component({
  selector: 'app-open-object',
  templateUrl: './open-object.component.html',
  styleUrls: ['./open-object.component.scss']
})
export class OpenObjectComponent implements OnInit {
  faCircleQuestion = faCircleQuestion;
  itemDetails: any;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faSquareCheck = faSquareCheck;
  user: ProfileModel;
  isLogged: boolean;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilServce: UtilService

  ) { }

  ngOnInit() {
    this.getActiveId();
    this.getUser();
    this.setIsLogged();
  }

  setIsLogged() {
    this.isLogged = this.utilServce.isLogged();
  }

  getActiveId() {
    this.activatedRoute.params
      .pipe(take(1))
      .subscribe(item => {
        const itemId = item['id']
        this.apiService.getItem(itemId).subscribe(item => {
          this.itemDetails = item;
        })
      })
  }

  getUser() {
    this.user = this.utilServce.getDecodedUser();
  }

  acceptItem(itemId) {
    Swal.fire({
      title: 'Você realmente deseja aprovar este item?',
      text: `Os dados do item serão exibidos no catalogo.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, aprovar agora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.editItem(itemId, { active: true }).subscribe({
          next: v => {

            Swal.fire(
              'Item aprovado com sucesso!',
            ).then(() => {
              window.location.reload();
            }
            );
          }
        });
      }
    });
  }



  deleteItem(itemId) {
    Swal.fire({
      title: 'Você realmente deseja deletar este item?',
      text: "Os dados do item serão apagados do nosso sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar agora!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteItem(itemId).subscribe({
          next: v => {
            Swal.fire(
              'Item deletado com sucesso!',
            ).then(() => {
              this.router.navigate(['/']);
            }
            );
          }
        });
      }
    });
  }

}
