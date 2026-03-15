// hooks/useVentasChartData.js
import { useMemo } from "react";

export function useVentasChartData(ventas) {

    // 1. Ventas por Vendedor — BarChart horizontal
    // xAxis: nombres de vendedores | series: montoTotal sumado
    const ventasPorVendedor = useMemo(() => {
        const map = {};
        ventas.forEach(v => {
            const vendedor = v.nombreVendor || 'Sin vendedor';
            map[vendedor] = (map[vendedor] || 0) + (v.montoTotal || 0);
        });
        const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
        return {
            labels: entries.map(([name]) => name),   // xAxis.data
            values: entries.map(([, val]) => val),    // series[0].data
        };
    }, [ventas]);

    // 2. Ventas por Producto — BarChart horizontal (top 10 por cantidad)
    // xAxis: nombres de producto | series: cantidad total
    const ventasPorProducto = useMemo(() => {
        const map = {};
        ventas.forEach(v => {
            (v.ventaDetalles || []).forEach(d => {
                const key = d.nombreProducto || 'Sin nombre';
                map[key] = (map[key] || 0) + (d.cantidad || 0);
            });
        });
        const entries = Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20);
        return {
            labels: entries.map(([name]) => name),
            values: entries.map(([, val]) => val),
        };
    }, [ventas]);

    const ventasProductoMenosVendidos = useMemo(() => {
        const map = {};
        ventas.forEach(v => {
            (v.ventaDetalles || []).forEach(d => {
                const key = d.nombreProducto || 'Sin nombre';
                map[key] = (map[key] || 0) + (d.cantidad || 0);
            });
        });
        const entries = Object.entries(map)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 10);
        return {
            labels: entries.map(([name]) => name),
            values: entries.map(([, val]) => val),
        };
    }, [ventas]);

    // 3. Ventas por Fecha — LineChart
    // xAxis: fechas ordenadas | series: montoTotal por día
    const ventasPorFecha = useMemo(() => {
        const map = {};
        ventas.forEach(v => {
            const fecha = v.fecha?.split('T')[0];
            if (!fecha) return;
            map[fecha] = (map[fecha] || 0) + (v.montoTotal || 0);
        });
        const entries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
        return {
            labels: entries.map(([fecha]) => fecha),
            values: entries.map(([, val]) => val),
        };
    }, [ventas]);

    const ventasPorSucursal = useMemo(() => {
        const map = {};
        ventas.forEach(v => {
            const sucursal = v.descripcion || 'Sin sucursal';
            map[sucursal] = (map[sucursal] || 0) + (v.montoTotal || 0);
        });
        const entries = Object.entries(map).sort((a, b) => b[1] - a[1]);
        return {
            labels: entries.map(([name]) => name),
            values: entries.map(([, val]) => val),
        };
    }, [ventas]);

    return { ventasPorVendedor, ventasPorProducto, ventasPorFecha, ventasProductoMenosVendidos, ventasPorSucursal };
}