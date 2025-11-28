// Sistema de persistência de progresso no Firebase
import { auth, database } from './firebase-config.js';
import { ref, set, get } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';

/**
 * Salva o progresso de um desafio no Firebase.
 * Trata separadamente o scan do marcador e a resolução da charada.
 *
 * @param {string} challengeId - ID do desafio (ex: 'praca_iracema').
 * @param {number} points - Pontos a serem adicionados para este evento.
 * @param {boolean} isScanEvent - 'true' se o evento for o scan de um marcador. 'false' se for a resolução de uma charada.
 */
export async function saveProgressToFirebase(challengeId, points, isScanEvent = false) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('Usuário não autenticado. Progresso não será salvo no Firebase.');
      return false;
    }

    const progressRef = ref(database, `users/${user.uid}/progress/${challengeId}`);
    const snapshot = await get(progressRef);
    const currentProgress = snapshot.exists() ? snapshot.val() : {
      pontosGanhos: 0,
      completed: false,
      scanCompleted: false // Adiciona um novo campo para rastrear o scan
    };

    let newPoints = currentProgress.pontosGanhos || 0;
    let isRiddleCompleted = currentProgress.completed || false;
    let isScanCompleted = currentProgress.scanCompleted || false;

    if (isScanEvent) {
      // Se for o evento de scan e ainda não foi completado
      if (!isScanCompleted) {
        newPoints += points;
        isScanCompleted = true;
      }
    } else {
      // Se for o evento da charada e ainda não foi completada
      if (!isRiddleCompleted) {
        newPoints += points;
        isRiddleCompleted = true;
      }
    }

    await set(progressRef, {
      completed: isRiddleCompleted, // 'completed' agora se refere apenas à charada
      scanCompleted: isScanCompleted,
      pontosGanhos: newPoints,
      progress: isRiddleCompleted ? 100 : (isScanCompleted ? 50 : 0), // Atualiza o progresso percentual
      lastUpdatedAt: new Date().toISOString()
    });

    console.log(`✓ Progresso do desafio "${challengeId}" salvo. Pontos totais: ${newPoints}`);
    return true;
  } catch (error) {
    console.error('Erro ao salvar progresso no Firebase:', error);
    return false;
  }
}

/**
 * Carrega o progresso de uma charada específica do Firebase
 * @param {string} challengeId - ID do desafio
 * @returns {Promise<Object>} Objeto com dados do progresso ou null se não existir
 */
export async function loadProgressFromFirebase(challengeId) {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      console.warn('Usuário não autenticado. Impossível carregar progresso do Firebase.');
      return null;
    }

    const progressRef = ref(database, `users/${user.uid}/progress/${challengeId}`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      console.log(`✓ Progresso do desafio "${challengeId}" carregado:`, snapshot.val());
      return snapshot.val();
    }

    console.log(`Nenhum progresso encontrado para "${challengeId}"`);
    return null;
  } catch (error) {
    console.error('Erro ao carregar progresso do Firebase:', error);
    return null;
  }
}

/**
 * Carrega todos os progressos do usuário
 * @returns {Promise<Object>} Objeto com todos os progressos
 */
export async function loadAllProgressFromFirebase() {
  try {
    const user = auth.currentUser;
    
    if (!user) {
      console.warn('Usuário não autenticado.');
      return null;
    }

    const progressRef = ref(database, `users/${user.uid}/progress`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      console.log('✓ Todos os progressos carregados:', snapshot.val());
      return snapshot.val();
    }

    return {};
  } catch (error) {
    console.error('Erro ao carregar progressos:', error);
    return null;
  }
}

/**
 * Verifica se uma charada foi completada
 * @param {string} challengeId - ID do desafio
 * @returns {Promise<boolean>} True se foi completada
 */
export async function isChallengeCompleted(challengeId) {
  const progress = await loadProgressFromFirebase(challengeId);
  return progress && progress.completed === true;
}
