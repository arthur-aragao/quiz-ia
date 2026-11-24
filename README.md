# Gerador de Quiz com Grok

Aplicação web que cria de 1 a 5 perguntas de múltipla escolha com base no conteúdo informado. A chamada à API xAI é feita pelo servidor Express; a chave não é enviada ao navegador nem armazenada no código.

## Requisitos

- Node.js 18 ou superior
- Uma chave de API da xAI, criada no painel oficial da xAI

## Executar localmente

1. Copie `.env.example` para um arquivo chamado `.env`.
2. Abra `.env` e substitua `cole_sua_chave_aqui` pela sua chave da xAI. Não compartilhe esse arquivo nem o envie ao GitHub.
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

## Hospedagem

O GitHub Pages hospeda apenas arquivos estáticos e não executa o servidor Express. Para a geração por IA funcionar, publique o projeto em um serviço que execute Node.js/Docker e configure `GROK_API_KEY` como variável de ambiente no painel desse serviço.

## Segurança

Uma chave enviada em mensagens ou colocada em código público deve ser considerada exposta. Revogue chaves expostas no painel da xAI e crie outra. Nunca adicione o arquivo `.env_ ` ao Git.
