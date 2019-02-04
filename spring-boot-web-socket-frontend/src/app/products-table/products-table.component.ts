import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AutoGenerationService } from '../services/auto-generation.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  private serverUrl = '/product-stomp';

  private stompClient;

  checked = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'price', 'state', 'actions'];

  constructor(
    private dialog: MatDialog,
    private productApiService: ProductService,
    private autoGenerationService: AutoGenerationService
    ) {
      this.connect();
  }

  ngOnInit() {
    this.productApiService.getAllProducts().subscribe(products => {
      this.dataSource.data = products;
    });

    this.autoGenerationService.isAutoGenerate()
    .subscribe(isAutoGenerate => this.checked = isAutoGenerate);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  changed() {
    this.autoGenerationService.updateAutoGenerationFlag(this.checked).subscribe();
  }


  connect() {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function(frame) {
      _this.stompClient.subscribe('/topic/products-updates', (message) => {
        if (message.body) {
          const products: Product[] = JSON.parse(message.body);
          console.log('Received from topic "/topic/products-updates": ', products);
          _this.dataSource.data = products;
        }
      });
      _this.stompClient.subscribe('/topic/product-updates', (message) => {
        if (message.body) {
          const product: Product = JSON.parse(message.body);
          console.log('Received from topic "/topic/product-updates": ', product);
        }
      });

      _this.stompClient.subscribe('/topic/auto-generation-flag', (message) => {
        if (message.body) {
          const isAutoGeneration: boolean = JSON.parse(message.body);
          console.log('Received from topic "/topic/auto-generation-flag": ', isAutoGeneration);
          _this.checked = isAutoGeneration;
        }
      });
    });

  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  openConfirmDialog(): MatDialogRef<ConfirmationDialogComponent> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      message: 'Are you sure to delete this product?',
      okName: 'Delete',
      title: 'Deletion'
    };

    return this.dialog.open(ConfirmationDialogComponent, dialogConfig);
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
          this.productApiService.addProduct(data).subscribe();
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

  deleteProduct(product: Product) {
    this.openConfirmDialog().afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.productApiService.deleteProduct(product.id)
        .subscribe(response => console.log(response));
        }
      }
    );
  }

}
