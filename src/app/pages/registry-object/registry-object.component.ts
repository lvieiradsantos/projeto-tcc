import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { CatalogItemModel } from 'src/app/model/catalog-item.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registry-object',
  templateUrl: './registry-object.component.html',
  styleUrls: ['./registry-object.component.scss']
})
export class RegistryObjectComponent implements OnInit {

  registryItem: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registryItem = this.formBuilder.group({
      name: ['', [Validators.required]],
      model: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      watts: ['', [Validators.required]],
      db: [''],
      file: [''],
      rate: ['', [Validators.required]],
      active: [false]
    })
  }


  sendRegisterItem() {
    let { name, model, brand, watts, db, rate, file } = this.registryItem.value;

    const item = { name, model, brand, db: +db, watts: +watts, rate, file };

    this.apiService.createItem(item).subscribe({
      next: (v) => {
        console.log('next', v);
        Swal.fire({
          title: 'Sucesso',
          text: 'Novo item cadastrado com sucesso',
          icon: 'success',
          confirmButtonText: 'Fechar'
        }).then(()=>{
          this.registryItem.reset();
        })
      }
    })
  }

}
