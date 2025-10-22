# 📱 Kiss Brownie – App de Controle Financeiro e Lista de Tarefas

Este projeto foi desenvolvido como parte da disciplina **Projeto de Extensão e Inovação Interdisciplinar II**. O objetivo foi criar um aplicativo para a **Kiss Brownie**, com foco na organização de tarefas e no controle financeiro, visando facilitar a rotina de gestão do negócio.

## ✅ Funcionalidades

- Gerenciamento de tarefas (criação, conclusão, exclusão)
- Controle financeiro simples (registro de receitas e despesas)
- Proteção de acesso via PIN
- Armazenamento local utilizando `AsyncStorage`

---

## 🛠 Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [React Navigation](https://reactnavigation.org/)
- JavaScript (ES6+)

---

## ⚙️ Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clone o repositório

```bash
git clone https://github.com/danielmccastro/projeto-pei-2-kiss-brownie.git
cd projeto-pei-2-kiss-brownie
```
### 2. Instale as dependências

Certifique-se de que você tem o Node.js instalado. Depois, execute:

```bash
npm install
```
### 3. Configure o ambiente

Crie um arquivo .env na raiz do projeto com base no arquivo .env.example:

```bash
cp .env.example .env
```
Edite o arquivo .env com o PIN desejado (esse PIN será solicitado ao abrir o app):

```bash
APP_PIN=1234
```
🔐 O PIN é usado para proteger o acesso ao aplicativo. Não há sistema de autenticação com usuário/senha – o PIN é uma medida local de segurança.

### 4. Inicie o aplicativo

Inicie o servidor de desenvolvimento com o Expo:

```bash
npx expo start
```
Use o app Expo Go no seu celular para escanear o QR Code exibido no terminal ou no navegador e executar o aplicativo.

## 🧪 Estrutura do Projeto
.<br>
├── assets/             # Imagens e ícones<br>
├── components/         # Componentes reutilizáveis<br>
├── screens/            # Telas do app (tarefas, finanças, etc.)<br>
├── storage/            # Manipulação do AsyncStorage<br>
├── App.js              # Componente principal do app<br>
├── .env.example        # Exemplo de variáveis de ambiente<br>
└── ...

## 📄 .env.example
PIN de acesso ao app

```bash
APP_PIN=1234
```
## 👨‍💻 Desenvolvedores

Cristian Oliveira Rocha<br>
Daniel M C de Castro<br>
Guilherme Fonseca Wandekoe Ken Filho<br>
Jhonattan Francisco de Souza<br>
Matheus Lucas dos S F Sacramento<br>