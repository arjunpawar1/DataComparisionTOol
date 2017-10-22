import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public file1Value: any;
  public file2Value: any;
  public destiationFileValue: any;

 file1Function(val) {
    this.file1Value = val;
  }

  file2Function(val) {
    this.file2Value = val;
  }

  destinationFileFunction(val) {
    this.destiationFileValue = val;
  }



}
