// components/VentasCharts.jsx
import { useMemo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

import { useVentasChartData } from "../Hooks/useVentasChart";
const CHART_COLOR = "#FF5A00";

function ChartCard({ title, children }) {
    return (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
                {title}
            </Typography>
            {children}
        </Paper>
    );
}

export default function VentasGraficos({ ventas }) {
    const { ventasPorVendedor, ventasPorProducto, ventasPorFecha, ventasProductoMenosVendidos, ventasPorSucursal } = useVentasChartData(ventas);

    if (!ventas || ventas.length === 0) return null;

    return (
        <Box sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            p: { xs: 2, sm: 3 },
        }}>

            {/* Ventas por Vendedor */}
            <ChartCard title="Ventas por vendedor (₡)">
                <BarChart
                    xAxis={[{
                        data: ventasPorVendedor.labels,
                        scaleType: "band",
                        tickLabelStyle: { fontSize: 11 },
                    }]}
                    series={[{
                        data: ventasPorVendedor.values,
                        label: "Monto total",
                        color: CHART_COLOR,
                        valueFormatter: (v) => `₡${v?.toLocaleString()}`,
                    }]}
                    height={300}
                    margin={{ left: 70, bottom: 60 }}
                />
            </ChartCard>

            {/* Ventas por Producto (top 10) */}
            <ChartCard title="Top 20 productos por cantidad vendida">
                <BarChart
                    layout="horizontal"
                    yAxis={[{
                        data: ventasPorProducto.labels,
                        scaleType: "band",
                        tickLabelStyle: { fontSize: 9 },
                    }]}
                    xAxis={[{ label: "Cantidad" }]}
                    series={[{
                        data: ventasPorProducto.values,
                        label: "Cantidad",
                        color: CHART_COLOR,
                        valueFormatter: (v) => `${v} uds`,
                    }]}
                    height={340}
                    margin={{ left: 100, right: 20 }}
                />
            </ChartCard>

            <ChartCard title="Top 20 productos menos vendidos">
                <BarChart
                    layout="horizontal"
                    yAxis={[{
                        data: ventasProductoMenosVendidos.labels,
                        scaleType: "band",
                        tickLabelStyle: { fontSize: 10 },
                    }]}
                    xAxis={[{ label: "Cantidad" }]}
                    series={[{
                        data: ventasProductoMenosVendidos.values,
                        label: "Cantidad",
                        color: CHART_COLOR,
                        valueFormatter: (v) => `${v} uds`,
                    }]}
                    height={340}
                    margin={{ left: 180, right: 20 }}
                />
            </ChartCard>

            <ChartCard title="Ventas por sucursal (₡)">
                <BarChart
                    xAxis={[{
                        data: ventasPorSucursal.labels,
                        scaleType: "band",
                        tickLabelStyle: { fontSize: 10 },
                    }]}
                    series={[{
                        data: ventasPorSucursal.values,
                        label: "Monto total",
                        color: CHART_COLOR,
                        valueFormatter: (v) => `₡${v?.toLocaleString()}`,
                    }]}
                    height={300}
                    margin={{ left: 70, bottom: 80 }}
                    barLabel="value"
                />
            </ChartCard>

            {/* Ventas por Fecha — ocupa las 2 columnas */}
            <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
                <ChartCard title="Monto total de ventas por fecha">
                    <LineChart
                        xAxis={[{
                            data: ventasPorFecha.labels,
                            scaleType: "point",
                            tickLabelStyle: { fontSize: 10 },
                        }]}
                        series={[{
                            data: ventasPorFecha.values,
                            label: "Monto total",
                            color: CHART_COLOR,
                            area: true,
                            valueFormatter: (v) => `₡${v?.toLocaleString()}`,
                        }]}
                        height={300}
                        margin={{ left: 80, bottom: 60 }}
                    />
                </ChartCard>
            </Box>

        </Box>
    );
}