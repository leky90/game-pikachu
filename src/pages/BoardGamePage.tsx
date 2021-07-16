import AppNavigation from "../components/AppNavigation";
import { Page } from "../context/AppContext";
import useAppContextActions from "../hooks/useAppContextActions";

const BoardGamePage = () => {
  const { navigate } = useAppContextActions();

  const navItems = [
    { label: "Play game", action: () => navigate(Page.POKEMON) },
  ];

  return (
    <div className="main-board">
      <AppNavigation navItems={navItems} />
    </div>
  );
};

export default BoardGamePage;
