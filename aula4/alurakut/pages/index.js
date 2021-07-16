import styled from 'styled-components';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
        <ul>
            {seguidores.map((itemAtual) => {
              return (
                <li>algo</li>
              );
            })}
        </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const usuarioAleatorio = 'julioapm';
  const [comunidades, setComunidades] =  React.useState([{
    id: '1',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]); //React hooks
  const pessoasFavoritas = ['julioapm','bcopstein'];

  const [seguidores, setSeguidores] = Readct.useState([]);
  React.useEffect(() => {
    fetch('https://api.github.com/users/julioapm/followers')
    .then(response => response.json())
    .then(json => setSeguidores(json));
  }, []);

  return (
    <>
    <AlurakutMenu />
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">Bem vindo(a)</h1>
          <OrkutNostalgicIconSet />
        </Box>
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handlerCriarComunidade(e) {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);
            //console.log(dadosDoForm.get('title'));
            //comunidades.push('Alura Stars');
            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image')
            };
            setComunidades([...comunidades, comunidade]);
            console.log(e);
          }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
        <ul>
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image}/>
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
          <ul>
            {pessoasFavoritas.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`}/>
                    <span>{itemAtual}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  );
}
