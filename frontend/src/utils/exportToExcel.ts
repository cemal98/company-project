import * as XLSX from "xlsx";

/**
 * Exports data to an Excel file
 * @param data - The data array to be exported
 * @param fileName - The name of the Excel file
 * @param sheetName - The name of the sheet in the Excel file
 */
export const exportToExcel = (data: any[], fileName: string, sheetName: string = "Sheet1") => {
  if (!data || data.length === 0) return;

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const finalFileName = fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`;


  XLSX.writeFile(workbook, finalFileName);
};
