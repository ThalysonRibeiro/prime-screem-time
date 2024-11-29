import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import './filme.css';
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "e5b8ec6449951e486a4677a36e4e5195",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme não encontrado");
          navigate("/", { replace: true });
          return;
        })
    }
    loadFilme();

    return () => {
      console.log("compenente foi desmontando");
    }
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLIsta = localStorage.getItem("@primescreemtime");
    let filmesSalvo = JSON.parse(minhaLIsta) || [];
    const hasFilme = filmesSalvo.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("Este filme já está na lista");
      return;
    }

    filmesSalvo.push(filme);
    localStorage.setItem("@primescreemtime", JSON.stringify(filmesSalvo));
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detelhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target="blacnk" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Triler`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}
export default Filme;