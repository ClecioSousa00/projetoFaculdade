import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const GerenciamentoEndereco = (props) => {
  const { useState, useEffect } = React;

  const [data, setData] = useState([]);

  useEffect(() => {
    handleClick();
  }, []);

  function handleClick() {
    Promise.all([
      axios.get("https://demo6213899.mockable.io/professores"),
      axios.get("https://demo6213899.mockable.io/alunos"),
    ])
      .then(([responseProfessor, responseAluno]) => {
        console.log(responseProfessor.data.lista[0].nome);
        const professors = responseProfessor.data.lista.map((professor) => ({
          id: professor.id,
          nome: professor.nome,
          idEndereco: professor.idEndereco,
        }));
        const students = responseAluno.data.lista.map((aluno) => ({
          id: aluno.id,
          nome: aluno.nome,
          idEndereco: aluno.idEndereco,
        }));
        const allData = [...professors, ...students];
        setData(...data, allData);
      })
      .catch((error) => console.log(error));
  }

  return [
    <MaterialTable
      title="Gerenciamento de Endereços"
      columns={[
        { title: "Id", field: "id" },
        { title: "nome", field: "nome" },
        { title: "endereco", field: "idEndereco" },
      ]}
      data={data}
    />,
  ];
};

export default GerenciamentoEndereco;
