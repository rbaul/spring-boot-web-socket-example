import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule,
  MatDialogModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent
  ],
  imports: [
    HttpClientModule,
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
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
