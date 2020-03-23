'use strict'

const Excel = require('exceljs');

const filePath = 'C:\\Work\\github\\uploads\\Math.xlsx';

function checkMath(filePath){
    var workbook = new Excel.Workbook();
    //Read xlsx file and use then function to handle promise before executing next step
    workbook.xlsx.readFile(filePath).then(function () {
        var worksheet = workbook.getWorksheet("Sheet1");
        var cell1, cell2, cell3, cell4;

        worksheet.addConditionalFormatting({
            ref: 'A1:C6',
            rules: [
                {
                    type: 'expression',
                    formulae:['=$C1=$A1+$B1'],
                    style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'b9ff9c'}}},
                }
            ]
        })

        worksheet.addConditionalFormatting({
            ref: 'A1:C6',
            rules: [
                {
                    type: 'expression',
                    formulae:['=$C1<>$A1+$B1'],
                    style: {fill: {type: 'pattern', pattern: 'solid', bgColor: {argb: 'eb4034'}}},
                }
            ]
        })

        worksheet.eachRow(function (row){
            
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

            //validation
            if(cell3.value === cell1.value + cell2.value){
                cell4 = row.getCell('D');
                cell4.value = "";
            }
            else{
                cell4 = row.getCell('D');
                cell4.value = cell1.value + cell2.value;
                cell4.fill={
                    type: 'pattern',
                    pattern:'solid',
                    fgColor:{argb:'FF8C00'}
                }
                cell4.border={
                    top: {style:'thin'},
                    left: {style:'thin'},
                    bottom: {style:'thin'},
                    right: {style:'thin'}
                }
                console.log('New corrected value: ' + (cell1.value + cell2.value));
            }
        });

        return workbook.xlsx.writeFile(filePath).then(function () {
            console.log("Excel file validated successfully");
        });;
    });
}

checkMath(filePath);