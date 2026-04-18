import { AstralElements, UserInfo, ContactInfo } from "@/types";
import { jsPDF } from "jspdf";
import { svgAsPngDataUrl } from "@/templates/utils/svgUtils";
import { loadFontsForPDF } from "@/utils/fontLoader";

// Import SVG watermarks
// import starryDesertSvg from '@/assets/images/starry-desert-watermark-updated.svg';
// import starrySkySvg from '@/assets/images/starry-sky-watermark-enhanced.svg';

// Utility functions
const formatDate = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatTime = (date: Date): string => {
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const generateNatalChartPDF = async (
  result: AstralElements,
  chart: string,
  userInfo: UserInfo,
  contactInfo: ContactInfo,
): Promise<jsPDF> => {
  // Create a new jsPDF instance with portrait orientation
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add fonts
  await loadFontsForPDF(doc, [
    { filename: "NotoSans-Regular.ttf", family: "NotoSans", style: "normal" },
    {
      filename: "NotoSansSymbols-Regular.ttf",
      family: "NotoSansSymbols",
      style: "normal",
    },
    { filename: "NotoSans-Bold.ttf", family: "NotoSans", style: "bold" },
    { filename: "NotoSans-Italic.ttf", family: "NotoSans", style: "italic" },
  ]);

  // Set default font
  doc.setFont("NotoSans");

  // Generate cover page with starry sky watermark
  await generateCoverPage(doc);

  // Generate thank you page
  doc.addPage();
  await generateThankYouPage(doc, userInfo, contactInfo);

  // // Generate chart page
  // doc.addPage('a4', 'landscape');
  // await generateChartPage(doc, chart);

  // Generate interpretation pages
  for (const interpretation of result) {
    doc.addPage("a4", "portrait");
    await generateInterpretationPage(doc, interpretation);
  }

  // Generate final cover page
  doc.addPage();
  await generateFinalCoverPage(doc);

  // Add page numbers
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Pagina ${i} din ${totalPages}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" },
    );
  }

  return doc;
};

// Function to add a watermark to the page
const addWatermark = async (doc: jsPDF, svgUrl: string): Promise<void> => {
  try {
    // Convert SVG to PNG data URL with low opacity
    const dataUrl = await svgAsPngDataUrl(svgUrl, 0.7);

    // Add the image
    doc.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
    );
  } catch (error) {
    console.error("Error adding watermark:", error);
  }
};

// Function to generate the cover page
const generateCoverPage = async (doc: jsPDF): Promise<void> => {
  // Add starry sky watermark
  await addWatermark(doc, starrySkySvg);

  // Title centered at the top of the page with elegant styling
  const pageWidth = doc.internal.pageSize.width;
  const pageCenter = pageWidth / 2;

  // Add decorative line above title
  doc.setDrawColor(255, 215, 0); // Gold color
  doc.setLineWidth(0.5);
  doc.line(pageCenter - 40, 60, pageCenter + 40, 60);

  // Main title with shadow effect
  doc.setFontSize(36);
  doc.setFont("NotoSans", "bold");
  doc.setTextColor(255, 255, 255); // White color for shadow
  doc.text("Harta Natală", pageCenter + 0.5, 80.5, { align: "center" });
  doc.setTextColor(218, 165, 32); // Gold color for title
  doc.text("Harta Natală", pageCenter, 80, { align: "center" });

  // Subtitle with elegant styling
  doc.setFontSize(18);
  doc.setFont("NotoSans", "italic");
  doc.setTextColor(255, 255, 255);
  doc.text("Analiză personalizată", pageCenter, 100, { align: "center" });

  // Add decorative line below subtitle
  doc.setDrawColor(255, 215, 0); // Gold color
  doc.line(pageCenter - 30, 110, pageCenter + 30, 110);
};

// Function to generate the thank you page
const generateThankYouPage = async (
  doc: jsPDF,
  userInfo: UserInfo,
  contactInfo: ContactInfo,
): Promise<void> => {
  // Add starry sky watermark
  await addWatermark(doc, starrySkySvg);

  const pageWidth = doc.internal.pageSize.width;
  const pageCenter = pageWidth / 2;
  const leftMargin = 20;
  const rightMargin = pageWidth - 20;
  let yPosition = 30;

  // Thank you header
  doc.setFontSize(24);
  doc.setFont("NotoSans", "bold");
  doc.setTextColor(218, 165, 32); // Gold color
  doc.text("Mulțumim pentru achiziție!", pageCenter, yPosition, {
    align: "center",
  });

  yPosition += 20;

  // User information box
  doc.setDrawColor(255, 215, 0); // Gold color
  doc.setFillColor(10, 14, 42, 0.3); // Dark blue with transparency
  doc.roundedRect(leftMargin, yPosition, pageWidth - 40, 50, 3, 3, "FD");

  // User details
  doc.setFontSize(12);
  doc.setFont("NotoSans", "bold");
  doc.setTextColor(255, 255, 255);
  yPosition += 10;
  doc.text("Date personale:", leftMargin + 10, yPosition);

  doc.setFont("NotoSans", "normal");
  yPosition += 10;
  doc.text(`Nume: ${userInfo.name}`, leftMargin + 10, yPosition);
  yPosition += 8;
  doc.text(
    `Data nașterii: ${formatDate(userInfo.birthDate)}`,
    leftMargin + 10,
    yPosition,
  );
  yPosition += 8;
  doc.text(
    `Ora nașterii: ${formatTime(userInfo.birthHour)}`,
    leftMargin + 10,
    yPosition,
  );
  yPosition += 8;
  doc.text(`Locație: ${userInfo.location}`, leftMargin + 10, yPosition);

  // Contact information
  doc.setFont("NotoSans", "bold");
  doc.text("Date de contact:", rightMargin - 80, yPosition - 24);

  doc.setFont("NotoSans", "normal");
  doc.text(`Email: ${contactInfo.email}`, rightMargin - 80, yPosition - 16);
  doc.text(`Telefon: ${contactInfo.phone}`, rightMargin - 80, yPosition - 8);

  yPosition += 30;

  // Explanation text
  doc.setFontSize(12);
  doc.setFont("NotoSans", "normal");
  doc.setTextColor(255, 255, 255);

  const explanationText = [
    "Dragă client,",
    "",
    "Îți mulțumim pentru că ai ales serviciile AstroLumina! Acest document conține",
    "interpretarea astrologică personalizată a hărții tale natale, ",
    "bazată pe poziția planetelor la momentul nașterii tale.",
    "",
    "Harta Natală pe care ai primit-o include:",
    "• Interpretarea detaliată a planetelor în semne zodiacale",
    "• Poziționarea planetelor în casele astrologice",
    "• Aspectele principale și influența lor asupra personalității tale",
    "",
    "Acest PDF ți-a fost trimis și pe adresa de email furnizată în formularul de comandă.",
    "Pentru orice întrebări suplimentare sau clarificări, nu ezita să ne contactezi folosind",
    "informațiile de la sfârșitul documentului.",
    "",
    "Îți dorim o experiență plăcută explorând universul tău interior prin intermediul astrologiei!",
    "",
    "Cu recunoștință,",
    "Echipa AstroLumina",
  ];

  // Add the explanation text
  explanationText.forEach((line) => {
    doc.text(line, pageCenter, yPosition, { align: "center" });
    yPosition += 7;
  });
};

// Function to generate the chart page
const generateChartPage = async (doc: jsPDF, chart: string): Promise<void> => {
  // Add starry sky watermark
  await addWatermark(doc, starrySkySvg);

  try {
    // Validate the SVG string
    if (!chart || typeof chart !== "string") {
      throw new Error("Invalid SVG string provided.");
    }

    // Convert the SVG string to a PNG data URL
    const dataUrl = await svgAsPngDataUrl(chart);

    // Add the SVG as an image, covering the entire page
    doc.addImage(
      dataUrl,
      "PNG",
      20,
      20,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 20,
    );
  } catch (error) {
    console.error("Error rendering chart SVG:", error);
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0); // Red color for error message
    doc.text("Eroare la încărcarea SVG-ului.", 20, 20);
  }
};

// Function to generate an interpretation page
const generateInterpretationPage = async (
  doc: jsPDF,
  interpretation: any,
): Promise<void> => {
  // Add desert sky watermark
  // await addWatermark(doc, starryDesertSvg);

  // Set up fonts
  doc.setFont("NotoSans");

  // Header
  let yPosition = 20;

  // Planet name and sign - centered
  doc.setFontSize(18);
  doc.setFont("NotoSans", "bold");
  doc.setTextColor(218, 165, 32); // Gold color
  doc.text(
    `${interpretation.name} în ${interpretation.sign}`,
    doc.internal.pageSize.width / 2,
    yPosition,
    { align: "center" },
  );

  // House - centered
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont("NotoSans", "italic");
  doc.text(interpretation.house, doc.internal.pageSize.width / 2, yPosition, {
    align: "center",
  });

  // Interpretation text
  yPosition += 40;
  doc.setFontSize(12);
  doc.setFont("NotoSans", "normal");
  doc.setTextColor(0, 0, 0); // Black color for text

  // Split text into paragraphs and render with word wrapping
  const maxWidth = doc.internal.pageSize.width - 40; // 20mm margins on each side
  const lines = doc.splitTextToSize(
    interpretation.interpretation || "Hau Bau",
    maxWidth,
  );

  doc.text(lines, 20, yPosition);
};

// Function to generate the final cover page
const generateFinalCoverPage = async (doc: jsPDF): Promise<void> => {
  // Add starry sky watermark
  await addWatermark(doc, starrySkySvg);

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Contact information in bottom right corner
  doc.setFontSize(10);
  doc.setFont("NotoSans", "normal");
  doc.setTextColor(255, 255, 255);

  let yPosition = pageHeight - 40;
  doc.text("AstroLumina", pageWidth - 20, yPosition, { align: "right" });
  yPosition += 6;
  doc.text(`Email: astrolumina@gmail.com`, pageWidth - 20, yPosition, {
    align: "right",
  });
  yPosition += 6;
  doc.text(`Telefon: 0722 123 456`, pageWidth - 20, yPosition, {
    align: "right",
  });
  yPosition += 6;
  doc.text("www.astrolumina.ro", pageWidth - 20, yPosition, { align: "right" });
};
