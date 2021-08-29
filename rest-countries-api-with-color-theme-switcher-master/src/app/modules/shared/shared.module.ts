import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './a-material/material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button/button.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    HeaderComponent,
    ButtonComponent,
  ]
})
export class SharedModule { }
