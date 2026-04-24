const ctx = new AudioContext();

export function playTone(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);

    const duration = durationMs / 1000;
    gain.gain.setValueAtTime(1, ctx.currentTime);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => resolve();
  });
}
