import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function Favoritos() {

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primescreemtime");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);
  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id);
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primescreemtime", JSON.stringify(filtroFilmes));
    toast.success("Filmes removido com sucesso!")
  }
  return (
    <div className='meus-filmes'>
      <h1> Minha lista de filmes</h1>
      {filmes.length === 0 && <span>Você não possue nenhum filme salvo :(</span>

      }
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detelhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Favoritos;