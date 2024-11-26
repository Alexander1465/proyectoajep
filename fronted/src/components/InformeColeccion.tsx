import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface InformeColeccionOption {
  tabledata: Array<{
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
  }>;
}

function InformeColeccion({ tabledata }: InformeColeccionOption) {
  const col = [
    { title: "Nombre", field: "nombre", filtering: false },
    { title: "Marca", field: "marca", filtering: true },
    { title: "Tipo", field: "tipo", filtering: true },
    { title: "Precio", field: "precio", filtering: false },
  ];

  return (
    <div>
      <MaterialTable
        title="Informe Colección"
        columns={col}
        data={tabledata}
        options={{
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeColeccion"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeColeccion"),
            },
          ],
          headerStyle: {
            backgroundColor: "#fd4545",
            color: "white"
          },
          filtering: true,
          draggable: false,
        }}
        renderSummaryRow={({ column, data }) =>
          column.field === "precio"
            ? {
                value: data.reduce((agg, row) => agg + row.precio, 0),
                style: { background: "#fd4545", color:"white" },
              }
            : undefined
        }
      />
    </div>
  );
}

export default InformeColeccion;
