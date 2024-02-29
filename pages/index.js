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
    question: `What is the target temperature to make Mars habitable?`,
    answerType: 'text',
    answers: [
      '8',
      '+8',
      '8 degrees',
      '8 degrees celsius',
      '8°C'
    ],
    placeholder: 'Tempratures are going up, Deimos is going down...'
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
    placeholder: 'İki kelime, hayli yerli...'
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
    placeholder: 'Based on a tv show, based on a tv show...'
  },
  {
    type: 'question',
    year: 1967,
    yearText: '1967',
    event: "Kutná Hora",
    question: 'Built from the 14th to the 19th century, this building in Kutná Hora  blends late Gothic and Renaissance architectural styles. What is its name?',
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
    question: "What is the name of the society where thinkers and industrialists regularly gathered in Birmingham under the full moon during the Industrial Revolution?",
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
    placeholder: 'Two characters from the game in the society...'
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
      "silk"
    ],
    placeholder: 'The longest road...'
  },
  { 
    type: 'notification',
    year: 300,
    event: "???",
    yearText: '????',
    title: `Good job! You've unlocked your gift`,
    description: 'Find it behind the Terraforming Mars box',
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
    var audio = new Audio('/audio/new.mp3');

    
    mainInputRef.current?.blur();
    //setFormClassName(styles.invisible);
    setFormClassName(styles.correct)
    setQuestionClassName(styles.invisible);
    audio.currentTime = 0.58
    audio.play();

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

    if (steps[activeStep].answerType === 'number') {
      const answerNumber = Number(answer);
      if (answerNumber >= steps[activeStep].answerRange.min && answerNumber <= steps[activeStep].answerRange.max) {
        switchToNextQuestion();
      } else {
        showErrorMessage();
      }
    }

    if(steps[activeStep].answerType === 'text') {
      if(steps[activeStep].answers.includes(answer.trim())) {
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
