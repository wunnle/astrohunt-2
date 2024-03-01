import { use, useEffect, useState } from 'react';
import styles from './Timeline.module.css';
import { Exo_2 } from 'next/font/google'

const exo = Exo_2({ 
  weight: ['300', '400'],
  subsets: ['latin']
 })

function calculateFlexGrow(year, nextStepYear) {

  if(!nextStepYear) {
    return 30
  }


  const flexGrow = Math.min(Math.max((nextStepYear - year) * 0.6, 30), 150)

  return flexGrow
}


const Step = ({ event, year, yearText, nextStepYear, isVisible, isActive, animationDelay}) => {

  if(!year) {
    return null
  }

  return (
    <div className={`${styles.step} ${isVisible ? styles.stepVisible : ''} ${isActive ? styles.stepActive : ''}`}
      style={{ 
        flexGrow: calculateFlexGrow(year, nextStepYear)
      }}
    >
      <div className={styles.stepVerticalLine} 
      style={{ animationDelay: `${animationDelay}s` }}>
        <div className={styles.stepCircle}></div>
      </div>
      <div className={styles.stepText}>
        <p className={[styles.stepYear, exo.className].join(' ')}>{yearText}</p>
        <p className={[styles.stepTitle, exo.className].join(' ')
        }>{event}</p>
      </div>

    </div>
  );
}

const Timeline = ({ steps, activeStep }) => {

  const activeStepYear = steps[activeStep]?.year
  const [isInitiated, setIsInitiated] = useState(false);
  

  useEffect(() => {
    setTimeout(() => {
      setIsInitiated(true)
    }, 2500);
  }, [])

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineInner}>
      {[...steps]
        .reverse()
        .filter(step => step.type !== "dialog")
        .map((step, index) => (
          <Step key={index} {...step} nextStepYear={[...steps].reverse()[index + 1]?.year} 
          isVisible={isInitiated ? step.year >= activeStepYear : false}
          isActive={isInitiated ? step.year === activeStepYear : false} 
          animationDelay={0 + (index * 0.25)} />
      ))}
      </div>
    </div>
  );
}

export default Timeline;