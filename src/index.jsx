import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { provideGlobalGridOptions } from 'ag-grid-community';

// Register all Community features for ag-grid
ModuleRegistry.registerModules([AllCommunityModule]);

provideGlobalGridOptions({
    localeText: {
        // Botones del filtro
        resetFilter: 'Limpiar',
        applyFilter: 'Aplicar',
        filterOoo: 'Filtrar...',
        clearFilter: 'Limpiar',
        
        // Opciones de filtro
        equals: 'Igual a',
        notEqual: 'No igual a',
        contains: 'Contiene',
        notContains: 'No contiene',
        startsWith: 'Comienza con',
        endsWith: 'Termina con',
        greaterThan: 'Mayor que',
        greaterThanOrEqual: 'Mayor o igual que',
        lessThan: 'Menor que',
        lessThanOrEqual: 'Menor o igual que',
        inRange: 'En rango',
        blank: 'En blanco',
        notBlank: 'No en blanco',
        before: 'Antes de',
        after: 'Después de',

        
        // Operadores lógicos
        filterType: 'Tipo de filtro',
        andCondition: 'Y',
        orCondition: 'O',
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
