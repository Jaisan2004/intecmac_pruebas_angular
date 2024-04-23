import { Component } from '@angular/core';
import * as jQuery from "jquery";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent {

  ngOnInit(): void{
    this.data()
  }

  data(){
     $(document).ready(function() {
      $("#example").DataTable();
    });}

}
