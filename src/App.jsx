import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import './App.css'

function SummarySection({scores}) {
  const average = scores.reduce((acc, cur) => acc + cur.score, 0) / scores.length;

  const assess = (score) => {
    if (score >= 65) {
      return {
        'summary': 'Great',
        'description': 'You scored higher than 65% of the people who have taken these tests.'
      }
    } else if (score >= 50) {
      return {
        'summary': 'Good',
        'description': 'You scored higher than 50% of the people who have taken these tests.'
      }
    } else if (score >= 35) {
      return {
        'summary': 'Fair',
        'description': 'You scored higher than 35% of the people who have taken these tests.'
      }
    } else {
      return {
        'summary': 'Poor',
        'description': 'You scored lower than 35% of the people who have taken these tests.'
      }
    }
  };

  const assessment = assess(average);

  return (
    <section className="summary-section">
      <h1>Your Result</h1>
      <h2><span>{average.toFixed(0)}</span> out of 100</h2>
      <h3>{assessment.summary}</h3>
      <p>{assessment.description}</p>
    </section>
  )
}

function ResultCard({score}) {
  return (
    <div className={`result-card ${score.category.toLowerCase()}`}>
      <span className='category'>{score.category}</span>      
      <span className='score'><em>{score.score}</em>/100</span>
    </div>
  )
}

function DetailSection({scores}) {
  return (
    <section className="detail-section">
      <h1>Summary</h1>
      {
        scores.map(score =>
          <ResultCard key={score.category} score={score}/>
        )
      }
      <button className="continue-button">Continue</button>
    </section>
  )
}

function MainContainer({children}) {
  return (
    <main>
      {children}
    </main>
  )
}

function App() {
  const [scores, setScores] = useState([]);

  useEffect(()=>{
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setScores(data);
      })
      .catch((err)=> {
        console.log(err);
      })
  }, []);

  return (
    <MainContainer>
      <SummarySection scores={scores}/>
      <DetailSection scores={scores}/>
    </MainContainer>
  )
}

export default App
