# Gerador de Quiz com Groq

Aplicação web que cria de 1 a 5 perguntas de múltipla escolha com base no conteúdo informado. A chamada à API da Groq é feita pelo servidor Express; a chave não é enviada ao navegador nem armazenada no código.

## Requisitos

- Node.js 18 ou superior
- Uma chave de API da Groq, criada no painel oficial da Groq

## Executar localmente

1. Copie `.env.example` para um arquivo chamado `.env`.
2. Abra `.env` e substitua `cole_sua_chave_aqui` pela sua chave da Groq. Não compartilhe esse arquivo nem o envie ao GitHub.
3. Instale as dependências e inicie:

```bash
npm install
npm start
```

4. Abra <http://localhost:3000>.

## Executar com Docker Compose

Crie o arquivo `.env` conforme as instruções acima e execute:

```bash
docker compose up --build
```

Depois abra <http://localhost:3000>.

## Publicar no Render (backend + página no mesmo serviço)

1. Entre em <https://render.com> e conecte sua conta GitHub.
2. Crie um **Blueprint** e selecione este repositório. O arquivo `render.yaml` configura o serviço Node.js.
3. Nas configurações do serviço, adicione a variável secreta `GROQ_API_KEY` com uma chave válida da Groq.
4. Aguarde o deploy e abra a URL `onrender.com` fornecida pelo Render. Use essa URL para o quiz; a URL do GitHub Pages não executa o backend.

Não coloque a chave em `index.html`, no `render.yaml` ou em arquivos enviados ao GitHub.

## Hospedagem

O GitHub Pages hospeda apenas arquivos estáticos e não executa o servidor Express. Para a geração por IA funcionar, publique o projeto em um serviço que execute Node.js/Docker e configure `GROQ_API_KEY` como variável de ambiente no painel desse serviço.

## Segurança

Uma chave enviada em mensagens ou colocada em código público deve ser considerada exposta. Revogue a chave exposta no painel da Groq e crie outra. Nunca adicione o arquivo `.env` ao Git.
