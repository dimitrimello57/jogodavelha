import React, { useState } from 'react';

/* Armazenar valores preenchidos */
function getInitialState() {
  const state = {};
  for (let r = 0; r < 3; r++) { /* Linhas */
    for (let c = 0; c < 3; c++) { /* Colunas */
      state[`${r}-${c}`] = null;
    }
  }
  return state;
}

const getKeyFromIndex = (index) => {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return `${row}-${col}`;
};

/* Peças X ou O */

const getLabel = (value) => {
  if (!value) {
    return null;
  }
  return value > 0 ? 'O' : 'X';
};

function getWinner(v) { /* Validar se ganhou (LINHA OU COLUNA) */
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const sumLinha =
        v[`${r}-${c}`] +
        v[`${r}-${c + 1}`] +
        v[`${r}-${c + 2}`];
      if (sumLinha === 3 || sumLinha === -3) {
        return sumLinha;
      }

      const sumColuna = /* Ele faz a somatoria da primeira linha para baixo */
        v[`${r}-${c}`] +
        v[`${r + 1}-${c}`] +
        v[`${r + 2}-${c}`];
      if (sumColuna === 3 || sumColuna === -3) {
        return sumColuna;
      }

      const sumDiagonal =
        v[`${r}-${c}`] +
        v[`${r + 1}-${c + 1}`] +
        v[`${r + 2}-${c + 2}`];
      if (sumDiagonal === 3 || sumDiagonal === -3) {
        return sumDiagonal;
      }

      const sumReverseDiagonal =
        v[`${r}-${c}`] +
        v[`${r + 1}-${c - 1}`] +
        v[`${r + 2}-${c - 2}`];
      if (
        sumReverseDiagonal === 3 ||
        sumReverseDiagonal === -3
      ) {
        return sumReverseDiagonal;
      }
    }
  }

  return null;
}

const Game = () => {
  const [values, setValues] = useState(getInitialState);
  const [player, setPlayer] = useState(1);
  const [winner, setWinner] = useState(null);


  /* Função de Click */

  function handleClick(key) {
    if (winner || values[key]) { /* Verificar se já houve um click - NÃO PERMITE OUTRO CLICK*/
      return;
    }
    const newValues = { /* Garantir os valores atualizados */
      ...values,
      [key]: player
    };
    setValues(newValues);
    setPlayer(player * -1);
    const newWinner = getWinner(newValues);

    if (newWinner) {
      setWinner(newWinner > 0 ? 1 : -1);
    }
  }

  function reset() { /* Função para recomeçar o jogo */
    setWinner(null);
    setValues(getInitialState);
    setPlayer(1);
  }

  const itsATie =
    Object.values(values).filter(Boolean).length === 9 && !winner;

  return (
    <div className="Game">
      <div className="Game__board">
        {Array.from({ length: 9 }).map((_, index) => { const key = getKeyFromIndex(index);
          return (
            <button
              key={index}
              type="button" onClick={() => handleClick(key)}
            >
              {getLabel(values[key])}
            </button>
          );
        })}
      </div>


      {(winner || itsATie) && ( /* Parte do vencedor */
        <div className="Game__menu"> 
          {winner ? (
            <p>O vencedor foi: {winner > 0 ? 'O' : 'X'}</p>
          ) : (
            <p>Houve um empate</p>
          )}
          <button class="buttonR" onClick={reset}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Game;