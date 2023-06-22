import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoProfessores = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("https://demo6213899.mockable.io/professores")
      .then((response) => {
        const professores = response.data.lista.map((c) => {
          return {
            id: c.id,
            matricula: c.matricula,
            nome: c.nome,
            idEndereco: c.idEndereco,
            curso: c.curso,
          };
        });
        setData(professores);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("https://demo6213899.mockable.io/professores", {
        id: newData.id,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put("https://demo6213899.mockable.io/professores", {
        id: newData.id,
        matricula: newData.matricula,
        nome: newData.nome,
        idEndereco: newData.idEndereco,
        curso: newData.curso,
      })
      .then(function (response) {
        console.log("Atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete("https://demo6213899.mockable.io/professores", {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Deletado com sucesso.");
      });
  }

  return [
    <MaterialTable
      title="Gerenciamento de Professores"
      columns={[
        { title: "Id", field: "id" },
        { title: "matricula", field: "matricula", },
        { title: "nome", field: "nome" },
        { title: "endereco", field: "idEndereco" },
        { title: "curso", field: "curso" },
      ]}
      data={data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleCreate(newData);

              const dataCreate = [...data];

              setData([...dataCreate, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleDelete(oldData);
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />,
  ];
};

export default GerenciamentoProfessores;
