import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ProductsTableDataSource } from './products-table-datasource';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ProductsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'price', 'state'];

  constructor(private productApiService: ProductService) {
  }

  ngOnInit() {
    this.dataSource = new ProductsTableDataSource(this.productApiService, this.paginator, this.sort);
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

}
