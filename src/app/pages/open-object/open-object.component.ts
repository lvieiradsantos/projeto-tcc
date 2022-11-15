import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";

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
  userType: any;
  token: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getActiveId();
    this.getUserId();
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

  getUserId() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.userType = jwt_decode(this.token);
      return this.userType;
    }
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
