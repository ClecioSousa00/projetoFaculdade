import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoProjetos = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    axios
      .get("http://localhost:8080/api/projeto")
      .then((response) => {
        const projetos = response.data.map((c) => {
          return {
            id: c.id,
            tituloProjeto: c.tituloProjeto,
            areaProjeto: c.areaProjeto,
            resumo: c.resumo,
            palavraChave1: c.palavraChave1,
            palavraChave2: c.palavraChave2,
            palavraChave3: c.palavraChave3,
            url: c.url,
            idProfessorResponsavel: c.idProfessorResponsavel,
            idAlunoParticipante: c.idAlunoParticipante,
          };
        });
        setData(projetos);
        console.log(projetos);
      })
      .catch((error) => console.log(error));
  }

  function handleCreate(newData) {
    axios
      .post("http://localhost:8080/api/projeto", {
        id: newData.id,
        tituloProjeto: newData.tituloProjeto,
        areaProjeto: newData.areaProjeto,
        resumo: newData.resumo,
        palavraChave1: newData.palavraChave1,
        palavraChave2: newData.palavraChave2,
        palavraChave3: newData.palavraChave3,
        url: newData.url,
        idProfessorResponsavel: newData.idProfessorResponsavel,
        idAlunoParticipante: newData.idAlunoParticipante,
      })
      .then(function (response) {
        console.log("Salvo com sucesso.");
      });
  }

  function handleUpdate(newData) {
    axios
      .put(`http://localhost:8080/api/projeto/update/${newData.id}`, {
        id: newData.id,
        tituloProjeto: newData.tituloProjeto,
        areaProjeto: newData.areaProjeto,
        resumo: newData.resumo,
        palavraChave1: newData.palavraChave1,
        palavraChave2: newData.palavraChave2,
        palavraChave3: newData.palavraChave3,
        url: newData.url,
        idProfessorResponsavel: newData.idProfessorResponsavel,
        idAlunoParticipante: newData.idAlunoParticipante,
      })
      .then(function (response) {
        console.log("Atualizado com sucesso.");
      });
  }

  function handleDelete(newData) {
    axios
      .delete(`http://localhost:8080/api/projeto/delete/${newData.id}`, {
        id: newData.id,
      })
      .then(function (response) {
        console.log("Deletado com sucesso.");
      });
  }

  return [
    <MaterialTable
      title="Gerenciamento de Projetos"
      columns={[
        { title: "Id", field: "id" },
        { title: "Titulo do projeto", field: "tituloProjeto" },
        { title: "Area do projeto", field: "areaProjeto" },
        { title: "resumo", field: "resumo" },
        { title: "palavra chave 1", field: "palavraChave1" },
        { title: "palavra chave 2", field: "palavraChave2" },
        { title: "palavra chave 3", field: "palavraChave3" },
        { title: "Url", field: "url" },
        { title: "id do professor", field: "idProfessorResponsavel" },
        { title: "id do aluno", field: "idAlunoParticipante" },
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
              handleUpdate(newData);
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

export default GerenciamentoProjetos;
