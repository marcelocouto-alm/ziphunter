import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert("Informe o CEP.")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      if (response.data.erro) {
        alert("CEP inválido.")
        setInput('')
        return;
      }
      setCep(response.data)
      setInput('')
    } catch (error) {
      alert("CEP inválido.")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">ZipHunter</h1>

      <div className="containerInput">

        <input type="number" placeholder="Digite seu CEP" value={input} onChange={(event) => setInput(event.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={20} color={"#fff"} />
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
