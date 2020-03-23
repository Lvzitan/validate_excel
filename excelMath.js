'use strict'

const Excel = require('exceljs');

module.exports = {
    checkMath: function (filePath){
        var workbook = new Excel.Workbook();
        //Read xlsx file and use then function to handle promise before executing next step
        workbook.xlsx.readFile(filePath).then(function () {
            var worksheet = workbook.getWorksheet("Sheet1");
            var cell1, cell2, cell3, cell4;

            worksheet.addConditionalFormatting({
                ref: 'A:C',
                rules: [
                    {
                        type: 'expression',
                        formulae:['=AND($C1=$A1+$B1, ISNUMBER($A1:$C1))'],
                        style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'b9ff9c'}}},
                    }
                ]
            })

            worksheet.addConditionalFormatting({
                ref: 'A:C',
                rules: [
                    {
                        type: 'expression',
                        formulae:['=AND($C1<>$A1+$B1, ISNUMBER($A1:$C1))'],
                        style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'eb4034'}}},
                    }
                ]
            })

            worksheet.addConditionalFormatting({
                ref: 'D:D',
                rules: [
                    {
                        type: 'expression',
                        formulae:['=AND($C1<>$A1+$B1, ISNUMBER($A1:$C1))'],
                        style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'FFA500'}}},
                    }
                ]
            })

            worksheet.eachRow(function (row){
                cell4 = row.getCell('D');

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
                        case 4:
                            break;
                        default:
                            console.log('There is too much data on this xls file. \nSome cells will not be verified, please check the file.');
                    } 
                });  

                if(cell3.value === cell1.value + cell2.value){
                    cell4.value = "";
                }
                else{
                    if(typeof cell1.value == 'number' && typeof cell2.value == 'number'){
                        cell4.value = cell1.value + cell2.value;
                    }
                }
            });

            return workbook.xlsx.writeFile(filePath).then(function () {
                console.log("Excel file validated successfully");
            });;
        });
    }
}
