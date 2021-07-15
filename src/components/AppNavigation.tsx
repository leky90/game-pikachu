import { FC, MouseEventHandler } from "react";

type AppNavigationProps = {
  navItems: { label: string; action: MouseEventHandler }[];
};

const AppNavigation: FC<AppNavigationProps> = ({ navItems }) => {
  return (
    <nav className="navigation">
      {navItems.map(({ label, action }, index) => (
        <button key={`nav-${index}`} onClick={action}>
          {label}
        </button>
      ))}
    </nav>
  );
};

export default AppNavigation;
