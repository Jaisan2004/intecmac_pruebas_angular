import { Component } from '@angular/core';
import { PqrsService } from '../../services/pqrs.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  data: any;

  constructor(private _pqrsService: PqrsService) {}

  ngOnInit(): void{
    this.getListPqrs()
    }


    getListPqrs(){
      this._pqrsService.getListPqrs().subscribe((data)=>{
        this.data = data
      })
    }
}
