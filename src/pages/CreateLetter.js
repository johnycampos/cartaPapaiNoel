import React, { useState, useEffect } from 'react';

import {useHistory} from 'react-router-dom';

import api from '../services/api';

import '../styles/pages/create-letter.css';

import Sidebar from '../components/Sidebar';

function CreateLetter() {
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [letter, setLetter] = useState("");
    const [idade, setIdade] = useState("");
    const [presente, setPresente] = useState("");

    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);

    const history = useHistory();

    function buscarEstados() {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://servicodados.ibge.gov.br/api/v1/localidades/estados`);
            xhr.send(null);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject("Erro");
                    }
                }
            }
        });
    }

    function buscarCidade(state) {
        return new Promise(function (resolve, reject) {

            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
            xhr.send(null);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject("Erro");
                    }
                }
            }
        });
    }

    useEffect(() => {
        buscarEstados().then(function (response) {
            setStateList(response);
        });
    }, []);

    useEffect(() => {
        buscarCidade(state).then(function (response) {
            setCityList(response);
        });
    }, [state]);

    async function handleOnSubmit(e) {
        e.preventDefault();
      
        const data = {
          name,
          idade,
          state,
          city,
          presente,
          letter,
        //   email,
          whatsapp,
        };
      
        if ((!name) || (!state) || (!city) || (!letter)) {
          return alert("Existem campos vazios.");
        }
      
        try {
            // const response = await fetch('http://localhost:3333/save-letter', {

          const response = await fetch('https://cartapapainoelbackend.onrender.com/save-letter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          if (response.ok) {
            alert('Cartinha salva com sucesso!');
            history.push('/result', true);
          } else {
            alert('Erro ao salvar a cartinha!');
          }
        } catch (err) {
          console.error('Erro na requisição:', err);
          alert('Erro ao salvar a cartinha!');
        }
      }

    function handleMask() {
        let value = whatsapp;
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");

        setWhatsapp(value);
    }


    return (
        <div id="page-create-letter">
            {/* <Sidebar /> */}
            <main>
                <form onSubmit={handleOnSubmit} className="create-letter-form">
                    <fieldset>
                        <legend>
                            Cartinha Para o Noel!!!
                        </legend>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="idade">Idade</label>
                            <input id="idade"
                                value={idade}
                                maxLength={2}
                                onChange={(e) => setIdade(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-block">
                                <label htmlFor="state">Estado</label>
                                <select
                                    defaultValue=""
                                    id="state"
                                    value={state}
                                    onChange={(e) => { setState(e.target.value) }}
                                >
                                    <option disabled hidden value="">Selecione uma opção</option>
                                    {stateList.map((option, index) => {
                                        return <option key={index} value={option.sigla}>{option.nome}</option>
                                    })}
                                </select>
                            </div>
                            <div className="input-block">
                                <label htmlFor="city">Cidade</label>
                                <select
                                    defaultValue=""
                                    id="city"
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value) }}
                                >
                                    <option disabled hidden value="">Selecione uma opção</option>
                                    {cityList.map((option, index) => {
                                        return <option key={index} value={option.sigla}>{option.nome}</option>
                                    })}
                                </select>
                            </div>

                        </div>

                        <div className="input-block">
                            <label htmlFor="presente">Qual presente você quer?<span>Escolha até 5!</span></label>
                            <textarea id=""
                                maxLength={10000}
                                value={presente}
                                onChange={(e) => setPresente(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="letter">Me conte algo que você gostaria que acontecesse ou um segredo? <span></span></label>
                            <textarea id="letter"
                                maxLength={10000}
                                value={letter}
                                onChange={(e) => setLetter(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="whatsapp">Numero do WhatsApp</label>
                            <input id="whatsapp"
                                maxLength={15}
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                onKeyUp={handleMask}
                            />
                        </div>

                        


                    </fieldset>

                    <button className="confirm-button" type="submit">
                        Enviar Cartinha
                    </button>
                </form>
            </main>
        </div>
    );
}

// eslint-disable-next-line no-lone-blocks
{/* <div className="input-block">
                            <label htmlFor="email">Email</label>
                            <input id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div> */}
export default CreateLetter;