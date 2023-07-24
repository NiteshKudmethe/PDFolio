import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (table: string | number | object, options?: object) => jsPDF;
  }
}
