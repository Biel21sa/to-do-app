# 📋 To-Do App

Um aplicativo simples de lista de tarefas desenvolvido em **React Native**, permitindo a criação, conclusão e remoção de tarefas e subtarefas.

## 🚀 Funcionalidades

- ✅ Adicionar tarefas com categorias
- 🔄 Marcar/desmarcar tarefas como concluídas
- 🗑️ Remover tarefas
- ➕ Adicionar subtarefas
- 🔄 Marcar/desmarcar subtarefas como concluídas
- 🗑️ Remover subtarefas
- 🎭 Animação ao renderizar tarefas

## 🛠️ Tecnologias Utilizadas

- **React Native** (para desenvolvimento mobile)
- **TypeScript** (tipagem segura)
- **Animated API** (animações nativas)
- **Styled Components / Stylesheet** (para estilização)

## 📦 Como Rodar o Projeto

### 1️⃣ Clone o Repositório
```sh
git clone https://github.com/seu-usuario/todo-app.git
cd todo-app
```

### 2️⃣ Instale as Dependências
```sh
yarn install  # ou npm install
```

### 3️⃣ Execute o App
```sh
yarn android  # Para Android
yarn ios      # Para iOS (necessário MacOS e Xcode)
```

## 📂 Estrutura do Projeto
```
📦 to-do-app
├── 📂 android
├── 📂 assets
├── 📂 ios
├── 📂 src
│   ├── 📂 app
│   │   │   ├── 📂 toDo
│   │   │   │   ├── 📂 components
│   │   │   │   │   ├── 📂 taskItem
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   └   └   └── styles.tsx
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   └── styles.ts
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   └   └── styles.tsx
├── package.json
├── tsconfig.json
├── app.json
├── yarn.lock
└── README.md
```

## ✨ Melhorias Futuras
- [ ] Sincronização com Firebase ou AsyncStorage
- [ ] Dark Mode
- [ ] Notificações push
- [ ] Exportação de tarefas

## 📌 Contribuição
Se quiser contribuir, sinta-se à vontade para abrir um **Pull Request** ou relatar problemas na aba **Issues**.

## 📜 Licença
Este projeto está licenciado sob a **MIT License**.

