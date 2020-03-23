'use strict'

const Excel = require('exceljs');

const filePath = 'C:\\Work\\github\\uploads\\Math.xlsx';

function checkMath(filePath){
    var cell1;  
    var cell2;
    var cell3;
    var workbook = new Excel.Workbook();
    //Read xlsx file and use then function to handle promise before executing next step
    workbook.xlsx.readFile(filePath).then(function () {
        var worksheet = workbook.getWorksheet("Sheet1");
        
        //use nested iterator to read cell in rows
        worksheet.eachRow(function (row){

            row.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                    argb: 'eb4034'
                }
            }
            //console.log('row painted');
            
            //second iterator to read data from cells in row
            row.eachCell(function (cell){
                //console.log("Cell Value= " + cell.value + " in column [" + cell.col + "]");

                switch (cell.col){
                    case 1:
                        cell1 = cell;
                        break;
                    case 2: 
                        cell2 = cell;
                        break;
                    case 3: 
                        cell3 = cell;
                        break;
                    case 4:
                        break;
                    default:
                        console.log('There is too much data on this xls file. \nSome cells will not be verified, please check the file.');
                } 
            });  

            //validation
            if(cell3.value === cell1.value + cell2.value){
                row.fill= {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'b9ff9c'
                    }
                }
                //console.log('row validated')
            }
            else{
                row.getCell('D').value = cell1.value + cell2.value;
                console.log('New corrected value: ' + (cell1.value + cell2.value));
            }
        });

        return workbook.xlsx.writeFile(filePath).then(function () {
            console.log("Excel file validated successfully");
        });;
    });
}

checkMath(filePath);