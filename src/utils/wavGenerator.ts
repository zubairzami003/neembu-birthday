// Procedural WAV Audio Generator for 100% foolproof HTML5 Audio playback in all browsers and iframes

function createWavDataUri(sampleRate: number, samples: Float32Array): string {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const numSamples = samples.length;
  const dataSize = numSamples * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Helper to write string to DataView
  function writeString(offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // RIFF chunk descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');

  // "fmt " sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, byteRate, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, bitsPerSample, true); // BitsPerSample

  // "data" sub-chunk
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM audio samples (16-bit signed integer)
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    // Clamp to [-1, 1]
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  // Convert buffer to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

// 1. Generate 3 Wooden Knocks WAV
export function generateKnockWav(): string {
  const sampleRate = 22050;
  const duration = 0.55;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const knockTimes = [0.0, 0.14, 0.28];
  knockTimes.forEach((startTime, kIdx) => {
    const startSample = Math.floor(startTime * sampleRate);
    const knockDuration = 0.09;
    const knockLen = Math.floor(knockDuration * sampleRate);

    for (let i = 0; i < knockLen && startSample + i < totalSamples; i++) {
      const t = i / sampleRate;
      // High click + low wood thud
      const env = Math.exp(-t * 45);
      const freqClick = 600 - kIdx * 40;
      const freqThud = 140 - kIdx * 10;

      const click = Math.sin(2 * Math.PI * freqClick * t) * Math.exp(-t * 120);
      const thud = Math.sin(2 * Math.PI * freqThud * (1 - t * 4) * t);
      const noise = (Math.random() * 2 - 1) * Math.exp(-t * 80);

      samples[startSample + i] += (click * 0.4 + thud * 0.6 + noise * 0.2) * env;
    }
  });

  return createWavDataUri(sampleRate, samples);
}

// 2. Generate Cat Meow WAV
export function generateMeowWav(pitchMultiplier = 1.0): string {
  const sampleRate = 22050;
  const duration = 0.48;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const baseFreq = 540 * pitchMultiplier;

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = t / duration;

    // Pitch contour (rise then fall)
    let freq = baseFreq;
    if (progress < 0.35) {
      freq = baseFreq * (0.85 + (progress / 0.35) * 0.5);
    } else {
      freq = baseFreq * (1.35 - ((progress - 0.35) / 0.65) * 0.55);
    }

    // Volume envelope
    let env = 0;
    if (progress < 0.15) {
      env = progress / 0.15;
    } else {
      env = Math.pow(1 - (progress - 0.15) / 0.85, 1.4);
    }

    // Formants (vowel m-e-o-w)
    const harm1 = Math.sin(2 * Math.PI * freq * t);
    const harm2 = Math.sin(2 * Math.PI * freq * 2.05 * t) * 0.5;
    const harm3 = Math.sin(2 * Math.PI * freq * 3.1 * t) * 0.25;

    samples[i] = (harm1 + harm2 + harm3) * env * 0.7;
  }

  return createWavDataUri(sampleRate, samples);
}

// 3. Generate Door Opening Bell Chime WAV
export function generateDoorOpenWav(): string {
  const sampleRate = 22050;
  const duration = 0.9;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C Major arpeggio
  notes.forEach((freq, idx) => {
    const startSample = Math.floor(idx * 0.08 * sampleRate);
    for (let i = startSample; i < totalSamples; i++) {
      const t = (i - startSample) / sampleRate;
      const env = Math.exp(-t * 5.0);
      const tone = Math.sin(2 * Math.PI * freq * t) + Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
      samples[i] += tone * env * 0.35;
    }
  });

  return createWavDataUri(sampleRate, samples);
}

// 4. Generate Happy Birthday Melody WAV
export function generateCelebrationWav(): string {
  const sampleRate = 22050;
  const notes = [
    { f: 392.00, d: 0.22 }, // G4
    { f: 392.00, d: 0.22 }, // G4
    { f: 440.00, d: 0.42 }, // A4
    { f: 392.00, d: 0.42 }, // G4
    { f: 523.25, d: 0.45 }, // C5
    { f: 493.88, d: 0.85 }, // B4
    { f: 392.00, d: 0.22 }, // G4
    { f: 392.00, d: 0.22 }, // G4
    { f: 440.00, d: 0.42 }, // A4
    { f: 392.00, d: 0.42 }, // G4
    { f: 587.33, d: 0.45 }, // D5
    { f: 523.25, d: 1.00 }, // C5
  ];

  let totalDuration = 0.1;
  notes.forEach((n) => (totalDuration += n.d * 0.85));
  totalDuration += 0.5;

  const totalSamples = Math.floor(sampleRate * totalDuration);
  const samples = new Float32Array(totalSamples);

  let currentSample = Math.floor(0.05 * sampleRate);
  notes.forEach((note) => {
    const noteSamples = Math.floor(note.d * 1.2 * sampleRate);
    for (let i = 0; i < noteSamples && currentSample + i < totalSamples; i++) {
      const t = i / sampleRate;
      const env = Math.exp(-t * (3.5 / note.d));
      const tone1 = Math.sin(2 * Math.PI * note.f * t);
      const tone2 = Math.sin(2 * Math.PI * note.f * 2 * t) * 0.4;
      const tone3 = Math.sin(2 * Math.PI * note.f * 3 * t) * 0.15;
      samples[currentSample + i] += (tone1 + tone2 + tone3) * env * 0.4;
    }
    currentSample += Math.floor(note.d * 0.82 * sampleRate);
  });

  return createWavDataUri(sampleRate, samples);
}

// 5. Generate Cute Bubble Pop WAV
export function generatePopWav(): string {
  const sampleRate = 22050;
  const duration = 0.12;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const freq = 400 + Math.sin(t * 30) * 800 * (1 - t / duration);
    const env = Math.exp(-t * 35);
    samples[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.6;
  }

  return createWavDataUri(sampleRate, samples);
}

// 6. Generate Page Turn Rustle WAV
export function generatePageFlipWav(): string {
  const sampleRate = 22050;
  const duration = 0.22;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);

  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 22);
    const rustle = Math.sin(2 * Math.PI * 1200 * t) * 0.3 * Math.exp(-t * 25);
    samples[i] = (noise + rustle) * 0.5;
  }

  return createWavDataUri(sampleRate, samples);
}

// 7. Generate Sparkle Bell WAV
export function generateSparkleWav(): string {
  const sampleRate = 22050;
  const duration = 0.6;
  const totalSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(totalSamples);
  const freqs = [1046.5, 1318.5, 1567.98, 2093.0];

  freqs.forEach((freq, idx) => {
    const startSample = Math.floor(idx * 0.05 * sampleRate);
    for (let i = startSample; i < totalSamples; i++) {
      const t = (i - startSample) / sampleRate;
      const env = Math.exp(-t * 9.0);
      samples[i] += Math.sin(2 * Math.PI * freq * t) * env * 0.35;
    }
  });

  return createWavDataUri(sampleRate, samples);
}
