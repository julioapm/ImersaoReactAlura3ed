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
  
  const [comunidades, setComunidades] =  React.useState([]); //React hooks
  
  const pessoasFavoritas = ['julioapm','bcopstein'];

  const token = 'a7b7e0da25dd58b5351e9a4f6442df';
  const [seguidores, setSeguidores] = Readct.useState([]);
  React.useEffect(() => {
    //API Rest do GitHub
    fetch('https://api.github.com/users/julioapm/followers')
    .then(response => response.json())
    .then(json => setSeguidores(json));
    //API GraphQL do DatoCMS
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query
        {
          allCommunities
          {
            id
            title
            imageUrl
            creatorSlug
          }
        }`
      }),
    })
    .then(response => response.json())
    .then(json => setComunidades(json.data.allCommunities));
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
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: usuarioAleatorio,
            };
            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade),
            })
            .then(async (response) => {
              const dados = await response.json();
              setComunidades([...comunidades, dados.registroCriado]);
            });
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
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl}/>
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
