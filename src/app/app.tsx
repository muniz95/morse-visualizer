import MorseCodeInput from "@/features/morse-code-input/ui/morse-code-input";
import MorseVisualizer from "@/features/morse-visualizer/ui/morse-visualizer";
import { MorseCodeInputSection, MorseVisualizerSection } from "./styles";

function App() {
  return (
    <>
      <MorseCodeInputSection id="input-area">
        <MorseCodeInput></MorseCodeInput>
      </MorseCodeInputSection>

      <MorseVisualizerSection id="morse-visualizer">
        <MorseVisualizer></MorseVisualizer>
      </MorseVisualizerSection>
    </>
  );
}

export default App;
