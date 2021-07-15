import { ReactNode } from "react";
import { Page } from "../context/AppContext";
import useAppContextActions from "../hooks/useAppContextActions";

interface RouteProps {
  component: JSX.Element;
  match: Page;
}

const Route: (props: RouteProps) => JSX.Element | null = ({
  component,
  match,
}) => {
  const { currentPage } = useAppContextActions();

  return currentPage === match ? component : null;
};

export default Route;
