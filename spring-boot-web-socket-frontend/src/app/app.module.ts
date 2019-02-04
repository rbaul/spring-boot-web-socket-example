import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsTableComponent } from './products-table/products-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbarModule,
  MatDialogModule, MatButtonModule, MatTooltipModule, MatInputModule, MatOptionModule,
   MatSelectModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    ProductDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
  entryComponents: [ProductDialogComponent]
})
export class AppModule { }
