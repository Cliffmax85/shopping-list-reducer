import Header from "./components/Header";
import { ListProvider } from "./context/ListProvider";
import List from './List';

export default function App() {
  return (
    <>
      <ListProvider>
        <Header />
        <List />
      </ListProvider>
    </>
  );
}
