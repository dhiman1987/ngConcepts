import { Component} from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor() { }

  header:any = [];
  data:any =[];
  progress : number = 0;

  fileChange(event){
    let files: FileList = event.target.files;
		if(files.length>0){
      let file:File = files[0];
      if(file.size>5242880){
        alert('File cannot be more than 5 MB');
        return;
      }
      console.log(file);
      let fileReader = new FileReader();
      fileReader.onload = (e:any) => {
       // console.log(fileReader.result);
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      if(this.data){
        this.header = this.data.shift();
      }
      };
      fileReader.readAsBinaryString(file);

    }
  }
}
