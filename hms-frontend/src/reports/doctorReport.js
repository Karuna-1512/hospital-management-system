import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportDoctorsToExcel = (doctors) => {
  const worksheet = XLSX.utils.json_to_sheet(doctors);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }),
    "Doctors_Report.xlsx"
  );
};

export const exportDoctorsToPDF = (doctors) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Doctor Report", 14, 20);

  autoTable(doc, {
    head: [["ID", "Name", "Specialization", "Experience", "Phone"]],
    body: doctors.map((d) => [
      d.id,
      d.name,
      d.specialization,
      d.experience,
      d.phone,
    ]),
    startY: 30,
  });

  doc.save("Doctors_Report.pdf");
};