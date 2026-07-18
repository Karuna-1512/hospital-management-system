import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPatientsToExcel = (patients) => {
  const worksheet = XLSX.utils.json_to_sheet(patients);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Patients");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, "Patients_Report.xlsx");
};

export const exportPatientsToPDF = (patients) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Patient Report", 14, 20);

  autoTable(doc, {
    head: [["ID", "Name", "Age", "Gender", "Phone"]],
    body: patients.map((p) => [
      p.id,
      p.name,
      p.age,
      p.gender,
      p.phone,
    ]),
    startY: 30,
  });

  doc.save("Patients_Report.pdf");
};