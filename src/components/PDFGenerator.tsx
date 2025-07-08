
import jsPDF from 'jspdf';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: string;
  region: string;
  language: string;
  url: string;
  priority: 'high' | 'medium' | 'low';
}

export class PDFGenerator {
  static generateReport(newsData: NewsArticle[]) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('EcoFinance Digest Colombia', margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Reporte generado el ${new Date().toLocaleDateString('es-CO')}`, margin, yPosition);
    
    yPosition += 20;

    // Summary
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Resumen Ejecutivo', margin, yPosition);
    
    yPosition += 10;
    doc.setFontSize(10);
    const nationalNews = newsData.filter(n => n.region === 'nacional').length;
    const internationalNews = newsData.filter(n => n.region === 'internacional').length;
    const ratingAgencies = newsData.filter(n => n.category === 'calificadoras').length;
    
    doc.text(`Total de noticias: ${newsData.length}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Noticias nacionales: ${nationalNews}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Noticias internacionales: ${internationalNews}`, margin, yPosition);
    yPosition += 7;
    doc.text(`Reportes de calificadoras: ${ratingAgencies}`, margin, yPosition);
    
    yPosition += 20;

    // Group news by region
    const nationalNewsItems = newsData.filter(n => n.region === 'nacional');
    const internationalNewsItems = newsData.filter(n => n.region === 'internacional');
    const ratingAgencyItems = newsData.filter(n => n.category === 'calificadoras');

    // National News Section
    if (nationalNewsItems.length > 0) {
      yPosition = this.addSection(doc, 'Noticias Nacionales (Colombia)', nationalNewsItems, yPosition, margin, pageWidth, pageHeight);
    }

    // International News Section
    if (internationalNewsItems.length > 0) {
      yPosition = this.addSection(doc, 'Noticias Internacionales', internationalNewsItems, yPosition, margin, pageWidth, pageHeight);
    }

    // Rating Agencies Section
    if (ratingAgencyItems.length > 0) {
      yPosition = this.addSection(doc, 'Reportes de Calificadoras de Riesgo', ratingAgencyItems, yPosition, margin, pageWidth, pageHeight);
    }

    // Save the PDF
    doc.save(`EcoFinance_Digest_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  private static addSection(
    doc: jsPDF,
    sectionTitle: string,
    articles: NewsArticle[],
    yPosition: number,
    margin: number,
    pageWidth: number,
    pageHeight: number
  ): number {
    const maxWidth = pageWidth - 2 * margin;

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    // Section title
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text(sectionTitle, margin, yPosition);
    yPosition += 15;

    // Add articles
    articles.forEach((article, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin;
      }

      // Article title
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      const titleLines = doc.splitTextToSize(article.title, maxWidth);
      doc.text(titleLines, margin, yPosition);
      yPosition += titleLines.length * 7;

      // Article metadata
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`${article.source} | ${new Date(article.date).toLocaleDateString('es-CO')} | ${article.language.toUpperCase()}`, margin, yPosition);
      yPosition += 10;

      // Article summary
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      const summaryLines = doc.splitTextToSize(article.summary, maxWidth);
      doc.text(summaryLines, margin, yPosition);
      yPosition += summaryLines.length * 5 + 10;

      // Add some spacing between articles
      yPosition += 5;
    });

    return yPosition + 10;
  }
}
