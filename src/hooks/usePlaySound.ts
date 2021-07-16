import useSound from "use-sound";

import menuOpen from "../assets/sound/menu-open.mp3";
import disableSound from "../assets/sound/disable-sound.mp3";
import enableSound from "../assets/sound/enable-sound.mp3";
import biteSound from "../assets/sound/bite.mp3";
import fanfareSound from "../assets/sound/fanfare.mp3";
import glugSound from "../assets/sound/glug-a.mp3";
import risingPopSound from "../assets/sound/rising-pops.mp3";
import completeGameSound from "../assets/sound/game-completion.wav";
import failedGameSound from "../assets/sound/gamers-fail-game.mp3";
import nearlyEndTimeSound from "../assets/sound/time-limited.wav";
import gameSong from "../assets/sound/1-trieu-like.mp3";

export default function usePlaySound() {
  const defaultConfigSound = { interrupt: true };
  const [playMenuOpen] = useSound(menuOpen, defaultConfigSound);
  const [playDisableSound] = useSound(disableSound, defaultConfigSound);
  const [playEnableSound] = useSound(enableSound, defaultConfigSound);
  const [playFanfareSound] = useSound(fanfareSound, defaultConfigSound);
  const [playGlugSound] = useSound(glugSound, defaultConfigSound);
  const [playBiteSound] = useSound(biteSound, defaultConfigSound);
  const [playRisingPopSound] = useSound(risingPopSound, defaultConfigSound);
  const [playNearlyEndTimeSound] = useSound(
    nearlyEndTimeSound,
    defaultConfigSound
  );
  const [playCompleteGameSound] = useSound(
    completeGameSound,
    defaultConfigSound
  );
  const [playFailedGameSound] = useSound(failedGameSound, defaultConfigSound);
  const [
    playGameSong,
    { stop: stopGameSong, pause: pauseGameSong, duration: durationGameSong },
  ] = useSound(gameSong, defaultConfigSound);

  return {
    playMenuOpen,
    playDisableSound,
    playEnableSound,
    playFanfareSound,
    playGlugSound,
    playBiteSound,
    playRisingPopSound,
    playNearlyEndTimeSound,
    playFailedGameSound,
    playCompleteGameSound,
    playGameSong,
    stopGameSong,
    pauseGameSong,
    durationGameSong,
  };
}
