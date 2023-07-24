import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

export interface UserData {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  linkedin: string;
  // education: string;
  workExperience: string;
  skills: string;
  projects: string;
  // Add new fields for education details
  masterDegree: string;
  masterPassingYear: string;
  masterUniversity: string;
  masterPercentage: string;
  masterAcademicYears: string;
  bachelorDegree: string;
  bachelorPassingYear: string;
  bachelorUniversity: string;
  bachelorPercentage: string;
  bachelorAcademicYears: string;
  twelfth: string;
  twelfthPassingYear: string;
  twelfthUniversity: string;
  twelfthPercentage: string;
  twelfthAcademicYears: string;
  tenth: string;
  tenthPassingYear: string;
  tenthUniversity: string;
  tenthPercentage: string;
  tenthAcademicYears: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData: any = {}; // Store user data here

  saveUserData(data: UserData) {
    this.userData = data;
  }
  generatePDF() : Blob {
    const doc = new jsPDF();

    // Set border and heading
    const borderMargin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxHeight = pageHeight - 70; // Maximum content height per page

    // Draw the border and heading
    doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);
    doc.setFontSize(20);
    doc.text('MY PORTFOLIO', pageWidth / 2, 20, { align: 'center' });

    // Draw the line below the heading
    doc.line(borderMargin, 30, pageWidth - borderMargin, 30);

    let currentY = 100; // Y-coordinate for the current content

    // Check if the name property exists in userData before using it
    if (this.userData.hasOwnProperty('name')) {
      doc.setFontSize(12); // Increase font size for subheadings

      // Personal Details section
      doc.text('PERSONAL DETAILS:', borderMargin + 10, 40);
      doc.setFontSize(12); // Reset font size for regular text
      doc.text(`Name: ${this.userData.name}`, borderMargin + 20, 50);
      doc.text(`Address: ${this.userData.address}`, borderMargin + 20, 60);
      doc.text(`Phone Number: ${this.userData.phoneNumber}`, borderMargin + 20, 70);
      doc.text(`Email: ${this.userData.email}`, borderMargin + 20, 80);
      doc.text(`LinkedIn: ${this.userData.linkedin}`, borderMargin + 20, 90);

      // Draw the line below the section
      doc.line(borderMargin, currentY + 10, pageWidth - borderMargin, currentY + 10);
      // Add a page break before Education Details section
      if (currentY + 60 > maxHeight) {
        doc.addPage();
        currentY = 40;
      }
      // Eucation Details sectiond
      doc.text('EDUCATION DETAILS:', borderMargin + 10, currentY + 20);
      currentY += 30; // Move to the next line



      // Master Degree
      if (this.userData.masterDegree && this.userData.masterDegree !== 'NA') {
        currentY = this.addEducationSection(doc, currentY, this.userData.masterDegree, this.userData.masterPassingYear, this.userData.masterUniversity, this.userData.masterPercentage, this.userData.masterAcademicYears, maxHeight);
      }

      // Bachelor Degree
      if (this.userData.bachelorDegree && this.userData.bachelorDegree !== 'NA') {
        currentY = this.addEducationSection(doc, currentY, this.userData.bachelorDegree, this.userData.bachelorPassingYear, this.userData.bachelorUniversity, this.userData.bachelorPercentage, this.userData.bachelorAcademicYears, maxHeight);
      }

      // 12th
      if (this.userData.twelfth && this.userData.twelfth !== 'NA') {
        currentY = this.addEducationSection(doc, currentY, this.userData.twelfth, this.userData.twelfthPassingYear, this.userData.twelfthUniversity, this.userData.twelfthPercentage, this.userData.twelfthAcademicYears, maxHeight);
      }

      // 10th
      if (this.userData.tenth && this.userData.tenth !== 'NA') {
        currentY = this.addEducationSection(doc, currentY, this.userData.tenth, this.userData.tenthPassingYear, this.userData.tenthUniversity, this.userData.tenthPercentage, this.userData.tenthAcademicYears, maxHeight);
      }

         // Add a page break before Work Experience section
    if (currentY + 60 > maxHeight) {
      doc.addPage();
      currentY = 40;
    }

      // Work Experience section
      if (this.userData.workExperience && this.userData.workExperience !== 'NA') {
        currentY = this.addSectionWithHeading(doc, currentY, 'WORK EXPERIENCE:', this.userData.workExperience, maxHeight);
      }

         // Add a page break before Skills section
    if (currentY + 60 > maxHeight) {
      doc.addPage();
      currentY = 40;
    }

      // Skills section
      if (this.userData.skills && this.userData.skills !== 'NA') {
        currentY = this.addSectionWithHeading(doc, currentY, 'SKILLS:', this.userData.skills, maxHeight);
      }

         // Add a page break before Skills section
    if (currentY + 60 > maxHeight) {
      doc.addPage();
      currentY = 40;
    }

      // Projects section
      if (this.userData.projects && this.userData.projects !== 'NA') {
        currentY = this.addSectionWithHeading(doc, currentY, 'PROJECTS:', this.userData.projects, maxHeight);
      }

      // Declaration section
      doc.setFontSize(12);
      currentY += 20; // Move to the next line
      doc.text('Declaration:', borderMargin + 10, currentY);
      currentY += 10; // Move to the next line
      doc.text(`I hereby declare that the above information is true as per my knowledge.`, borderMargin + 20, currentY);
      currentY += 10; // Move to the next line
      doc.text('Date:', borderMargin + 10, currentY);
      doc.text(`Signature:`, pageWidth - borderMargin - 60, currentY);
    } else {
      // Handle the case when name is not set
      console.error('Name is not set in userData.');
    }

    doc.save('portfolio.pdf');
     // Instead of saving the document, get the PDF content as a Blob
  const pdfContent = doc.output('blob');

  return pdfContent;
  }


  private addEducationSection(doc: jsPDF, currentY: number, degree: string, passingYear: string, university: string, percentage: string, academicYears: string, maxHeight: number): number {
    doc.setFontSize(12);
    // Add degree field
  doc.text(`Degree: ${degree}`, 20, currentY);
    // const degreeLines = doc.splitTextToSize(degree, doc.internal.pageSize.getWidth() - 2 * 20 - 250);
    // doc.text(degreeLines, 20, currentY + 10);
    // currentY += 10;
    doc.text(`Passing Year: ${passingYear}`, 20, currentY + 10);
    doc.text(`University/College Name: ${university}`, 20, currentY + 20);
    doc.text(`Percentage: ${percentage}`, 20, currentY + 30);
    doc.text(`Academic Years: ${academicYears}`, 20, currentY + 40);
    currentY += 50; // Move to the next section
    return this.checkPageHeightAndAddPage(doc, currentY, [], maxHeight); // Check if a new page is required
  }

  private addSectionWithHeading(doc: jsPDF, currentY: number, heading: string, content: string, maxHeight: number): number {
    doc.setFontSize(12);
    doc.text(heading, 20, currentY + 10);
    currentY += 30; // Move to the next line
    const contentLines = doc.splitTextToSize(content, doc.internal.pageSize.getWidth() - 2 * 20);
    doc.text(contentLines, 20, currentY + 10);
    currentY += contentLines.length * 8 + 10; // Move to the next section
    return this.checkPageHeightAndAddPage(doc, currentY, contentLines, maxHeight); // Check if a new page is required
  }

  private checkPageHeightAndAddPage(doc: jsPDF, currentY: number, contentLines: string[], maxHeight: number): number {
    const lineHeight = 8; // Adjust the line height based on your font size and line spacing
    const contentHeight = contentLines.length * lineHeight;

    if (currentY + contentHeight > maxHeight) {
      // Add a new page and draw the border and heading
      doc.addPage();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const borderMargin = 10;

      // Draw the border and heading
      doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin);
      // doc.setFontSize(20);
      // doc.text('MY PORTFOLIO', pageWidth / 2, 20, { align: 'center' });



      currentY = 40; // Reset currentY to the top of the new page
    }

    return currentY;
  }
}
