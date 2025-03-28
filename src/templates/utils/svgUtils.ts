/**
 * Utility functions for handling SVG files in PDF generation
 */

/**
 * Converts an SVG to a PNG data URL with specified opacity
 * @param svgUrl - The URL of the SVG file
 * @param opacity - Opacity value between 0 and 1
 * @returns Promise resolving to a data URL
 */
export const svgAsPngDataUrl = (svgUrl: string, opacity: number = 1.0): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create an image element to load the SVG
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      // Set up onload handler to convert to canvas once loaded
      img.onload = () => {
        // Create canvas with the same dimensions as the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Get canvas context and draw the image with opacity
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Apply opacity
          ctx.globalAlpha = opacity;
          ctx.drawImage(img, 0, 0);
          
          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL('image/png');
          resolve(dataUrl);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      // Handle errors
      img.onerror = () => {
        reject(new Error(`Failed to load SVG from ${svgUrl}`));
      };
      
      // Start loading the image
      img.src = svgUrl;
    } catch (error) {
      reject(error);
    }
  });
};
