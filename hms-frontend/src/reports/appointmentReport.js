import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportAppointmentsToExcel = (appointments) => {
  const worksheet = XLSX.utils.json_to_sheet(appointments);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }),
    "Appointments_Report.xlsx"
  );
};

export const exportAppointmentsToPDF = (appointments) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Appointment Report", 14, 20);

  autoTable(doc, {
    head: [["ID", "Patient", "Doctor", "Date", "Time", "Status"]],
    body: appointments.map((a) => [
      a.id,
      a.patient,
      a.doctor,
      a.date,
      a.time,
      a.status,
    ]),
    startY: 30,
  });

  doc.save("Appointments_Report.pdf");
};