// Configuração das charadas e suas respostas corretas
export const quizConfig = {
  praca_iracema: {
    question: "O que é que todo mundo vem ver, mas não dá pra beber?",
    hint: "É algo relacionado à natureza e à água...",
    // Array de conjuntos de palavras-chave (OR logic)
    // O usuário deve conter TODAS as palavras de PELO MENOS UM conjunto
    answerKeywords: [
      ["agua", "bica"]         // "agua" AND "bica" (AMBAS obrigatórias)
    ],
    xpReward: 100
  },
  estacao: {
    question: "Já fui o caminho de ferro por onde passavam os vagões carregados...",
    hint: "Olhe onde o trem costumava guiar; sob a grama está o que restou.",
    // Espera-se conter AMBAS as palavras de ao menos um conjunto
    answerKeywords: [
      ["trilhos", "ferro"],
      ["dormentes", "madeira"]
    ],
    xpReward: 100
  },
  casa_cultura: {
    question: "O que é que todo mundo vem ver, mas não dá pra beber?",
    hint: "Um lugar de arte e história...",
    // Atualizado: usar as palavras-chave fornecidas pelo usuário
    answerKeywords: [
      ["teatro"],
      ["palco", "apresentacao"],
      ["auditorio"]
    ],
    xpReward: 100
  },
  igrejinha_ceu: {
    question: "Estou no ponto mais alto, com vistas para as serras e o vale. Se você olhar pela janela ou for ao mirante, verá a grande extensão de casas, ruas e árvores que se espalha abaixo. O que se revela a seus pés?",
    hint: "Olhe do mirante: o que aparece a seus pés — a cidade, o vale ou a vista?",
    answerKeywords: [
      ["cidade", "vista"],
      ["vale", "ceu"],
      ["panorama"]
    ],
    xpReward: 100
  },
  bica_ipu: {
    question: "Nasço no alto da serra, mas minha queda ruidosa me torna famosa. Sou transparente e essencial para a vida, mas a força com que chego no poço de pedra levanta algo que te refresca e se espalha pelo ar. O que é essa névoa refrescante?",
    hint: "Pense na névoa que sobe da queda: vapor, garoa...",
    answerKeywords: [
      ["nevoa"],
      ["vapor", "agua"],
      ["fumaca", "agua"],
      ["garoa"]
    ],
    xpReward: 100
  }
};
