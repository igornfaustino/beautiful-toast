import Content from "./components/Content";
import { ToastProvider } from "./components/ToastProvider";

function App() {
  return (
    <div>
      <ToastProvider>
        <Content />
      </ToastProvider>
    </div>
  );
}

export default App;
