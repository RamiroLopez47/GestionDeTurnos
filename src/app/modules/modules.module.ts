import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const MATERIALCOMPONENTS = [

  MatSliderModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatFormFieldModule,
  CommonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
]

@NgModule({
  declarations: [],
  imports: [
    
    MATERIALCOMPONENTS
  ],
  exports:[
    MATERIALCOMPONENTS
  ],
})
export class ModulesModule { }
