import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "./services/UserProvider";
import UserPanel from "./components/UserPanel/UserPanel";
import UsersList from "./components/UsersList/UsersList";
import { ErrorProvider } from "./services/ErrorProvider";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

export default function Home() {
  return (
    <main>
      <ErrorProvider>
        <UserProvider>
          <ErrorMessage />
          <UserPanel></UserPanel>
          <UsersList></UsersList>
        </UserProvider>
      </ErrorProvider>
    </main>
  );
}
