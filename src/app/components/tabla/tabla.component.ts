import {OnInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { GestionServiceService } from '../../services/gestion-service.service';
import { ISala } from '../../interfaces/ISala';
import { IReserva } from '../../interfaces/IReserva';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  displayedColumns: string[] = ['fecha',  'horaReserva','nombre', 'dni'];
  public dataSource: MatTableDataSource<ISala> = new MatTableDataSource();
  public dataSource2: MatTableDataSource<IReserva> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  public posDef:number =null;
  public resDef : IReserva = {  
    persona:null,
    dni:null,
    fecha:null
  }

  public salaSeleccionada :ISala = {
    status:null,
    id:null,
    nombreDeSala:'',
    reservas: []
  }
  public agregarSala : boolean = false;
  public renameSala  : boolean = false;
  constructor(public dialog: MatDialog,
              private servicios:GestionServiceService,
              ){}

  ngOnInit() {
    //Cargar datos de Salas
    this.obtenerElementos();

    //Servicio atento a los cambios
    this.servicios.getActualizar().subscribe(()=>{
      this.obtenerElementos();
      if(this.salaSeleccionada.id){
      this.verReservas(this.salaSeleccionada.id);}
    });


    //Configuración del filtro
    this.dataSource2.filterPredicate =
      (data: IReserva, filter: string) =>
        data.persona.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) != -1 ||
        data.dni.toString().toLowerCase().trim().indexOf(filter.toLowerCase().trim()) != -1 ||
        data.fecha.toString().toLowerCase().trim().indexOf(filter.toLowerCase().trim()) != -1;


       } 


  obtenerElementos(){
    //Carga las salas
    this.servicios.getAll(0,1000).subscribe(data => { 
      this.dataSource.data = data;
    });
  } 

  //Trae las reservas con status verdadero
  verReservas(id:number){
    this.servicios.getOne(id).subscribe(data =>{      
      this.dataSource2.data = data.reservas;
      this.dataSource2.sort = this.sort;      
    })      
  }
  

  //Selecciona una sala para operar con ella
setSala(sala: ISala){
  console.log("SalaSeteada",sala);
  this.agregarSala = false;
  this.salaSeleccionada.status = sala.status;
  this.salaSeleccionada.id = sala.id;
  this.salaSeleccionada.nombreDeSala = sala.nombreDeSala;
  this.salaSeleccionada.reservas = sala.reservas;
}


//Abre el modal y le pasa información
openModal(sala: ISala, reserva: IReserva, pos:number) {
  this.salaSeleccionada = sala;
  const dialogRef = this.dialog.open(ModalComponent, {   
    data: {'salaInfo':sala, 'reservaInfo':reserva, 'posicionAct':pos}

  });
  //Acciones al cerrar el modal
  dialogRef.afterClosed().subscribe(() => {
    
    this.dataSource.data.map(res=>{
      if(res.id === this.salaSeleccionada.id){
        this.setSala(res);
      }
    })

  });
}

borrarReserva(posicion: number):void{
 this.salaSeleccionada.reservas.splice(posicion,1);

 this.servicios.put(this.salaSeleccionada.id,this.salaSeleccionada).subscribe(()=>
 this.verReservas(this.salaSeleccionada.id));
  
}


borrarSala(id:number):void{
  const opcion = confirm('¿Desea eliminar esta sala?');
    if (opcion === true) {
  this.servicios.delete(id).subscribe(() => {
    this.salaSeleccionada.id=null;
  }, (error) => {
    console.log(error);
  }
  );}
}

crearSala(nombreSala:String):void{
  if(nombreSala.length > 0){
  let duplicado: boolean;
let nuevaSala: ISala ={
  nombreDeSala : nombreSala,
  reservas : []
}

  this.dataSource.data.map(res=>{
  if(res.nombreDeSala === nombreSala)
  duplicado = true; });

  
    if(duplicado){
    alert("Ya existe una sala con ese nombre."); 
  }else {
    this.servicios.post(nuevaSala).subscribe(() => {   
    this.agregarSala = false;
    }, (error) => {
      console.log(error);
    });
  
}
}
else{
  alert("Ingrese un nombre.")
}

}

renombrarSala (nuevoNombre : String):void{
  this.salaSeleccionada.nombreDeSala = nuevoNombre;

  this.servicios.put(this.salaSeleccionada.id,this.salaSeleccionada).subscribe(()=>{
    this.renameSala = false;
  }, (error)=>{
    console.log(error);
  })
}

public filtrar(valorFiltro: string) {
  valorFiltro = valorFiltro.trim(); // Remueve espacios en blanco
  valorFiltro = valorFiltro.toLowerCase(); // Convierte a minusculas
  this.dataSource2.filter = valorFiltro;
}

  }
  



