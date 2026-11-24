# Gerador de Quiz com Gemini

Aplicação web que cria perguntas de múltipla escolha a partir do conteúdo informado e permite conferir as respostas no navegador.

## Usar

Abra `index.html` em um navegador moderno, cole sua chave da API do Gemini, informe o conteúdo e escolha de 1 a 5 questões.

Opcionalmente, execute localmente com Node.js:

```bash
npm install
npm start
```

Depois, acesse <http://localhost:3000>.

## Publicar no GitHub Pages

Nas configurações do repositório, abra **Pages**, escolha a branch `main` e a pasta `/ (root)`, e salve. O site será publicado usando o `index.html` deste repositório.

## Chave da API

A chave é digitada pelo usuário no navegador e usada diretamente para chamar a API do Google. Ela não é armazenada pelo site. Não coloque uma chave pessoal no código nem a envie ao GitHub. Para limitar o risco de uso indevido, configure restrições e cotas para a chave no Google AI Studio.
