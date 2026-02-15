// Metronom App mit verschiedenen Taktarten und Sound-Optionen
interface TimeSignature {
  name: string;
  beats: number;
  noteValue: number;
  accentPattern: number[];
}

interface SoundConfig {
  name: string;
  accentFreq: number;
  normalFreq: number;
  accentVolume: number;
  normalVolume: number;
  duration: number;
}

const timeSignatures: { [key: string]: TimeSignature } = {
  '1/4': { name: '1/4', beats: 1, noteValue: 4, accentPattern: [1] },
  '2/4': { name: '2/4', beats: 2, noteValue: 4, accentPattern: [1, 0] },
  '3/4': { name: '3/4', beats: 3, noteValue: 4, accentPattern: [1, 0, 0] },
  '4/4': { name: '4/4', beats: 4, noteValue: 4, accentPattern: [1, 0, 0, 0] },
  '3/8': { name: '3/8', beats: 3, noteValue: 8, accentPattern: [1, 0, 0] },
  '6/8': { name: '6/8', beats: 6, noteValue: 8, accentPattern: [1, 0, 0, 0, 0, 0] },
  '12/8': { name: '12/8', beats: 12, noteValue: 8, accentPattern: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  'Triplet': { name: 'Triplet', beats: 3, noteValue: 12, accentPattern: [1, 0, 0] },
  '5/4': { name: '5/4', beats: 5, noteValue: 4, accentPattern: [1, 0, 0, 0, 0] },
  '7/8': { name: '7/8', beats: 7, noteValue: 8, accentPattern: [1, 0, 0, 0, 0, 0, 0] },
};

const soundConfigs: { [key: string]: SoundConfig } = {
  'beep': {
    name: 'Beep',
    accentFreq: 1200,
    normalFreq: 800,
    accentVolume: 0.4,
    normalVolume: 0.2,
    duration: 0.1
  },
  'ping': {
    name: 'Ping',
    accentFreq: 1600,
    normalFreq: 1000,
    accentVolume: 0.3,
    normalVolume: 0.15,
    duration: 0.08
  },
  'bell': {
    name: 'Bell',
    accentFreq: 2000,
    normalFreq: 1200,
    accentVolume: 0.5,
    normalVolume: 0.25,
    duration: 0.15
  },
  'click': {
    name: 'Click',
    accentFreq: 1400,
    normalFreq: 600,
    accentVolume: 0.35,
    normalVolume: 0.18,
    duration: 0.07
  },
};

class Metronom {
  private audioContext: AudioContext;
  private isRunning: boolean = false;
  private bpm: number = 120;
  private nextNoteTime: number = 0;
  private scheduleAheadTime: number = 0.1;
  private lookAhead: number = 25.0;
  private timerID: number | null = null;
  private currentBeat: number = 0;
  private timeSignature: TimeSignature = timeSignatures['4/4'];
  private soundConfig: SoundConfig = soundConfigs['beep'];
  private onBeatChange: ((beat: number) => void) | null = null;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  private scheduleNotes(): void {
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime) {
      this.scheduleNote(this.nextNoteTime, this.currentBeat);
      // Call the beat-change callback for the beat we just scheduled (so visuals align with the sound)
      if (this.onBeatChange) {
        this.onBeatChange(this.currentBeat);
      }
      this.nextNoteTime += 60.0 / this.bpm / (this.timeSignature.noteValue / 4);
      this.currentBeat = (this.currentBeat + 1) % this.timeSignature.beats;
    }
  }

  private scheduleNote(time: number, beat: number): void {
    const osc = this.audioContext.createOscillator();
    const env = this.audioContext.createGain();

    const isAccent = this.timeSignature.accentPattern[beat] === 1;
    osc.frequency.value = isAccent ? this.soundConfig.accentFreq : this.soundConfig.normalFreq;
    osc.type = 'sine';

    const volume = isAccent ? this.soundConfig.accentVolume : this.soundConfig.normalVolume;
    env.gain.setValueAtTime(volume, time);
    env.gain.exponentialRampToValueAtTime(0.01, time + this.soundConfig.duration);

    osc.connect(env);
    env.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + this.soundConfig.duration);
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = this.audioContext.currentTime;
    this.timerID = window.setInterval(() => this.scheduleNotes(), this.lookAhead);
  }

  stop(): void {
    this.isRunning = false;
    if (this.timerID !== null) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
    this.currentBeat = 0;
    if (this.onBeatChange) {
      this.onBeatChange(0);
    }
  }

  setBPM(bpm: number): void {
    this.bpm = Math.max(40, Math.min(500, bpm));
  }

  getBPM(): number {
    return this.bpm;
  }

  setTimeSignature(key: string): void {
    if (timeSignatures[key]) {
      this.timeSignature = timeSignatures[key];
      this.currentBeat = 0;
      if (this.onBeatChange) {
        this.onBeatChange(0);
      }
    }
  }

  getTimeSignature(): TimeSignature {
    return this.timeSignature;
  }

  setSoundConfig(key: string): void {
    if (soundConfigs[key]) {
      this.soundConfig = soundConfigs[key];
    }
  }

  getSoundConfig(): SoundConfig {
    return this.soundConfig;
  }

  getIsRunning(): boolean {
    return this.isRunning;
  }

  setOnBeatChange(callback: (beat: number) => void): void {
    this.onBeatChange = callback;
  }
}

// Initialize
const metronom = new Metronom();

const main = (): void => {
  const playBtn = document.getElementById('playBtn') as HTMLButtonElement;
  const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement;
  const bpmInput = document.getElementById('bpmInput') as HTMLInputElement;
  const bpmDisplay = document.getElementById('bpmDisplay') as HTMLElement;
  const timeSignatureSelect = document.getElementById('timeSignatureSelect') as HTMLSelectElement;
  const soundSelect = document.getElementById('soundSelect') as HTMLSelectElement;
  const statusDisplay = document.getElementById('status') as HTMLElement;

  // Update BPM from slider
  bpmInput?.addEventListener('input', () => {
    const bpm = parseInt(bpmInput.value);
    metronom.setBPM(bpm);
    bpmDisplay.textContent = bpm.toString();
  });

  // Make bpmDisplay editable and handle direct input
  if (bpmDisplay) {
    // Single keydown handler: allow digits/navigation, handle Enter to apply and prevent newline
    bpmDisplay.addEventListener('keydown', (e) => {
      // If Enter: apply BPM and prevent inserting newline
      if (e.key === 'Enter') {
        e.preventDefault();
        applyBpmFromDisplay();
        (e.target as HTMLElement).blur();
        return;
      }

      // Allow: digits, Backspace, Delete, Arrow keys, Home/End, Tab
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Tab'];
      if (allowedKeys.includes(e.key)) return;
      // Allow numeric input (0-9)
      if (/^[0-9]$/.test(e.key)) return;
      // Prevent other input
      e.preventDefault();
    });

    // Handle paste - only keep numbers
    bpmDisplay.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || (window as any).clipboardData).getData('text');
      const digits = text.replace(/\D/g, '');
      if (digits.length > 0) {
        document.execCommand('insertText', false, digits);
      }
    });

    // When leaving the field, validate and apply
    bpmDisplay.addEventListener('blur', () => {
      applyBpmFromDisplay();
    });
  }

  function applyBpmFromDisplay(): void {
    if (!bpmDisplay) return;
    const raw = bpmDisplay.textContent ? bpmDisplay.textContent.trim() : '';
    const digits = raw.replace(/\D/g, '');
    if (digits === '') {
      // restore to current metronom BPM
      bpmDisplay.textContent = metronom.getBPM().toString();
      return;
    }
    let bpm = parseInt(digits, 10);
    if (isNaN(bpm)) {
      bpm = metronom.getBPM();
    }
    // clamp
    bpm = Math.max(40, Math.min(500, bpm));
    metronom.setBPM(bpm);
    // sync slider
    if (bpmInput) bpmInput.value = bpm.toString();
    bpmDisplay.textContent = bpm.toString();
  }

  // Time Signature selection - kann jetzt während des Abspielens geändert werden
  timeSignatureSelect?.addEventListener('change', () => {
    metronom.setTimeSignature(timeSignatureSelect.value);
    updateBeatIndicators();
  });

  // Sound selection - kann jetzt während des Abspielens geändert werden
  soundSelect?.addEventListener('change', () => {
    metronom.setSoundConfig(soundSelect.value);
  });

  // Play button
  playBtn?.addEventListener('click', () => {
    metronom.start();
    playBtn.disabled = true;
    stopBtn.disabled = false;
    statusDisplay.textContent = '▶️ Läuft...';
    statusDisplay.classList.add('running');
  });

  // Stop button
  stopBtn?.addEventListener('click', () => {
    metronom.stop();
    playBtn.disabled = false;
    stopBtn.disabled = true;
    statusDisplay.textContent = '⏹️ Gestoppt';
    statusDisplay.classList.remove('running');
    updateBeatIndicators();
  });

  // Beat change callback
  metronom.setOnBeatChange((beat: number) => {
    // Highlight active beat visually
    const indicatorContainer = document.getElementById('beatIndicators');
    if (!indicatorContainer) return;
    const indicators = Array.from(indicatorContainer.children) as HTMLElement[];
    indicators.forEach((el, i) => {
      if (i === beat) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  });

  // Initialize display
  bpmDisplay.textContent = metronom.getBPM().toString();
  bpmInput.value = metronom.getBPM().toString();
  stopBtn.disabled = true;
  updateBeatIndicators();

  function updateBeatIndicators(): void {
    const ts = metronom.getTimeSignature();
    const indicatorContainer = document.getElementById('beatIndicators');

    if (indicatorContainer) {
      // If indicators already exist, update count and accent classes without recreating DOM nodes
      const existing = Array.from(indicatorContainer.children) as HTMLElement[];
      if (existing.length === ts.beats) {
        // update accent classes
        existing.forEach((indicator, i) => {
          indicator.className = 'beat-indicator';
          if (ts.accentPattern[i] === 1) {
            indicator.classList.add('accent');
          }
        });
        return;
      }

      // otherwise (different count) recreate indicators
      indicatorContainer.innerHTML = '';
      for (let i = 0; i < ts.beats; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'beat-indicator';
        if (ts.accentPattern[i] === 1) {
          indicator.classList.add('accent');
        }
        indicatorContainer.appendChild(indicator);
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', main);
