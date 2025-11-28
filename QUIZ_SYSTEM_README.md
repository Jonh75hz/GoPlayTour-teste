# Sistema de Validação de Respostas para Quiz

## 📋 Descrição
Sistema robusto de validação de respostas para charadas nas telas de desafio. O sistema normaliza e compara respostas do usuário com palavras-chave configuráveis, mitigando erros comuns de digitação e formatação.

## 🎯 Funcionalidades

### 1. **Normalização de Respostas** (`quiz-validator.js`)
A função `validateAnswer()` aplica as seguintes regras de pré-processamento:

- **Minúsculas**: Converte toda string para minúsculas
- **Remoção de Acentos**: Remove `á → a`, `ç → c`, etc.
- **Limpeza de Espaços**: Remove espaços extras e múltiplos espaços consecutivos
- **Remoção de Pontuação**: Remove `.`, `,`, `!`, `?`, etc.

### 2. **Lógica de Comparação (AND/OR)**
```javascript
answerKeywords: [
  ["agua", "bica"],        // Deve conter AMBAS as palavras (AND)
  ["agua"],                // OU apenas "agua" 
  ["bica"],                // OU apenas "bica"
  ["fonte", "agua"]        // OU "fonte" AND "agua"
]
```

Se a resposta atender a **QUALQUER UM** dos conjuntos, retorna `true`.

### 3. **Notificações de Resultado**
- **✓ Verde**: Resposta correta (com gradiente verde)
- **✗ Vermelho**: Resposta incorreta (com gradiente vermelho)
- Aparecem por 3 segundos com animação suave

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
1. **`quiz-config.js`** - Configuração de todas as charadas e respostas
2. **`quiz-validator.js`** - Função de validação robusta
3. **`quiz-result.css`** - Estilos para notificações (verde/vermelho)
4. **`quiz-result-notification.js`** - Gerenciador de notificações
5. **`quiz-tests.js`** - Suite de testes para validação

### Modificados:
1. **`desafio_praca_iracema.html`** - Integração do sistema de validação

## 🚀 Como Usar

### Exemplo 1: Adicionar Nova Charada
```javascript
// Em quiz-config.js
export const quizConfig = {
  meu_desafio: {
    question: "Qual é a resposta?",
    hint: "Pense em...",
    answerKeywords: [
      ["palavra1", "palavra2"],  // AND
      ["palavra1"],              // OU
      ["palavra3"]               // OU
    ],
    xpReward: 40
  }
};
```

### Exemplo 2: Validar Resposta Manualmente
```javascript
import { validateAnswer } from './quiz-validator.js';
import { quizConfig } from './quiz-config.js';

const config = quizConfig.praca_iracema;
const userAnswer = "Água da Bica!";
const isCorrect = validateAnswer(userAnswer, config.answerKeywords);
// Retorna: true
```

### Exemplo 3: Debug
```javascript
import { debugValidation } from './quiz-validator.js';

debugValidation("Água da Bica!", [["agua", "bica"]]);
// Imprime no console:
// - Resposta original
// - Resposta normalizada
// - Cada palavra encontrada
// - Resultado de cada conjunto
```

## ✅ Testes

Para validar o funcionamento:
```bash
# Abra o console do navegador em qualquer página que importar quiz-tests.js
# Ou execute em um ambiente Node.js:
node quiz-tests.js
```

Exemplos de testes incluídos:
- ✓ "Água da Bica" → true
- ✓ "agua" → true
- ✓ "ÁGUA DA BICA!" → true
- ✓ "água,,,bica!!!" → true
- ✓ "A água da bica é legal" → true (com palavras extras)
- ✗ "o sol" → false
- ✗ "bic" → false (palavra incompleta)

## 🎨 Personalização

### Mudar Cores das Notificações
Edite `quiz-result.css`:
```css
.result-notification.success {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
}

.result-notification.error {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
}
```

### Mudar Tempo de Exibição
Em `quiz-result-notification.js`, altere o timeout:
```javascript
setTimeout(() => {
    notification.remove();
}, 3000);  // Mude para 4000 para 4 segundos, por exemplo
```

## 📊 Fluxo de Execução

```
1. Usuário digita resposta e clica "Enviar"
2. validateAnswer() normaliza e compara
3. Se correto:
   - Marca como respondido
   - Atualiza barra de progresso para 100%
   - Mostra notificação verde
   - Desabilita inputs
4. Se incorreto:
   - Mostra notificação vermelha
   - Limpa input
   - Permite nova tentativa
```

## 🔍 Exemplos de Respostas Aceitas (Praça de Iracema)

Todas essas respostas retornam `true`:
- "Água da Bica"
- "agua"
- "bica"
- "ÁGUA DA BICA!"
- "água, da bica!"
- "A água é da bica"
- "água     bica" (múltiplos espaços)
- "fonte de agua"

## ⚠️ Limitações Conhecidas

- Não aceita sinônimos (ex: "bebida" para "água")
- Palavras-chave devem estar inteiras (ex: "bic" não corresponde a "bica")
- Sensível à ordem das palavras em um conjunto (exigem estar presentes)
- Não reconhece variações de flexão (ex: "bicas" vs "bica")

Para suportar essas features, seria necessário integrar uma biblioteca de NLP ou wordlists.

## 📝 Notas de Desenvolvimento

- O arquivo `quiz-tests.js` é apenas para referência e teste
- Não incluir em produção sem necessidade
- Para adicionar mais desafios, apenas estender `quiz-config.js`
- O validador é agnóstico de UI - pode ser reutilizado em qualquer contexto
