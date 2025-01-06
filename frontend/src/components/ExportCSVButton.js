import React from 'react';
import { exportToCsv } from '../services/api';

const ExportCsv = () => {
    const handleExport = async () => {
        try {
            const response = await exportToCsv();
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'filtered_queries.csv';
            link.click();
        } catch (error) {
            console.error('Error exporting CSV:', error);
        }
    };

    return <button onClick={handleExport}>Export to CSV</button>;
};

export default ExportCsv;
