import "./home.css";

import { useState, useEffect } from "react";

function Home() {
  // setear los hooks de useState
  const [firstApiData, setFirstApiData] = useState([]);
  const [secondApiData, setSecondApiData] = useState([]);
  const [search, setSearch] = useState("");
  

  // traer los datos de la API
  const firstApi = async () => {
    const response = await fetch("https://api.mercadolibre.com/sites/MLA/search?nickname=BOAN3902135");
    const data = await response.json();
    const dataFilter = data.results.filter(
      (pruductImage) => pruductImage.category_id !== ""
    );
    setFirstApiData(dataFilter);
  };

  const secondApi = async () => {

    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?nickname=BOMA582016&offset=50`);
    const data = await response.json();
    const dataFilter = data.results.filter(
      (pruductImage) => pruductImage.category_id !== ""
    );
    setSecondApiData(dataFilter);
  }

  // funcion de busqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // metodo de filtrado
  let results = [];

  if (!search) {
    // Si no hay término de búsqueda, incluir todos los productos de ambas APIs
    results = [...firstApiData, ...secondApiData];
  } else {
    // Filtrar productos de la primera API
    const filteredProducts = firstApiData.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    // Filtrar productos de la segunda API
    const filteredSecondApiData = secondApiData.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    // Combinar los resultados de ambas APIs
    results = [...filteredProducts, ...filteredSecondApiData];
  }

  useEffect(() => {
    firstApi();
    secondApi();
  }, []);

  return (
    <div>
      <div>
        <form className="">
          <input className="" value={search} onChange={searcher} type="text" placeholder="" />
        </form>
      </div>

      <section className="flex flex-wrap justify-center">
        {results.map((products) => (
          <div key={products.id} className="max-w-xs m-4 w-48">

            <div className="px-6 py-4">
              <a href={products.permalink} target="_blank" rel="noreferrer" >
                <img src={products.thumbnail} alt={products.thumbnail}></img>
              </a>
              <h3 className="text-medium mb-2">{products.title}</h3>
              <p className="text-sm">{products.condition}</p>
              <p className="text-sm">${products.price}</p>
              <p className="text-sm">{products.description}</p>
            </div>

          </div>
        ))}

      </section>
    </div>
  );
}

export default Home;

// app id: 8892546017024037
// Client Secret: fzO4bt0fHHsaXGtN2m6EOuvVva7f7OiI
// https://www.infobae.com/

// https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=8892546017024037&redirect_uri=// https://www.infobae.com/&code_challenge=$CODE_CHALLENGE&code_challenge_method=$CODE_METHOD

// https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=8892546017024037&redirect_uri=https://www.infobae.com/

// code=TG-64c851235c4d9800014473f9-654864083

//"access_token": "APP_USR-8892546017024037-073120-7806bc69469f2c7aeafba9dc4f0581e3-654864083",
// "refresh_token": "TG-64c852ff33fb9b0001232f33-654864083"

// "id": 654864083,
