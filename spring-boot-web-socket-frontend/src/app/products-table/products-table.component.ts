import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'price', 'state'];

  constructor(
    private dialog: MatDialog,
    private productApiService: ProductService) {
  }

  ngOnInit() {
      this.productApiService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  openProductDialog(productData: Product): MatDialogRef<ProductDialogComponent> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = productData;

    return this.dialog.open(ProductDialogComponent, dialogConfig);
  }

  createProduct() {
    this.openProductDialog(new Product()).afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.productApiService.addProduct(data)
          .subscribe(response => console.log(response));
        }
      }
    );
  }

  editProduct(product: Product) {
    this.openProductDialog(product).afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.productApiService.updateProduct(product.id, data)
        .subscribe(response => console.log(response));
        }
      }
    );
  }
}
