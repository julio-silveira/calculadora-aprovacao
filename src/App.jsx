import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { neededAverage, neededScore, passOrNot } from './helpers/calculateScores'

const initialState= {
  mb1: '',
  mb2: '',
  mb3: '',
  mb4: '',
  n1b4: '',
}


function App() {
  const [average, setAverage] = useState(initialState)
  const [fourthAverage, setFourthAverage] = useState(false)
  const [fourthScore, setFourthScore] = useState(false)
  const [openFeedback, setOpenFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleChange =({target: {name, value}}) => {
    const number =  Number(value)
    if(number >=0 && number <= 10){
    setAverage((prevState)=> ({
      ...prevState,
      [name]: value
    }))
  }
  }

  const handleClick = () => {
    const { mb1,mb2,mb3, mb4, n1b4 } =  average
    if(fourthAverage) {
      const isApproved = passOrNot(Number(mb1), Number(mb2),Number(mb3),Number(mb4))
      setFeedbackMessage(isApproved)
      setOpenFeedback(true)
    } else if(fourthScore) {
      const nScore = neededScore(Number(mb1), Number(mb2),Number(mb3),Number(n1b4))
      setFeedbackMessage(nScore)
      setOpenFeedback(true)
    } else {
      const nAverage = neededAverage(Number(mb1), Number(mb2),Number(mb3))
      setFeedbackMessage(nAverage)
      setOpenFeedback(true)
    }
  }

  const disableButton = () => {
    const baseRule = average.mb1 !== '' && average.mb2 !== '' && average.mb3 !== ''
    if(fourthAverage) return baseRule && average.mb4 !== ''
    if(fourthScore) return baseRule && average.n1b4 !== ''
    if(fourthAverage === false && fourthScore === false) return baseRule
  }

  const restartBtn = () => {
    setOpenFeedback(false)
    setFeedbackMessage('')
    setAverage(initialState)
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minHeight: '100vh'}}>
     <Typography variant='h4'>Calculadora de média anual</Typography>
     <Stack spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px'}}>
     <Typography variant='body1'>Insira as médias nos campos abaixo.</Typography>
     <TextField
        sx={{width: '200px'}}
        onChange={handleChange}
        value={average.mb1}
        name="mb1"
        type="number"
        label="Média 1º Bimestre"
        variant="outlined"
      />
     <TextField
        sx={{width: '200px'}}
        onChange={handleChange}
        value={average.mb2}
        name="mb2"
        type="number"
        label="Média 2º Bimestre"
        variant="outlined"
      />
      <TextField
        sx={{width: '200px'}}
        onChange={handleChange}
        value={average.mb3}
        name="mb3"
        type="number"
        label="Média 3º Bimestre"
        variant="outlined"
      />
    {fourthAverage && (
        <TextField
        sx={{width: '200px'}}
        onChange={handleChange}
        value={average.mb4}
        name="mb4"
        type="number"
        label="Média 4º Bimestre"
        variant="outlined"
      />
      )

      }

      {fourthScore && (
        <TextField
        sx={{width: '200px'}}
        onChange={handleChange}
        value={average.n1b4}
        name="n1b4"
        type="number"
        label="1ª Nota do 4º Bimestre"
        variant="outlined"
      />
      )}


  <Typography sx={{textAlign: 'center  '}} variant='body2'>Marque abaixo caso queira adicionar mais uma nota/media</Typography>
      <FormGroup>
        <FormControlLabel
          disabled={fourthScore}
          control={<Checkbox />}
          value={ fourthAverage}
          onChange={ () => setFourthAverage(!fourthAverage)}
          label="Adicionar média do quarto bimestre"
        />
        <FormControlLabel
          disabled={fourthAverage}
          control={<Checkbox />}
          value={ fourthScore}
          onChange={ () => setFourthScore(!fourthScore)}
          label="Adicionar primeira nota do quarto bimestre" />
      </FormGroup>
      <Button
        disabled={!disableButton()}
        onClick={handleClick}
        type="button"
        variant="contained"
        fullWidth
      >
        Calcular
      </Button>
      { !disableButton() && <Typography sx={{textAlign: 'center  '}} variant='body2'>(Preencha todos campos de média/nota para liberar o botão)</Typography>}
      {openFeedback && (<Typography variant="h6" >{feedbackMessage}</Typography>)}
      {openFeedback && (
      <Button
        onClick={restartBtn}
        type="button"
        variant="contained"
        fullWidth>Reiniciar
      </Button>
      )}
     </Stack>

    </Box>
  )
}

export default App
