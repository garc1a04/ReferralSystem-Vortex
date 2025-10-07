## 💡 Desafio: Sistema de Indicação (Referral System)

Uma aplicação web **SPA (Single Page Application)** completa que permite o cadastro de usuários e implementa um sistema de pontos por indicação. Desenvolvido como parte de um desafio técnico, o projeto demonstra a aplicação de boas práticas de arquitetura, desenvolvimento full-stack e responsividade.

---

## 🧭 Sumário

1. [Visão Geral do Projeto](#visao-geral-do-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Arquitetura e Tecnologias Utilizadas](#arquitetura-e-tecnologias-utilizadas)
4. [Como Executar o Projeto Localmente](#como-executar-o-projeto-localmente)
5. [Colaboração com IA 🤖](#colaboracao-com-ia)
6. [Aprendizados](#aprendizados)
7. [Autor](#autor)

---
<a id="visao-geral-do-projeto"></a>
## 🧩 Visão Geral do Projeto

O Referral System é uma aplicação de página única que simula um sistema de recompensas real. A plataforma permite que usuários se cadastrem, recebam um link de indicação exclusivo e acumulem pontos ao trazer novos membros. O projeto foi desenhado com foco na clareza do código, modularidade e na demonstração de habilidades tanto no front-end quanto no back-end.

---

<a id="funcionalidades"></a>
## ⚙️ Funcionalidades {#funcionalidades}

- ✅ Autenticação Segura: Cadastro e Login de usuários com validação de dados em tempo real.

- ✅ Geração de Link Único: Cada usuário recebe um link de indicação exclusivo e pessoal.

- ✅ Sistema de Pontos: Acúmulo automático de pontos para o indicador a cada novo usuário cadastrado pelo seu link.

- ✅ Painel de Controle do Usuário: Uma página de perfil que exibe:

    - Nome e pontuação atual.

    - O link de indicação com um botão funcional para cópia rápida.

    - Uma tabela com todos os usuários indicados por aquela conta.

- ✅ Validação Robusta:
    - Front-end: Validações de formato de e-mail, força da senha (mínimo de 8 caracteres, com letras e números) e confirmação de senha.

    - Back-end: Garante a integridade dos dados antes da persistência no banco.
- ✅ Responsividade: Interface adaptável para uma boa experiência em desktops e dispositivos móveis.

### 🧾 Página de Cadastro
- Campos do login: `nome`, `email`, `senha`.  
- Campos do register: `nome`, `email`, `senha`, `confirmar senha`.  
- Validação front-end:
    - E-mail com formato válido.
    - Senhas não compatíveis
    - Senha com mínimo de 8 caracteres contendo letras e números.
    - Nome com no máximo de 30 caracteres
### 👤 Página de Perfil
- Exibe:
    - Nome do usuário.
    - Pontuação atual (inicia em 0).
    - Link de indicação único.
    - Botão "Copiar Link" para área de transferência.
    - Todos os usuários que se cadastraram pelo link.

### 🔗 Sistema de Indicação
- Quando um novo usuário se cadastra com um link de indicação:
  - O usuário que indicou ganha **1 ponto**.
  - A pontuação é atualizada ao recarregar a página.
---

<a id="arquitetura-e-tecnologias-utilizadas"></a>
## 🏗 Arquitetura e Tecnologias Utilizadas

Este projeto foi construído utilizando uma arquitetura de software bem definida para garantir escalabilidade e manutenibilidade.

- Arquitetura Aplicada

    - Vanilla JS SPA: Construção de uma Single Page Application sem frameworks, focando no domínio das tecnologias base da web.

    - Arquitetura Modular (ES6 Modules): O front-end foi dividido em módulos com responsabilidades claras (api.js, ui.js, auth.js), seguindo o princípio da Separação de Responsabilidades (SoC).

    - MVC (Model-View-Controller): A arquitetura do back-end em Spring Boot segue o padrão MVC, separando o modelo de dados, a lógica de negócio e a camada de apresentação (API).

### 🌐 Front-end
- **Tecnologia:** HTML, CSS & JavaScript (Puro)
- **Motivo da escolha:**  
    A escolha foi focada em demonstrar proficiência nos fundamentos da web. Construir uma SPA "na mão" permite aplicar diretamente padrões de arquitetura como Modularidade e SoC, sem as abstrações de um framework.

- **Principais recursos:**
    - Fetch API para comunicação assíncrona com o back-end.
    - Manipulação do DOM de forma segura e performática para renderizar dados dinâmicos.
    - CSS Flexbox para a criação de layouts fluidos e responsivos.

### ⚙️ Back-end
- **Tecnologia:** Spring Boot (Java)
- **Motivo da escolha:**  
    Framework robusto e amplamente utilizado no mercado, ideal para criar APIs RESTful seguras e eficientes. Sua estrutura opinativa guia para boas práticas de arquitetura em camadas (Controller, Service, Repository) e facilita a configuração de segurança e acesso a dados.

- **Principais recursos:**
  - Endpoints REST (`/user/register`, `/user/login`,  `/user/{id}`,`/ref/{id}`)
  - Spring Data JPA para persistência de dados de forma simplificada.
  - Spring Security para proteger os endpoints.

### 🗄 Banco de Dados
- **MySQL**  
  Um sistema de gerenciamento de banco de dados relacional confiável, seguro e amplamente suportado, ideal para aplicações que exigem consistência de dados.
---

<a id="como-executar-o-projeto-localmente"></a>
## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente de desenvolvimento.

### 🔹 Pré-requisitos
- **Java** 17+  
- **Maven 3.8+** (para o back-end)
- **Node.js v18+** 
- **MySQL Server**  
---

### 🔹 Passo a passo

#### 1. Clone o repositório
```bash
git clone https://github.com/garc1a04/ReferralSystem-Vortex.git
cd ReferralSystem-Vortex
```

### 2. Configure o Back-end
```bash
cd back-end
```
- Configure o banco de dados:
    - Abra o arquivo src/main/resources/application.properties

```properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

- Execute a aplicação
```bash
mvn spring-boot:run
```
A API estará rodando em http://localhost:8080.

### 3. Configure e Rode o Front-end
- Abra um novo terminal e acesse a pasta do front-end:

```bash
cd front-end
```
- Instale o live-server (caso não possua):

```bash
npm install -g live-server
```

- Execute o servidor
```bash
live-server --port=5500 --entry-file=index.html
```
- O navegador abrirá automaticamente a aplicação em um endereço como http://127.0.0.1:5500.

Pronto! Agora você pode testar todas as funcionalidades da aplicação. 
### Vídeo mostrando o projeto: [Assista aqui](nada)

<a id="colaboracao-com-ia"></a>
# 🤖 Colaboração com IA

Utilizei ferramentas de Inteligência Artificial como apoio no desenvolvimento, especialmente para compreender e aplicar o conceito de SPA (Single Page Application) — algo novo para mim.
A partir das sugestões, consegui estruturar uma aplicação onde todas as pages são renderizadas dinamicamente dentro de um único HTML, alternando conforme a rota.

A IA também auxiliou em:

- Análise de códigos e correção de erros.

- Criação de protótipos e compreensão do SPA vanilla.

- Refatoração e revisão estrutural do código.

- Sugestões de modularização e boas práticas.

- Melhorias nas requisições fetch e no código Java com Spring Security (tokens, CORS, etc.).

- Aprimoramento visual das páginas register, login e profile.

- Revisão e refinamento deste README.

Em resumo, a IA funcionou como uma ferramenta de apoio técnico e criativo, ajudando a deixar o projeto mais organizado, eficiente e visualmente agradável.

⚙️ A IA atuou como um code reviewer técnico, auxiliando na clareza, padronização e consistência do projeto.

<a id="aprendizados"></a>
# 🧠 Aprendizados

Durante o desenvolvimento do Referral System, aprofundei conhecimentos em:

- Arquitetura de software e princípios de Separação de Responsabilidades (SoC).

- Construção de SPA do zero, gerenciando estado e navegação manualmente.

- Integração completa entre API REST (Java) e cliente web (JS).

- Validação e tratamento de erros full-stack.

- Uso de ferramentas de IA.
- 
<a id="autor"></a>
# 👨‍💻 Autor
Desenvolvido por Guilherme Garcia Monteiro.

Portifolio: https://garc1a04.github.io/Portifolio
