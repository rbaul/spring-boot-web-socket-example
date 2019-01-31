import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule, 
  MatDialogModule, MatButtonModule, MatTooltipModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
