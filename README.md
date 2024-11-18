# UniNote

UniNote é uma aplicação web desenvolvida com Angular para gerenciar notas acadêmicas de forma simples e intuitiva.

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Como usar](#como-usar)
- [Backend](#backend)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Descrição

**UniNote** permite que usuários armazenem, organizem e gerenciem suas anotações de aula e tarefas acadêmicas em um ambiente online. A aplicação foi projetada para facilitar o acesso e a consulta de informações acadêmicas em um único lugar.

### Funcionalidades
- Cadastro de notas.
- Organização de notas por pastas.

## Instalação

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js (versão mínima: 14.x)
- Angular CLI (versão mínima: 12.x)
- .NET 6 SDK

### Passos

1. Clone o repositório do frontend:

    ```bash
    git clone https://github.com/seu-usuario/uninote.git
    ```

2. Entre no diretório do projeto:

    ```bash
    cd uninote
    ```

3. Instale as dependências do frontend:

    ```bash
    npm install
    ```

4. Execute o servidor de desenvolvimento do frontend:

    ```bash
    ng serve -o
    ```

5. Acesse o frontend no navegador:

    ```
    http://localhost:4200
    ```

### Backend

O backend da aplicação é desenvolvido em .NET 6, e você pode encontrá-lo [aqui](https://github.com/ViiKDev/uninotes-api).

Para rodar o backend localmente, siga os passos abaixo:

1. Clone o repositório do backend:

    ```bash
    git clone https://github.com/ViiKDev/uninotes-api.git
    ```

2. Entre no diretório do backend:

    ```bash
    cd uninotes-api
    ```

3. Restaure as dependências:

    ```bash
    dotnet restore
    ```

4. Execute o backend:

    ```bash
    dotnet run
    ```

5. O backend estará rodando em `http://localhost:5000`.

**Nota**: Certifique-se de que o frontend está configurado para interagir com o backend na URL correta (`http://localhost:5000`).

## Como usar

1. Crie uma conta ou faça login.
2. Cadastre suas notas e organize-as em pastas.
3. Consulte suas anotações sempre que precisar.

<!-- Edite esta seção com mais detalhes quando a interface estiver pronta -->

## Tecnologias Utilizadas

- **Angular** - Framework principal.
- **TypeScript** - Linguagem de programação utilizada.
- **Bootstrap** - Para estilização.
- **.NET 6** - Backend da aplicação.
- **Entity Framework Core** - Para acesso ao banco de dados.
