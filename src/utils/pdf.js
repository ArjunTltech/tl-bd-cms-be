import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

export function generatePdfReport(enquiries, startDate, endDate) {
    return new Promise((resolve, reject) => {
        const marginLeftRight = 30;
        const marginTopBottom = 50;
        const pageWidth = 595.28;
        const pageHeight = 841.89;
        const contentWidth = pageWidth - 2 * marginLeftRight;

        const doc = new PDFDocument({ 
            size: 'A4', 
            margin: marginLeftRight,
            bufferPages: true  // For page numbering
        });
        
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));

        const contentStartX = marginLeftRight;
        const dateRangeText = startDate && endDate
            ? `From ${format(new Date(startDate), 'dd MMM yyyy')} to ${format(new Date(endDate), 'dd MMM yyyy')}`
            : 'Total';

        // Add report title
        doc.fontSize(16).font('Helvetica-Bold').text(`Enquiries Report - ${dateRangeText}`, { align: 'center' });
        doc.moveDown();

        const tableTop = doc.y;
        const headers = [
            'S.No.', 'Name', 'Email', 'Phone', 'Country', 'Business', 'Products', 'Service', 'Message',
            'Status', 'Date'
        ];

        // Adjust column widths to fit on page width
        const columnWidths = [
            30,    // S.No.
            60,    // Name
            70,    // Email
            60,    // Phone
            50,    // Country
            50,    // Business
            60,    // Products
            60,    // Service
            65,    // Message
            40,    // Status
            60     // Date
        ];
        
        // Check if total width fits the page
        const totalTableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
        if (totalTableWidth > contentWidth) {
            // Scale down all columns proportionally
            const scaleFactor = contentWidth / totalTableWidth;
            columnWidths.forEach((width, index) => {
                columnWidths[index] = Math.floor(width * scaleFactor);
            });
        }

        function drawCell(text, x, y, width, rowHeight, isHeader = false) {
            doc.lineWidth(0.5).rect(x, y, width, rowHeight).stroke();
            
            // Handle overflow text with ellipsis for very long content
            let displayText = text || '';
            if (displayText.length > 100) {
                displayText = displayText.substring(0, 97) + '...';
            }
            
            doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
                .fontSize(isHeader ? 8 : 7)
                .text(displayText, x + 2, y + 2, {
                    width: width - 4,
                    align: 'left',
                    lineBreak: true
                });
        }

        function getRowHeight(rowData) {
            let maxHeight = 20; // Minimum row height
            
            rowData.forEach((cellContent, index) => {
                const cellHeight = doc.heightOfString(cellContent || '', { 
                    width: columnWidths[index] - 4, 
                    align: 'left',
                    fontSize: 7
                }) + 4;
                
                maxHeight = Math.max(maxHeight, cellHeight);
            });
            
            return maxHeight;
        }

        // Draw table headers
        let currentX = contentStartX;
        headers.forEach((header, index) => {
            drawCell(header, currentX, tableTop, columnWidths[index], 20, true);
            currentX += columnWidths[index];
        });

        let currentY = tableTop + 20;

        // Draw table rows
        enquiries.forEach((enquiry, index) => {
            const rowData = [
                (index + 1).toString(),
                enquiry.name || 'N/A',
                enquiry.email || 'N/A',
                enquiry.phoneNumber || 'N/A',
                enquiry.country || 'N/A',
                enquiry.business || 'N/A',
                enquiry.products || 'N/A',
                enquiry.service || 'N/A',
                enquiry.message || 'N/A',
                enquiry.status || 'N/A',
                format(new Date(enquiry.createdAt), 'dd MMM yyyy'),
            ];

            // Calculate height needed for this row
            const rowHeight = getRowHeight(rowData);

            // Check if we need a new page
            if (currentY + rowHeight > pageHeight - marginTopBottom) {
                doc.addPage();
                
                // Add headers to new page
                currentY = marginTopBottom;
                currentX = contentStartX;
                
                headers.forEach((header, index) => {
                    drawCell(header, currentX, currentY, columnWidths[index], 20, true);
                    currentX += columnWidths[index];
                });
                
                currentY += 20;
            }

            // Draw row cells
            currentX = contentStartX;
            rowData.forEach((cellContent, index) => {
                drawCell(cellContent, currentX, currentY, columnWidths[index], rowHeight);
                currentX += columnWidths[index];
            });

            currentY += rowHeight;
        });

        // Add page numbers
        let pageCount = doc.bufferedPageRange().count;
        for (let i = 0; i < pageCount; i++) {
            doc.switchToPage(i);
            doc.fontSize(8).text(
                `Page ${i + 1} of ${pageCount}`,
                marginLeftRight,
                pageHeight - marginTopBottom + 20,
                { align: 'center' }
            );
        }

        doc.end();
    });
}