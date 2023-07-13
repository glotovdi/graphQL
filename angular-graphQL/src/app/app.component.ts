import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'angular-graphQL';

  constructor(private apollo: Apollo) {}

  public ngOnInit(): void {
    this.graphqlUpdate();
  }

  public update(): void {
    this.graphqlUpdate();
  }

  private graphqlUpdate(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            fact {
              fact
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result.data);
      });
  }
}
