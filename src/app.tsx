import Ticks from "./components/ticks";
import Spacer from "./components/spacer";
import MorseCodeInput from "./features/morse-code-input/ui/morse-code-input";
import MorseVisualizer from "./features/morse-visualizer/ui/morse-visualizer";

function App() {
  return (
    <>
      <section id="input-area">
        <MorseCodeInput></MorseCodeInput>
      </section>

      <Ticks />

      <section id="morse-visualizer">
        <MorseVisualizer></MorseVisualizer>
      </section>

      <Ticks />
      <Spacer />
    </>
  );
}

export default App;
