import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { Exo_2 } from 'next/font/google'
import AstroHuntLogo from '@/components/AstrohuntLogo'
import SurpriseIcon from '@/components/SurpriseIcon'
import DownloadIcon from '@/components/DownloadIcon'
import CheckIcon from '@/components/CheckIcon'
import Timeline from '@/components/Timeline'

const exo = Exo_2({ 
  weight: ['300', '400', '500', '600'],
  subsets: ['latin']
 })

const steps = [
  {
    type: 'question',
    year: 2450,
    yearText: '24??',
    event: "Terraforming Mars",
    question: `What's the name of the group of canyons on Mars which will inpire the name of one of biggest cities on the planet, and translates to "the labyrinth of the night"?`,
    answerType: 'text',
    answers: [
      "Noctis Labyrinthus"
    ],
    placeholder: `Answer can be found on one of the boards...`
  },
  {
    type: 'dialog',
    year: 2450,
    imageUrl: '/noctis.png',
    description: `Placed the city on the reserved area.`,
    buttonText: 'Next!'
  },
  {
    type: 'question',
    year: 2050,
    yearText: 'Year 8 - Crisis Era',
    event: "Three Body Problem",
    question: 'Who is the wallbreaker of Lou Ji?',
    answerType: 'text',
    answers: [
      'Lou Ji',
      'lou ji',
      'himself',
      'Himself'
    ],
    placeholder: 'Lou Ji, I am your wallbreaker...'
  },
  {
    type: 'question',
    year: 1974,
    yearText: '1974',
    event: "For All Mankind",
    question: `How did crew of Apollo 22 greet each other frequently?`,
    answerType: 'text',
    answers: [
      "Hi, bob",
      "hi, bob",
      "Hi Bob",
      "hi Bob",
      "Hi, Bob!",
      "hi, Bob!",
      "Hi Bob!",
      "hi Bob!",
      'hi bob',
      'hey bob',
      'Hey Bob',
      'Hey, Bob',
      'hey, bob',
      'hey, Bob',
    ],
    placeholder: 'From a tv show, within a tv show...'
  },
  {
    type: 'dialog',
    year: 1974,
    imageUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemVteWhseGh6cmw2b3Awdzlkczk5aTJpMHJyZnNlMGRvbmJ4cndybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/43PS5W9xIgv5ACiFYv/giphy.gif',
    buttonText: 'Hi Bob!'
  },
  {
    type: 'question',
    year: 1967,
    yearText: '1967',
    event: "Kutná Hora",
    question: "Built from the 14th to the 19th century, this Kutná Hora building combines Gothic and Renaissance styles. What's its name?",
    answerType: 'text',
    answers: [
      "St. Barbara's Church",
      "St. Barbara's church",
      "St Barbara's Church",
      "St Barbara's church",
      "St. Barbara",
      "St Barbara",
      "St. Barbara's",
      "st. barbara",
      "st barbara",
    ],
    placeholder: 'Manken olan...'
  },
  {
    type: 'question',
    year: 1770,
    yearText: '1770',
    question: "What is the name of the society where thinkers and industrialists regularly met in Birmingham under the full moon during the Industrial Revolution?",
    event: "Brass: Birmingham",
    answerType: 'text',
    answers: [
      'Lunar Society',
      'lunar society',
      'Lunar society',
      'Lunar',
      'The Lunar Society',
      'the lunar society'
    ],
    placeholder: 'Two members of this society are mentioned in the game...'
  },
  {
    type: 'dialog',
    year: 1770,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Statue_of_Boulton%2C_Watt_%26_Murdoch_-_Birmingham_-_England_-_01_%2828227285055%29.jpg',
    description: 'Golden boys statue in Birmingham: Matthew Boulton, James Watt and William Murdoch are discussing steam engine plans.',
    buttonText: 'Next! 🚂'
  },
  {
    type: 'question',
    year: 800,
    yearText: '800',
    event: "Catan",
    question: "What is the name of the ancient 'Longest Road' that connected diverse regions for the exchange of goods and cultures for centuries?",
    answerType: 'text',
    answers: [
      "Silk Road",
      "silk road",
      "Silk",
      "silk",
      "The Silk Road",
      "the silk road",
      "silkroad",
      "Silkroad"
    ],
    placeholder: 'Appian Way is a good guess, but not the right one...'
  },
  { 
    type: 'notification',
    year: 300,
    event: "???",
    yearText: '????',
    title: `Yay! You've unlocked the next step!`,
    description: 'Find your gift in the Catan box.',
    icon: SurpriseIcon
  }
]


export default function Home() {

  const mainInputRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0);

  const [formClassName, setFormClassName] = useState(styles.invisible);
  const [questionClassName, setQuestionClassName] = useState(styles.invisible);
  
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFormClassName(styles.visible);
      setQuestionClassName(styles.visible);
      mainInputRef.current?.focus();
    }, 5000)
  }, [])


  function switchToNextQuestion() {
    mainInputRef.current?.blur();
    setFormClassName(styles.correct)
    setQuestionClassName(styles.invisible);

    if(steps[activeStep].type === 'question') {
      const audio = new Audio('/audio/new.mp3');
      audio.currentTime = 0.58
      audio.play();
    }

    setTimeout(() => {
      setActiveStep(activeStep + 1);
    }, 1500)

    setTimeout(() => {
      setInputText('');
      setFormClassName(styles.visible);
      setQuestionClassName(styles.visible);
      mainInputRef.current?.focus();
    }, 4000)
  }

  function showErrorMessage() {
    var audio = new Audio('/audio/error.mp3');
    audio.currentTime = 0.58
    audio.play();

    setInputText('')
    setFormClassName(styles.error)
    setTimeout(() => {
      setFormClassName('')
    }, 500)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answer = mainInputRef.current.value;

    if(steps[activeStep].answerType === 'text') {
      if(steps[activeStep].answers.map(a => a.toLowerCase()).includes(answer.toLowerCase().trim())) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }
  }

  const StepIcon = steps[activeStep]?.icon;

  return (
    <>
      <Head>
        <title>Astrohunt</title>
        <meta name="description" content="A mini tresure hunt for Basak's birthday" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Timeline steps={steps} activeStep={activeStep} />
        </header>
        {steps[activeStep].type === 'question' && (
        <div className={styles.center}>
          <h1 className={[styles.question, questionClassName].join(' ')}>
            <span className={exo.className}>{steps[activeStep].question}</span>
          </h1>
          <form onSubmit={handleSubmit} className={[styles.form, formClassName].join(' ')}>
            <input className={styles.mainInput} 
            autoFocus={true}
            ref={mainInputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={steps[activeStep].placeholder} />
            <button className={styles.submitButton}></button>
          </form>
        </div>)}
        {steps[activeStep].type === 'dialog' && (
          <div className={styles.center}>
            <div className={[styles.dialog, questionClassName].join(' ')}>
              <div className={styles.dialogImage}>
                <img src={steps[activeStep].imageUrl} alt={steps[activeStep].title} />
              </div>
              {(steps[activeStep].title || steps[activeStep].description) && (
                <div className={styles.dialogInner}>
                  {steps[activeStep].title && <h1 className={[styles.dialogTitle, exo.className].join(' ')}>{steps[activeStep].title}</h1>}
                  <p className={[styles.dialogText].join(' ')}>{steps[activeStep].description}</p>
                </div>
              )}
            </div>
            <button onClick={switchToNextQuestion} className={[styles.dialogNextButton, exo.className].join(' ')}>{steps[activeStep].buttonText}</button>
          </div>
        )}
        {steps[activeStep].type === 'notification' && (
          <div className={styles.center}>
            <div className={styles.notification}>
              <div className={styles.notificationIcon}>
                <StepIcon className={styles.stepIcon} />
              </div>
              <div className={styles.notificationText}>

              <h1 className={[styles.notificationTitle, exo.className].join(' ')}>{steps[activeStep].title}</h1>
              <p className={[styles.notificationDescription, exo.className].join(' ')}>{steps[activeStep].description}</p>
              </div>
              {
                steps[activeStep].action === "goToNextStep" && (
                  <button className={[styles.notificationButton, exo.className].join(' ')} onClick={switchToNextQuestion}>
                  <CheckIcon style={{ width: 32, heigth: 32 }} />
                </button>
                )
              }
              {
                steps[activeStep].action === "downloadInvite" && (
                  <a download href='/astroInvite.ics' className={[styles.notificationButton, exo.className].join(' ')} >
                  <DownloadIcon style={{ width: 32, heigth: 32 }} />
                </a>
                )
              }
            </div>
          </div>
        )}
        <footer className={styles.footer}>
          <AstroHuntLogo className={styles.logo} />
          <div className={[styles.footerInner, exo.className].join(' ')}>
          Coded with ♥ for Başak - 2024
          </div>
          
          </footer>
      </main>
    </>
  )
}
