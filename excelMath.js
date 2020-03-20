'use strict'

const Excel = require('exceljs');

//const filePath = './uploads/Math.xlsx'   NEEDS TO BE PASSED AS ARGUMENT

module.exports = {
    checkMath: function (filePath){
        var cell1;
        var cell2;
        var cell3;
        var workbook = new Excel.Workbook();
        
        workbook.xlsx.readFile(filePath).then(function () {
            var worksheet = workbook.getWorksheet("Sheet1");
            
            worksheet.eachRow(function (row){

                row.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {
                        argb: 'eb4034'
                    }
                }
                
                row.eachCell(function (cell){
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
                        default:
                            console.log('There was an error');
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
                }
            });
            
            return workbook.xlsx.writeFile(filePath);
        });
    }
}
