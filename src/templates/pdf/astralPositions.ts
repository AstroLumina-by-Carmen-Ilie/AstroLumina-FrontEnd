import { AstralPosition, AstralPositions } from '../../types/astralPositions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { planetSymbols, zodiacSymbols } from '../../constants/astrology';

export const generateAstralPositionsPDF = (result: AstralPositions, userInfo: { name: string, date: string, time: string, location: string }) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  doc.addFont('/fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('/fonts/NotoSansSymbols-Regular.ttf', 'NotoSansSymbols', 'normal');

  doc.setFont('NotoSans');
  doc.setFontSize(20);
  doc.text('Hartă Astrală', 105, 15, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Nume: ${userInfo.name}`, 20, 30);
  doc.text(`Dată: ${userInfo.date}`, 20, 37);
  doc.text(`Oră: ${userInfo.time}`, 20, 44);
  doc.text(`Locație: ${userInfo.location}`, 20, 51);

  const tableData = result.map((p: AstralPosition) => {
    const planetSymbol = (p.name === 'Soare' || p.name === 'Sun') ? 'O' : planetSymbols['ro'][p.name] || '';
    const zodiacSymbol = zodiacSymbols['ro'][p.sign] || '';
    
    return [
      `${planetSymbol} ${p.name}`,
      `${zodiacSymbol} ${p.sign}`,
      p.house
    ];
  });

  (doc as any).autoTable({
    startY: 60,
    head: [['Planetă', 'Semn', 'Casă']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [41, 128, 185], 
      textColor: 255,
      font: 'NotoSans',  
      fontStyle: 'normal'
    },
    styles: { 
      font: 'NotoSansSymbols',  
      fontSize: 12,
      cellPadding: 5,
      halign: 'center',
      textColor: [0, 0, 0],
      lineWidth: 0.1
    },
    didParseCell: function(data: any) {
      if (data.row.section === 'head') {
        data.cell.styles.font = 'NotoSans';
      } else {
        data.cell.styles.font = 'NotoSansSymbols';
      }
    }
  });

  doc.setFont('NotoSans');
  const today = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Generat la ${today} de AstroLumina`, 105, doc.internal.pageSize.height - 10, { align: 'center' });

  return doc;
};
