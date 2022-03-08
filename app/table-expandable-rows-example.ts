import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { TableService } from './table-service';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['table-expandable-rows-example.css'],
  templateUrl: 'table-expandable-rows-example.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TableExpandableRowsExample {
  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;

  data: User[] = USERS;

  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = [
    'Id',
    'Username',
    'Gender',
    'DateOfBirth',
    'KnownAs',
    'Created',
    'LastActive',
    'City',
    'Country'
  ];
  innerDisplayedColumns = ['Id', 'Username', 'City', 'Country'];
  innerInnerDisplayedColumns = ['comment', 'commentStatus'];
  expandedElement: User | null;
  expandedElements: any[] = [];
  leftPanelDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  usersdataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private cd: ChangeDetectorRef,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.tableService.getData().subscribe(res => {
      if (res.length == 0) {
        this.leftPanelDataSource = new MatTableDataSource();
      } else {
        console.log(res);
        this.leftPanelDataSource = new MatTableDataSource(res);
      }
    });
  }

  getProjectDetails(element: any) {
    //console.log(element);
    this.tableService.getInnerData(element.Id).subscribe(res => {
      if (res.length == 0) {
        element['innerDatasource'] = new MatTableDataSource();
      } else {
        console.log(res);
        element['innerDatasource'] = new MatTableDataSource(res);
      }
    });
  }
}

export interface User {
  name: string;
  email: string;
  phone: string;
  addresses?: Address[] | MatTableDataSource<Address>;
}

export interface Comment {
  commenID: number;
  comment: string;
  commentStatus: string;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
  comments?: Comment[] | MatTableDataSource<Comment>;
}

const USERS: User[] = [
  {
    name: 'Mason',
    email: 'mason@test.com',
    phone: '9864785214',
    addresses: [
      {
        street: 'Street 1',
        zipCode: '78542',
        city: 'Kansas',
        comments: [
          {
            commenID: 1,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 2,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 3,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      },
      {
        street: 'Street 2',
        zipCode: '78554',
        city: 'Texas',
        comments: [
          {
            commenID: 4,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 5,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 6,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      }
    ]
  },
  {
    name: 'Eugene',
    email: 'eugene@test.com',
    phone: '8786541234',
    addresses: [
      {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Utah',
        comments: [
          {
            commenID: 7,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 8,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 9,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      },
      {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Ohio',
        comments: [
          {
            commenID: 19,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 11,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 12,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      }
    ]
  },
  {
    name: 'Jason',
    email: 'jason@test.com',
    phone: '7856452187',
    addresses: [
      {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Utah',
        comments: [
          {
            commenID: 13,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 14,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 15,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      },
      {
        street: 'Street 5',
        zipCode: '23547',
        city: 'Ohio',
        comments: [
          {
            commenID: 16,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 17,
            comment: 'Test',
            commentStatus: 'Open'
          },
          {
            commenID: 18,
            comment: 'Test',
            commentStatus: 'Closed'
          }
        ]
      }
    ]
  }
];

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
