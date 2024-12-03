import React from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

interface InformeUsuarioOption {
  tabledata: Array<{
    nombre: string;
    login: string;
    password: number;
    rol: string;
  }>;
}

function InformeUsuario({ tabledata }: InformeUsuarioOption) {
  const col = [
    { title: "Nombre", field: "nombre", filtering: true },
    { title: "Login", field: "login", filtering: false },
    { title: "Password", field: "password", filtering: false },
    { title: "Rol", field: "rol", filtering: false },
  ];

  return (
    <div>
      <MaterialTable
        title="Informe Usuario"
        columns={col}
        data={tabledata}
        options={{
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformeUsuario"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeUsuario"),
            },
          ],
          headerStyle: {
            backgroundColor: "#fd4545",
            color: "white"
          },
          filtering: true,
          draggable: false,
        }}
      />
    </div>
  );
}

export default InformeUsuario;
