import useSound from "use-sound";

import menuOpen from "../assets/sound/menu-open.mp3";
import disableSound from "../assets/sound/disable-sound.mp3";
import enableSound from "../assets/sound/enable-sound.mp3";
import biteSound from "../assets/sound/bite.mp3";
import fanfareSound from "../assets/sound/fanfare.mp3";
import glugSound from "../assets/sound/glug-a.mp3";
import risingPopSound from "../assets/sound/rising-pops.mp3";
import endTimeSound from "../assets/sound/time-limited.wav";

export default function usePlaySound() {
  const [playMenuOpen] = useSound(menuOpen);
  const [playDisableSound] = useSound(disableSound);
  const [playEnableSound] = useSound(enableSound);
  const [playFanfareSound] = useSound(fanfareSound);
  const [playGlugSound] = useSound(glugSound);
  const [playBiteSound] = useSound(biteSound);
  const [playRisingPopSound] = useSound(risingPopSound);
  const [playEndTimeSound] = useSound(endTimeSound);

  return {
    playMenuOpen,
    playDisableSound,
    playEnableSound,
    playFanfareSound,
    playGlugSound,
    playBiteSound,
    playRisingPopSound,
    playEndTimeSound,
  };
}
