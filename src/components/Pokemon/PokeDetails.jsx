import React from 'react'
import { useParams } from 'react-router-dom';

type PokeDetail = {
  
}

const PokeDetails = () => {

  let { id } = useParams();
  const [PokeDetail, setPokeDetail] = useState<PokeDetail[]:null>(null);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${publicKey}`;

    axios
      .get(url)
      .then((response) => {
        setPokeDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);
  return (
    <>
      <div>

      </div>
    </>
  )
}

export default PokeDetails