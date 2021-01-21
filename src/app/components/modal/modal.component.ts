import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GestionServiceService } from 'src/app/services/gestion-service.service';
import { TablaComponent } from '../tabla/tabla.component';
import { ISala } from '../../interfaces/ISala';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IReserva } from 'src/app/interfaces/IReserva';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public indRes : number = null;
  public titulo: string = "Nueva Reserva"
  public salaDef : ISala ={
              id:null,
    nombreDeSala:null,
        reservas: []
   };

   public resDef : IReserva = {  
         id:null,
    persona:null,
        dni:null,
      fecha:null
  }
   public formReserva: FormGroup;

   public minDate = new Date(Date.now());
   public fechaHoyParseada : string = this.minDate.toISOString().trim().substring(0,16);

  constructor(private servicios:GestionServiceService,
              public dialogRef: MatDialogRef<TablaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any){ 

                if (data) {                  
                  this.salaDef = JSON.parse(JSON.stringify(data['salaInfo']));                  
                  this.resDef = JSON.parse(JSON.stringify(data['reservaInfo']));              
                  this.indRes = JSON.parse(JSON.stringify(data['posicionAct']));
                  if (this.resDef.id >=0){
                    this.titulo = "Editar Reserva"
                  }
                  console.log(this.salaDef,"salaDef con data");
                }
                console.log(this.salaDef,"salaDEF");
                console.log(this.salaDef.reservas,"this.salaDef.reservas");
                
                this.crearFormulario();

              }

  ngOnInit(): void {    
console.log("NUMBER mindate",Number(this.minDate));
  }

  crearFormulario(): void {
    this.formReserva = new FormGroup({
      'persona'    : new FormControl(this.resDef.persona,[Validators.required, Validators.minLength(7), Validators.maxLength(20),Validators.pattern('[a-zA-Z ]*')]),
      'dni'        : new FormControl(this.resDef.dni,    [Validators.required, Validators.pattern('[0-9]{7,8}')]),
      'fecha'      : new FormControl(this.resDef.fecha,  [Validators.required])
    })}
      

    //Comprueba si se trata de adición o de actualización

    public guardarCambios() {

      if(this.formReserva.valid){
        if (this.resDef.id >= 0) {

          this.actualizar();

        } else {

          this.crearNueva();

        }
        this.dialogRef.close();
      }else{
        alert("Oops! Algo salió mal ")
      }
    }    

    public crearNueva(){
      this.salaDef.reservas.push(this.formReserva.value);
      this.servicios.put(this.salaDef.id,this.salaDef).subscribe(()=>{
        console.log("Creando Nueva");
      })

    }

    public actualizar(){
      this.salaDef.reservas.splice(this.indRes,1);
      this.salaDef.reservas.push(this.formReserva.value);
      this.servicios.put(this.salaDef.id,this.salaDef).subscribe(()=>{
        console.log("Actualizando");
      })
    }

    verDatos(){
      console.log("data -->", this.formReserva.value);
    }


  onNoClick(): void {
    this.dialogRef.close();
  }
}