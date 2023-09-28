import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "./services/UserProvider";
import UserPanel from "./components/UserPanel/UserPanel";
import UsersList from "./components/UsersList/UsersList";

export default function Home() {
  return (
    <main>
      <UserProvider>
        <UserPanel></UserPanel>
        <UsersList></UsersList>
      </UserProvider>
    </main>
  );
}
