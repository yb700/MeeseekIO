import AttemptInput from '@/components/AttemptInput';
import Attempts from '@/components/Attempts';
import GameOverModal from '@/components/GameOverModal';
import IntroModal from '@/components/IntroModal';
import RandomCharacterCard from '@/components/RandomCharacterCard';
import StreakDisplay from '@/components/StreakDisplay';
import { useAttempts } from '@/context/AttemptContext';
import { useStreak } from '@/context/StreakContext';
import { Character } from '@/graphql/Schema';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';


export default function Game() {
  const [active, setActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [modalVisible, setModalVisible] = useState(true);
  const [guess, setGuess] = useState<Character>();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const { increase, resetStreak } = useStreak()
  const { addAttempt, resetAttempts } = useAttempts()
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (guess) { addAttempt(guess) }
  }, [addAttempt, guess]);

  useEffect(() => {
    if (isCorrect) {
      increase();
      resetAttempts();
    }
    if (isWrong) {
      setActive(false)
      setGameOver(true);
      setModalVisible(true);
    }
  }, [increase, isCorrect, isWrong, resetAttempts]);

  return (
    <ScrollView className='bg-gray-600 h-full no-scrollbar' contentContainerStyle={{ paddingTop: 64, paddingBottom: 32 }}>
      {(!active && !gameOver) && (
        <IntroModal
          modalVisible={modalVisible}
          isActive={(active: boolean) => setActive(active)}
          isVisible={(visible: boolean) => setModalVisible(visible)}
        />
      )
      }

      {(!active && gameOver) && (
        <GameOverModal
          modalVisible={modalVisible}
          isActive={(active: boolean) => setActive(active)}
          isVisible={(visible: boolean) => setModalVisible(visible)}
          onRetry={() => {
            resetAttempts();
            resetStreak();
            setGuess(undefined);
            setIsWrong(false);
            setIsCorrect(false);
            setRefreshKey(prev => prev + 1);
            setActive(true);
            setModalVisible(false);
          }}
        />
      )
      }



      <StreakDisplay />

      <RandomCharacterCard key={refreshKey} onCorrect={(isMatch: boolean) => setIsCorrect(isMatch)} onWrong={(wrong: boolean) => setIsWrong(wrong)} guess={guess} />
      <AttemptInput onPick={(character) => setGuess(character)} />

      <Attempts />

    </ScrollView>
  );
}