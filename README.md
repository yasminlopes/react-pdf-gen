# react-pdf-gen

A library for generating PDFs with specific layouts using React and @react-pdf/renderer.

## Installation

```bash
npm install react-pdf-gen
```

## Usage

This library provides a hook called `usePdf` to generate and manage PDFs. Below is an example of how to use it.

Methods
 - `save(exportData: ExportData, fileName: string)`: Generates a PDF and saves it with the specified file name

- `openInNewTab`(exportData: ExportData)`: Generates a PDF and opens it in a new browser tab

- `print(exportData: ExportData)`: Generates a PDF and opens it in a new browser tab, then triggers the print dialog.