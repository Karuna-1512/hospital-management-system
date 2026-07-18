import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportBillsToExcel = (bills) => {
  const worksheet = XLSX.utils.json_to_sheet(bills);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Billing");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }),
    "Billing_Report.xlsx"
  );
};

export const exportBillsToPDF = (bills) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Billing Report", 14, 20);

  autoTable(doc, {
    head: [["ID", "Patient", "Doctor", "Total", "Status"]],
    body: bills.map((b) => [
      b.id,
      b.patient,
      b.doctor,
      `₹${b.total}`,
      b.status,
    ]),
    startY: 30,
  });

  doc.save("Billing_Report.pdf");
};