export const passOrNot = (average1,average2,average3,average4) => {
  const finalAverage = (average1 + average2 + average3 + average4)/4
  if (finalAverage < 1.7) return `Reprovado sem direito a prova final`
  if (finalAverage >= 7) return `Aprovado, a média final nessa disciplina é igual à ${finalAverage}`

  else return `Com essas médias, será necessário tirar ${round(finalExamScore(finalAverage))} pontos na prova final.`
}

const finalExamScore = (finalScore) => (12.6 - 1.52*finalScore)

export const neededAverage = (average1,average2,average3) => {
  const actualAverage = average1 + average2 + average3
  const leftAverage = round((28 - actualAverage))
  return (leftAverage > 10 ) ? ('Mesmo tirando uma média 10 no quarto bimestre, será necessário fazer a prova final.'
  ) :(
    `Você precisa de uma média maior que ${leftAverage } para ser aprovado direto(sem prova final).`
  )
}

export const neededScore =(average1,average2,average3,score4) => {
  const actualAverage = average1 + average2 + average3 + score4/2
  const leftScore = round((28 - actualAverage) *2)
  return (leftScore< 10) ? (
    `Você precisa tirar uma nota maior que ${leftScore} na segunda nota/recuperação para ser aprovado direto(sem prova final).`
    ) : (
    `Mesmo tirando uma nota 10, será necessário fazer a prova final.`
  )
}


const round = (n) => Math.round(n * 10) / 10
