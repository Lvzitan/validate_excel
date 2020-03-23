'use strict'

const Excel = require('exceljs');

const filePath = 'C:\\Work\\github\\uploads\\Math.xlsx';

function checkMath(filePath){
    var workbook = new Excel.Workbook();
    //Read xlsx file and use then function to handle promise before executing next step
    workbook.xlsx.readFile(filePath).then(function () {
        var worksheet = workbook.getWorksheet("Sheet1");
        
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
        


        return workbook.xlsx.writeFile(filePath).then(function () {
            console.log("Excel file validated successfully");
        });;
    });
}

checkMath(filePath);