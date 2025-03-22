import { AstralPosition, AstralPositions } from '../../types/astralPositions';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { planetSymbols } from '../../constants/astrology';

export const generateAstralPositionsPDF = (result: AstralPositions, userInfo: { name: string, date: string, time: string, location: string }) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  doc.addFont('/fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('/fonts/NotoSansSymbols-Regular.ttf', 'NotoSansSymbols', 'normal');

  doc.setFont('NotoSans');
  doc.setFontSize(12);
  doc.text('Poziția elementelor astrale', 148, 15, { align: 'center' });

  // Poziționăm informațiile utilizatorului în colțul din stânga sus
  doc.setFontSize(10);
  doc.text(`Nume: ${userInfo.name}`, 10, 10);
  doc.text(`Dată: ${userInfo.date}`, 10, 15);
  doc.text(`Oră: ${userInfo.time}`, 10, 20);
  doc.text(`Locație: ${userInfo.location}`, 10, 25);

  // Calculăm distribuția planetelor pe elemente
  const elementDistribution: Record<string, number> = {};
  result.forEach((p: AstralPosition) => {
    if (p.element) {
      elementDistribution[p.element] = (elementDistribution[p.element] || 0) + 1;
    }
  });

  // Definim culorile pentru fiecare element
  const elementColors: Record<string, number[]> = {
    'Aer': [220, 230, 255], // Albastru foarte deschis pentru Aer
    'Air': [220, 230, 255],
    'Apă': [173, 216, 230], // Albastru lichid pentru Apă
    'Water': [173, 216, 230],
    'Foc': [255, 200, 180], // Portocaliu spre roșu pentru Foc
    'Fire': [255, 200, 180],
    'Pământ': [222, 184, 135], // Maro deschis pentru Pământ
    'Earth': [222, 184, 135]
  };

  // Afișăm distribuția elementelor în colțul din dreapta sus
  doc.setFontSize(10);
  let yPos = 10;
  
  // Afișăm fiecare element cu numărul de planete
  Object.entries(elementColors).forEach(([element, color]) => {
    // Verificăm dacă este un element principal (nu o traducere)
    if (['Aer', 'Apă', 'Foc', 'Pământ'].includes(element)) {
      const count = elementDistribution[element] || 0;
      // Setăm culoarea de umplere pentru un mic pătrat colorat
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(260, yPos - 3.5, 3.5, 3.5, 'F');
      // Setăm culoarea textului înapoi la negru
      doc.setTextColor(0, 0, 0);
      doc.text(`${element}: ${count}`, 265, yPos);
      yPos += 5;
    }
  });

  const tableData = result.map((p: AstralPosition) => {
    const planetSymbol = (p.name === 'Soare' || p.name === 'Sun') ? 'O' : planetSymbols['ro'][p.name] || '';

    return [
      p.name,
      planetSymbol,
      p.sign,
      p.emoji,
      p.element,
      p.house,
      p.retrograde ? 'X' : ''
    ];
  });

  (doc as any).autoTable({
    startY: 30,
    head: [['Planetă', 'Simbol', 'Semn', 'Simbol', 'Element', 'Casă', 'Retrograd']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [220, 220, 220], // Gri deschis pentru header
      textColor: [50, 50, 50],    // Text gri închis pentru contrast
      font: 'NotoSans',
      fontStyle: 'normal'
    },
    styles: {
      font: 'NotoSans',
      fontSize: 10,
      cellPadding: 2.1,
      halign: 'center',
      textColor: [0, 0, 0],
      lineWidth: 0.1
    },
    didParseCell: function (data: any) {
      // Folosim fonturi diferite în funcție de conținutul celulei
      if (data.row.section === 'head') {
        // Headerul folosește întotdeauna NotoSans pentru diacritice
        data.cell.styles.font = 'NotoSans';
      } else {
        // Pentru celulele din body, alegem fontul în funcție de coloană
        if (data.column.index === 1 || data.column.index === 3) {
          // Coloanele cu simboluri (1=planetSymbol, 3=zodiacSymbol)
          data.cell.styles.font = 'NotoSansSymbols';
        } else {
          // Celelalte coloane (text normal cu posibile diacritice)
          data.cell.styles.font = 'NotoSans';
        }
        
        // Colorăm rândul în funcție de element
        if (data.row.section === 'body') {
          const element = data.row.raw[4]; // Coloana cu elementul (index 4)
          if (element && typeof element === 'string' && element in elementColors) {
            data.cell.styles.fillColor = elementColors[element];
          }
        }
      }
    }
  });

  doc.setFont('NotoSans');
  const today = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Generat la ${today} de AstroLumina`, 148, doc.internal.pageSize.height - 10, { align: 'center' });

  return doc;
};
