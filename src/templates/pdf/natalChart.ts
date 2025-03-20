import { InterpretedAstralPositions, UserInfo, ContactInfo } from '../../types/astralChart';
import { jsPDF } from 'jspdf';
import { planetSymbols, zodiacSymbols } from '../../constants/astrology';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const generateNatalChartPDF = (
  result: InterpretedAstralPositions,
  userInfo: UserInfo,
  contactInfo: ContactInfo
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  doc.addFont('/fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('/fonts/NotoSansSymbols-Regular.ttf', 'NotoSansSymbols', 'normal');
  
  doc.setFont('NotoSans');
  doc.setFontSize(20);

  doc.text('Hartă Natala', 105, 15, { align: 'center' });
  
  let yPosition = 40;

  doc.setFontSize(12);
  doc.text(`Name: ${userInfo.name}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Birth Date: ${formatDate(userInfo.birthDate)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Birth Time: ${formatTime(userInfo.birthHour)}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Location: ${userInfo.location}`, 20, yPosition);
  yPosition += 20;
  doc.text(`Email: ${contactInfo.email}`, 20, yPosition);
  yPosition += 10;
  doc.text(`Phone: ${contactInfo.phone}`, 20, yPosition);
  yPosition += 20;

  const today = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Generat la ${today} de AstroLumina`, 105, doc.internal.pageSize.height - 10, { align: 'center' });

  doc.setFont("NotoSansSymbols", "normal");
  result.forEach((interpretation) => {
    doc.addPage();
    yPosition = 20;
    
    let planet_sign = (interpretation.name === 'Soare' || interpretation.name === 'Sun') ? 'O' : planetSymbols['ro'][interpretation.name]
    let zodiac_sign = zodiacSymbols['ro'][interpretation.sign]
    doc.text(planet_sign + ' ' + interpretation.name, 20, yPosition);
    yPosition += 10;
    doc.text(zodiac_sign + ' ' + interpretation.sign, 20, yPosition);
    yPosition += 10;
    doc.text(interpretation.house, 20, yPosition);
    yPosition += 10;
    doc.text(interpretation.interpretation, 20, yPosition);
  });

  return doc;
}
