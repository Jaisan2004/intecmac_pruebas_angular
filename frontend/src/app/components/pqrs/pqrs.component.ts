import { AfterViewChecked, Component } from '@angular/core';
import { PqrsService } from '../../services/pqrs/pqrs.service';
import $ from "jquery";
import jQuery from "jquery";

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  $:any;
  data: any;
  dataTable: any;
  dataTableOptions: any = {
      scrollX: "100%",
      columnDefs: [
        { width: "200px", targets: [2,4,5] },
        { width: "200px", targets: [13] },
        { width: "500px", targets: [9,10] },
        { width: "70px", targets: [3,6,11] }
    ],
      destroy: true,
      language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún usuario encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún usuario encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
  };

  // ngAfterViewChecked() {
  //     this.initDataTable();

  // }

  constructor(private _pqrsService: PqrsService) {}

  ngOnInit(): void{
    this.initDataTable();
    
    }


    getListPqrs(){
      this._pqrsService.getListPqrs().subscribe((data)=>{
        this.data = data
      })
    }
    initDataTable(){
      this.getListPqrs();
      this.$ =$;
      this.dataTable= this.$("#pqrs").DataTable(this.dataTableOptions);
  
    }
}
