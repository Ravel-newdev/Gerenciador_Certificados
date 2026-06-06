import "../styles/Tabela.css";
//basicamente o design padrão pras tabelas
function Tabela({ colunas, dados, onEditar, onDeletar, onPDF }) {
  return (
    <div className="tabela-container">
      <table className="tabela">
        <thead>
          <tr>
            {colunas.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={colunas.length + 1} className="tabela-vazia">
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            dados.map((item) => (
              <tr key={item.id}>
                {colunas.map((col) => (
                  <td key={col.key}>{item[col.key]}</td>
                ))}
                <td className="tabela-acoes">
                  {onPDF && (
                    <button
                      className="btn-pdf"
                      onClick={() => onPDF(item)}
                      title="Baixar PDF"
                    >
                      PDF
                    </button>
                  )}
                  <button
                    className="btn-editar"
                    onClick={() => onEditar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-deletar"
                    onClick={() => onDeletar(item.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tabela;