import { InterpretedAstralPositions, UserInfo, ContactInfo } from '../../types/astralChart';
import { jsPDF } from 'jspdf';
import { svgAsPngDataUrl } from '../utils/svgUtils';

// Import SVG watermarks
import starrySkySvg from '../../assets/images/starry-sky-watermark-enhanced.svg';
import desertSkySvg from '../../assets/images/starry-desert-watermark-updated.svg';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const generateNatalChartPDF = async (
  result: InterpretedAstralPositions,
  userInfo: UserInfo,
  contactInfo: ContactInfo
): Promise<jsPDF> => {
  // Create a new jsPDF instance with portrait orientation
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Add fonts
  doc.addFont('/fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('/fonts/NotoSansSymbols-Regular.ttf', 'NotoSansSymbols', 'normal');

  // Set default font
  doc.setFont('NotoSans');

  // Generate cover page with starry sky watermark
  await generateCoverPage(doc, userInfo, contactInfo);

  // Generate interpretation pages
  for (const interpretation of result) {
    doc.addPage();
    await generateInterpretationPage(doc, interpretation);
  }

  // Add page numbers
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Pagina ${i} din ${totalPages}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
  }

  return doc;
};

// Function to add a watermark to the page
const addWatermark = async (doc: jsPDF, svgUrl: string): Promise<void> => {
  try {
    // Convert SVG to PNG data URL with low opacity
    const dataUrl = await svgAsPngDataUrl(svgUrl, 0.6);

    // Add the image
    doc.addImage(
      dataUrl,
      'PNG',
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height
    );
  } catch (error) {
    console.error('Error adding watermark:', error);
  }
};

// Function to generate the cover page
const generateCoverPage = async (
  doc: jsPDF,
  userInfo: UserInfo,
  contactInfo: ContactInfo
): Promise<void> => {
  // Add starry sky watermark
  await addWatermark(doc, starrySkySvg);

  // Title centered at the top of the page
  doc.setFontSize(24);
  doc.text('Hartă Astrală', doc.internal.pageSize.width / 2, 30, { align: 'center' });

  doc.setFontSize(16);
  doc.text('Analiză personalizată', doc.internal.pageSize.width / 2, 40, { align: 'center' });

  // User information in top-left corner
  doc.setFontSize(12);
  let yPosition = 60;

  doc.text(`Nume: ${userInfo.name}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Data nașterii: ${formatDate(userInfo.birthDate)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Ora nașterii: ${formatTime(userInfo.birthHour)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Locație: ${userInfo.location}`, 20, yPosition);
  yPosition += 20;
  doc.text(`Email: ${contactInfo.email}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Telefon: ${contactInfo.phone}`, 20, yPosition);

  // Footer
  doc.setFontSize(10);
  doc.text('', doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 20, { align: 'center' });
};

// Function to generate an interpretation page
const generateInterpretationPage = async (
  doc: jsPDF,
  interpretation: any
): Promise<void> => {
  // Add golden feathers watermark
  await addWatermark(doc, desertSkySvg);

  // Set up fonts
  doc.setFont('NotoSans');

  // Header
  let yPosition = 20;

  // Planet name and sign - centered
  doc.setFontSize(18);
  doc.text(`${interpretation.name} în ${interpretation.sign}`, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });

  // House - centered
  yPosition += 10;
  doc.setFontSize(14);
  doc.text(interpretation.house, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });

  // // Divider line
  // yPosition += 10;
  // doc.setDrawColor(200, 200, 200);
  // doc.line(20, yPosition, doc.internal.pageSize.width - 20, yPosition);

  // Interpretation text
  yPosition += 30;
  doc.setFontSize(12);

  // Split text into paragraphs and render with word wrapping
  const maxWidth = doc.internal.pageSize.width - 40; // 20mm margins on each side
  const lines = doc.splitTextToSize(interpretation.interpretation, maxWidth);

  doc.text(lines, 20, yPosition);
};
