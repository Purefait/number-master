import useSound from 'use-sound';
import winSound from '../assets/sounds/win.mp3';
import loseSound from '../assets/sounds/lose.mp3';
import clickSound from '../assets/sounds/click.mp3';
import typeSound from '../assets/sounds/type.mp3';

export const useSoundEffects = () => {
  const [playWin] = useSound(winSound, { volume: 0.5 });
  const [playLose] = useSound(loseSound, { volume: 0.5 });
  const [playClick] = useSound(clickSound, { volume: 0.25 });
  const [playType] = useSound(typeSound, { volume: 0.5 });

  return {
    playWin,
    playLose,
    playClick,
    playType
  };
};
