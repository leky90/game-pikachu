import AppNavigation from "../components/AppNavigation";
import { Page } from "../context/AppContext";
import useAppContextActions from "../hooks/useAppContextActions";
import usePlaySound from "../hooks/usePlaySound";

const BoardGamePage = () => {
  const { navigate } = useAppContextActions();
  const { playMenuOpen } = usePlaySound();

  const navItems = [
    {
      label: "Play game",
      action: () => {
        playMenuOpen();
        navigate(Page.POKEMON);
      },
    },
  ];

  return (
    <div className="main-board">
      <AppNavigation navItems={navItems} />
    </div>
  );
};

export default BoardGamePage;
