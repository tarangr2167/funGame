import { AnimatePresence } from 'framer-motion'
import { useCallback, useState } from 'react'
import { apologyConfig, type ApologyStep as JourneyStep } from './config'
import BackgroundEffects from './components/BackgroundEffects'
import CursorHeartTrail from './components/CursorHeartTrail'
import MusicToggle from './components/MusicToggle'
import OpeningStep from './components/steps/OpeningStep'
import ApologyMessageStep from './components/steps/ApologyStep'
import PromiseStep from './components/steps/PromiseStep'
import LoveStep from './components/steps/LoveStep'
import ForgivenessStep from './components/steps/ForgivenessStep'
import CelebrationStep from './components/steps/CelebrationStep'

function App() {
  const [step, setStep] = useState<JourneyStep>('opening')

  const goTo = useCallback((next: JourneyStep) => {
    setStep(next)
  }, [])

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-[#2b0f24] text-white">
      <BackgroundEffects intensify={step === 'celebration'} />
      <CursorHeartTrail />
      <MusicToggle src={apologyConfig.musicPath} />

      <main className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-14 sm:px-6 sm:py-16">
        <AnimatePresence mode="wait">
          {step === 'opening' && (
            <OpeningStep key="opening" onContinue={() => goTo('apology')} />
          )}
          {step === 'apology' && (
            <ApologyMessageStep key="apology" onContinue={() => goTo('promise')} />
          )}
          {step === 'promise' && (
            <PromiseStep key="promise" onContinue={() => goTo('love')} />
          )}
          {step === 'love' && (
            <LoveStep key="love" onContinue={() => goTo('forgiveness')} />
          )}
          {step === 'forgiveness' && (
            <ForgivenessStep
              key="forgiveness"
              onForgive={() => goTo('celebration')}
            />
          )}
          {step === 'celebration' && <CelebrationStep key="celebration" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
