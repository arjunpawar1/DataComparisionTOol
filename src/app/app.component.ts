import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

function s2ab(s: string): ArrayBuffer {
  const buf: ArrayBuffer = new ArrayBuffer(s.length);
  const view: Uint8Array = new Uint8Array(buf);
	for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private destiationFileValue: any;

  data: AOA;

  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'binary' };
  fileName = 'Result.xlsx';

  onFileChange(evt: any, table: AOA) {

    console.log(table);
    console.log(typeof(table));

    /*  wire up file reader */

    const target: DataTransfer = <DataTransfer>(evt.target);
	  if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
			/* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
			const ws: XLSX.WorkSheet = wb.Sheets[wsname];

			/* save data */
      table = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));

      // just return the column Headings

      table = table[0];
      console.log('data');
      console.log(table);
		};
		reader.readAsBinaryString(target.files[0]);
	}

	export(): void {
		/* generate worksheet */
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		const wbout: string = XLSX.write(wb, this.wopts);
		saveAs(new Blob([s2ab(wbout)]), this.fileName);
	}

  destinationFileFunction(val) {
    this.destiationFileValue = val;
  }
}
