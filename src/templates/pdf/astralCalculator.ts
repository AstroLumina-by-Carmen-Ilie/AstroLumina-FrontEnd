import { AstralElements, UserInfo } from '@/types';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { loadFontsForPDF } from '@/utils/fontLoader';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatDegreesMinutes = (decimal: number): string => {
  const degrees = Math.floor(Math.abs(decimal));
  const minutes = Math.round((Math.abs(decimal) - degrees) * 60);
  return `${degrees}° ${minutes}'`;
};

const addUserInfo = (doc: jsPDF, userInfo: UserInfo) => {
  doc.setFont('NotoSans');
  doc.setFontSize(10);
  doc.text(`Nume: ${userInfo.name}`, 10, 10);
  doc.text(`Dată: ${formatDate(userInfo.birthDate)}`, 10, 15);
  doc.text(`Oră: ${formatTime(userInfo.birthHour)}`, 10, 20);
  doc.text(`Locație: ${userInfo.location}`, 10, 25);
};

const calculateElementDistribution = (elements: AstralElements): Record<string, number> => {
  const elementDistribution: Record<string, number> = {};
  elements.forEach((p: any) => {
    if (p.element) {
      elementDistribution[p.element] = (elementDistribution[p.element] || 0) + 1;
    }
  });
  return elementDistribution;
};

const addElementDistribution = (doc: jsPDF, elementDistribution: Record<string, number>) => {
  const elementColors: Record<string, number[]> = {
    'Aer': [220, 230, 255], // Albastru foarte deschis pentru Aer
    'Apă': [173, 216, 230], // Albastru lichid pentru Apă
    'Foc': [255, 200, 180], // Portocaliu spre roșu pentru Foc
    'Pământ': [222, 184, 135] // Maro deschis pentru Pământ
  };

  doc.setFontSize(10);
  let yPos = 10;

  Object.entries(elementColors).forEach(([element, color]) => {
    if (['Aer', 'Apă', 'Foc', 'Pământ'].includes(element)) {
      const count = elementDistribution[element] || 0;
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(260, yPos - 3.5, 3.5, 3.5, 'F');
      doc.setTextColor(0, 0, 0);
      doc.text(`${element}: ${count}`, 265, yPos);
      yPos += 5;
    }
  });
};

const createPlanetsTable = (elements: AstralElements) => {
  return elements.map((p: any) => [
    p.name,
    p.symbol,
    p.sign,
    p.emoji,
    p.element,
    p.retrograde ? '✓' : ''
  ]);
};

const createHousesTable = (houses: AstralElements) => {
  return houses.map((h: any) => [
    h.name,
    h.sign,
    formatDegreesMinutes(h.position)
  ]);
};

const createAsteroidsTable = (elements: AstralElements) => {
  return elements.map((p: any) => [
    p.name,
    p.symbol,
    p.sign,
    p.emoji,
    p.element,
    p.retrograde ? '✓' : ''
  ]);
};

const addTable = (doc: jsPDF, title: string, headers: string[], data: any[][], startY: number) => {
  doc.setFont('NotoSans');
  doc.setFontSize(12);

  autoTable(doc, {
    startY: startY,
    head: [headers],
    body: data,
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
      if (data.row.section === 'head') {
        data.cell.styles.font = 'NotoSans';
      } else {
        // Font logic: Quivira for symbols -> NotoSans for text
        if (
          (data.column.index === 1 ||
            data.column.index === 3 ||
            data.column.index === 5
          ) && headers.length === 6) {
          // Use Quivira font for symbol columns in 7-column tables
          data.cell.styles.font = 'Quivira';
        } else {
          data.cell.styles.font = 'NotoSans';
        }

        if (data.row.section === 'body' && data.column.index === 4) {
          const element = data.row.raw[4];
          const elementColors: Record<string, number[]> = {
            'Aer': [220, 230, 255],
            'Apă': [173, 216, 230],
            'Foc': [255, 200, 180],
            'Pământ': [222, 184, 135]
          };

          if (element && typeof element === 'string' && element in elementColors) {
            data.cell.styles.fillColor = elementColors[element];
          }
        }
      }
    }
  });
};

export const generateAstralElementsPDF = async (result: { astral_elements: AstralElements, astral_houses: AstralElements }, userInfo: UserInfo) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  await loadFontsForPDF(doc, [
    { filename: 'NotoSans-Regular.ttf', family: 'NotoSans', style: 'normal' },
    { filename: 'Quivira.otf', family: 'Quivira', style: 'normal' },
  ]);

  // Split astral elements into planets and asteroids
  const splitIndex = result.astral_elements.findIndex((item: any) => item.name === 'Chiron');
  const planetsData = splitIndex === -1 ? result.astral_elements : result.astral_elements.slice(0, splitIndex);
  const asteroidsData = splitIndex === -1 ? [] : result.astral_elements.slice(splitIndex);

  // PAGE 1: Planets
  addUserInfo(doc, userInfo);
  doc.setFont('NotoSans');
  doc.setFontSize(14);
  doc.text('Planete și puncte virtuale', 148, 35, { align: 'center' });

  const planetElementDistribution = calculateElementDistribution(planetsData);
  addElementDistribution(doc, planetElementDistribution);

  const planetsTableData = createPlanetsTable(planetsData);
  addTable(doc, 'Tabel Planete', ['Planetă', 'Simbol', 'Semn', 'Simbol', 'Element', 'Retrograd'], planetsTableData, 45);

  // PAGE 2: Houses
  doc.addPage();
  addUserInfo(doc, userInfo);
  doc.setFont('NotoSans');
  doc.setFontSize(14);
  doc.text('Case Astrologice', 148, 35, { align: 'center' });

  const housesTableData = createHousesTable(result.astral_houses);
  addTable(doc, 'Tabel Case', ['Casă', 'Semn', 'Pozitie'], housesTableData, 50);

  // PAGE 3: Asteroids
  if (asteroidsData.length > 0) {
    doc.addPage();
    addUserInfo(doc, userInfo);
    doc.setFont('NotoSans');
    doc.setFontSize(14);
    doc.text('Asteroizi și stele fixe', 148, 35, { align: 'center' });

    const asteroidsTableData = createAsteroidsTable(asteroidsData);
    addTable(doc, 'Tabel Asteroizi', ['Planetă', 'Simbol', 'Semn', 'Simbol', 'Element', 'Retrograd'], asteroidsTableData, 50);
  }

  // Footer
  doc.setFont('NotoSans');
  const today = new Date().toLocaleDateString('ro-RO');
  doc.setFontSize(10);
  doc.text(`Generat la ${today} de AstroLumina`, 148, doc.internal.pageSize.height - 10, { align: 'center' });

  return doc;
};
