/**
 * GRID SURGE - A polished puzzle game
 * 
 * Features:
 * - 8x8 grid with drag-and-drop block placement
 * - Row/column clearing with combo multipliers
 * - Particle effects, animations, screen shake
 * - Mobile and desktop support
 */

// ============= CONFIGURATION =============
const CONFIG = {
  GRID_SIZE: 8,
  BLOCK_COLORS: [
    { main: "#ff6b6b", light: "#ff8787", dark: "#e85555", glow: "rgba(255, 107, 107, 0.6)" }, // Red
    { main: "#ffa94d", light: "#ffbd6d", dark: "#e89340", glow: "rgba(255, 169, 77, 0.6)" },  // Orange
    { main: "#ffd43b", light: "#ffe066", dark: "#e8c035", glow: "rgba(255, 212, 59, 0.6)" },  // Yellow
    { main: "#51cf66", light: "#69db7c", dark: "#47b857", glow: "rgba(81, 207, 102, 0.6)" }, // Green
    { main: "#339af0", light: "#4dabf7", dark: "#2b87d6", glow: "rgba(51, 154, 240, 0.6)" }, // Blue
    { main: "#cc5de8", light: "#da77f2", dark: "#b54dd0", glow: "rgba(204, 93, 232, 0.6)" }, // Purple
  ],
  GRID_BG: "#1e1e3f",
  GRID_CELL_BG: "#252550",
  GRID_CELL_BORDER: "#3a3a6a",
  COMBO_TIMEOUT: 3000,
  BLOCK_QUEUE_SIZE: 3,
};

// Block shape definitions (relative positions)
// Weights rebalanced for more fun gameplay:
// - More small pieces = easier to fill gaps and set up combos
// - Fewer giant pieces = less frustrating game-enders
// - Removed 3x3 and U shapes entirely (too punishing)
const BLOCK_SHAPES: { cells: [number, number][], weight: number }[] = [
  // Single - very common, great for filling gaps
  { cells: [[0, 0]], weight: 22 },
  
  // Lines of 2 - common, versatile
  { cells: [[0, 0], [1, 0]], weight: 16 },
  { cells: [[0, 0], [0, 1]], weight: 16 },
  
  // Lines of 3 - common, good for combos
  { cells: [[0, 0], [1, 0], [2, 0]], weight: 12 },
  { cells: [[0, 0], [0, 1], [0, 2]], weight: 12 },
  
  // Lines of 4 - less common
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], weight: 4 },
  { cells: [[0, 0], [0, 1], [0, 2], [0, 3]], weight: 4 },
  
  // Lines of 5 - rare, high risk/reward
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], weight: 1 },
  { cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], weight: 1 },
  
  // 2x2 Square - common, great for filling corners
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]], weight: 12 },
  
  // Small L shapes (3 blocks) - common, very useful
  { cells: [[0, 0], [0, 1], [1, 1]], weight: 10 },
  { cells: [[1, 0], [0, 1], [1, 1]], weight: 10 },
  { cells: [[0, 0], [1, 0], [0, 1]], weight: 10 },
  { cells: [[0, 0], [1, 0], [1, 1]], weight: 10 },
  
  // Big L shapes (4 blocks) - less common
  { cells: [[0, 0], [0, 1], [0, 2], [1, 2]], weight: 3 },
  { cells: [[0, 0], [0, 1], [0, 2], [1, 0]], weight: 3 },
  { cells: [[0, 0], [1, 0], [2, 0], [2, 1]], weight: 3 },
  { cells: [[0, 0], [1, 0], [2, 0], [0, 1]], weight: 3 },
  { cells: [[0, 0], [1, 0], [1, 1], [1, 2]], weight: 3 },
  { cells: [[0, 0], [0, 1], [1, 0], [2, 0]], weight: 3 },
  { cells: [[1, 0], [1, 1], [1, 2], [0, 2]], weight: 3 },
  
  // T shapes (4 blocks) - moderate frequency
  { cells: [[0, 0], [1, 0], [2, 0], [1, 1]], weight: 4 },
  { cells: [[1, 0], [0, 1], [1, 1], [1, 2]], weight: 4 },
  { cells: [[1, 0], [0, 1], [1, 1], [2, 1]], weight: 4 },
  { cells: [[0, 0], [0, 1], [0, 2], [1, 1]], weight: 4 },
  
  // Z shapes (4 blocks) - moderate frequency
  { cells: [[0, 0], [1, 0], [1, 1], [2, 1]], weight: 4 },
  { cells: [[1, 0], [0, 1], [1, 1], [0, 2]], weight: 4 },
  { cells: [[0, 1], [1, 0], [1, 1], [2, 0]], weight: 4 },
  { cells: [[0, 0], [0, 1], [1, 1], [1, 2]], weight: 4 },
  
  // Diagonal lines (2 blocks) - common, fun shape
  { cells: [[0, 0], [1, 1]], weight: 10 },
  { cells: [[1, 0], [0, 1]], weight: 10 },
  
  // Diagonal lines (3 blocks) - less common
  { cells: [[0, 0], [1, 1], [2, 2]], weight: 3 },
  { cells: [[2, 0], [1, 1], [0, 2]], weight: 3 },
  
  // Plus/Cross shape (5 blocks) - rare
  { cells: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]], weight: 2 },
  
  // Small corner (3 blocks) - common, versatile
  { cells: [[0, 0], [1, 0], [1, 1]], weight: 8 },
  { cells: [[0, 0], [0, 1], [1, 0]], weight: 8 },
];

// ============= UTILITY FUNCTIONS =============
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeOutElastic(t: number): number {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function weightedRandom<T extends { weight: number }>(items: T[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const item of items) {
    random -= item.weight;
    if (random <= 0) return item;
  }
  return items[0];
}

// ============= PARTICLE SYSTEM =============
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  type: "spark" | "trail" | "burst" | "clear";
  rotation: number;
  rotationSpeed: number;
}

class ParticleSystem {
  particles: Particle[] = [];

  emit(x: number, y: number, color: string, count: number, type: Particle["type"] = "spark") {
    console.log("[ParticleSystem.emit] Creating", count, type, "particles");
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = type === "burst" ? 3 + Math.random() * 6 : 
                    type === "clear" ? 2 + Math.random() * 4 :
                    1 + Math.random() * 3;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (type === "burst" ? 3 : 0),
        life: 1,
        maxLife: 1,
        size: type === "burst" ? 6 + Math.random() * 8 : 
              type === "clear" ? 4 + Math.random() * 6 :
              2 + Math.random() * 4,
        color,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  emitTrail(x: number, y: number, color: string) {
    if (Math.random() > 0.3) return; // Throttle trail particles
    this.particles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * -1,
      life: 1,
      maxLife: 1,
      size: 3 + Math.random() * 4,
      color,
      type: "trail",
      rotation: 0,
      rotationSpeed: 0,
    });
  }

  update(dt: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.vy += 0.15 * dt * 60; // Gravity
      p.rotation += p.rotationSpeed * dt * 60;
      
      const decay = p.type === "trail" ? 0.04 : 
                    p.type === "clear" ? 0.025 :
                    0.02;
      p.life -= decay * dt * 60;
      
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.life * 0.8;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      if (p.type === "clear") {
        // Square particles for clear effect
        ctx.fillStyle = p.color;
        const size = p.size * p.life;
        ctx.fillRect(-size / 2, -size / 2, size, size);
      } else {
        // Round particles
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }
}

// ============= FLOATING TEXT =============
interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
  size: number;
}

class FloatingTextSystem {
  texts: FloatingText[] = [];

  add(x: number, y: number, text: string, color: string = "#ffffff", size: number = 24) {
    console.log("[FloatingTextSystem.add]", text, "at", x, y);
    this.texts.push({ x, y, text, life: 1, color, size });
  }

  update(dt: number) {
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.y -= 40 * dt; // Float upward
      t.life -= 0.015 * dt * 60;
      
      if (t.life <= 0) {
        this.texts.splice(i, 1);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const t of this.texts) {
      ctx.save();
      ctx.globalAlpha = t.life;
      ctx.font = "700 " + (t.size * easeOutBack(Math.min(1, (1 - t.life) * 3 + 0.3))) + "px Fredoka, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillText(t.text, t.x + 2, t.y + 2);
      
      // Main text
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
      
      ctx.restore();
    }
  }
}

// ============= ANIMATION SYSTEM =============
interface GameAnimation {
  type: "place" | "clear" | "shake";
  x: number;
  y: number;
  progress: number;
  duration: number;
  data?: unknown;
}

class AnimationSystem {
  animations: GameAnimation[] = [];
  screenShake = { x: 0, y: 0, intensity: 0 };

  addPlaceAnimation(x: number, y: number) {
    this.animations.push({
      type: "place",
      x, y,
      progress: 0,
      duration: 0.3,
    });
  }

  addClearAnimation(x: number, y: number, delay: number) {
    this.animations.push({
      type: "clear",
      x, y,
      progress: -delay, // Negative progress = delay
      duration: 0.4,
    });
  }

  triggerScreenShake(intensity: number) {
    console.log("[AnimationSystem.triggerScreenShake] intensity:", intensity);
    this.screenShake.intensity = Math.max(this.screenShake.intensity, intensity);
  }

  update(dt: number) {
    // Update screen shake
    if (this.screenShake.intensity > 0) {
      this.screenShake.x = (Math.random() - 0.5) * this.screenShake.intensity * 10;
      this.screenShake.y = (Math.random() - 0.5) * this.screenShake.intensity * 10;
      this.screenShake.intensity *= 0.9;
      if (this.screenShake.intensity < 0.01) {
        this.screenShake.intensity = 0;
        this.screenShake.x = 0;
        this.screenShake.y = 0;
      }
    }

    // Update animations
    for (let i = this.animations.length - 1; i >= 0; i--) {
      const anim = this.animations[i];
      anim.progress += dt / anim.duration;
      
      if (anim.progress >= 1) {
        this.animations.splice(i, 1);
      }
    }
  }

  getPlaceScale(x: number, y: number): number {
    for (const anim of this.animations) {
      if (anim.type === "place" && anim.x === x && anim.y === y && anim.progress >= 0) {
        return easeOutBack(anim.progress);
      }
    }
    return 1;
  }

  getClearState(x: number, y: number): { clearing: boolean; progress: number } {
    for (const anim of this.animations) {
      if (anim.type === "clear" && anim.x === x && anim.y === y) {
        if (anim.progress < 0) {
          return { clearing: true, progress: 0 };
        }
        return { clearing: true, progress: anim.progress };
      }
    }
    return { clearing: false, progress: 0 };
  }
}

// ============= BLOCK PIECE =============
interface BlockPiece {
  cells: [number, number][];
  colorIndex: number;
  x: number;
  y: number;
  scale: number;
  targetScale: number;
}

// ============= GAME STATE =============
interface GameState {
  grid: (number | null)[][]; // null = empty, number = color index
  blockQueue: BlockPiece[];
  score: number;
  highScore: number;
  linesCleared: number;
  blocksPlaced: number;
  combo: number; // Current streak count
  maxCombo: number;
  comboLeeway: number; // Placements remaining before streak resets
  gameOver: boolean;
  started: boolean;
}

// ============= AUDIO MANAGER =============
class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private currentMusicSource: AudioBufferSourceNode | null = null;
  private initialized = false;
  
  // Cached audio buffers
  private menuMusicBuffer: AudioBuffer | null = null;
  private gameMusicBuffer: AudioBuffer | null = null;
  private gameOverMusicBuffer: AudioBuffer | null = null;
  private buffersLoaded = false;
  
  // Pending music to play once buffers load
  private pendingMusic: "menu" | "game" | "gameover" | null = null;

  constructor() {
    console.log("[AudioManager] Created");
  }

  init(): void {
    if (this.initialized) return;
    
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);
      
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.4;
      this.musicGain.connect(this.masterGain);
      
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.6;
      this.sfxGain.connect(this.masterGain);
      
      this.initialized = true;
      console.log("[AudioManager.init] Audio context initialized");
      
      // Start loading music buffers
      this.loadMusicBuffers();
    } catch (e) {
      console.warn("[AudioManager.init] Failed to initialize audio:", e);
    }
  }

  private async loadMusicBuffers(): Promise<void> {
    if (!this.ctx || this.buffersLoaded) return;
    
    console.log("[AudioManager.loadMusicBuffers] Loading music files...");
    
    try {
      const [menuResponse, gameResponse, gameOverResponse] = await Promise.all([
        fetch("https://assets.oasiz.ai/audio/menu-music.wav"),
        fetch("https://assets.oasiz.ai/audio/game-music.mp3"),
        fetch("https://assets.oasiz.ai/audio/gameover-music.wav"),
      ]);
      
      const [menuData, gameData, gameOverData] = await Promise.all([
        menuResponse.arrayBuffer(),
        gameResponse.arrayBuffer(),
        gameOverResponse.arrayBuffer(),
      ]);
      
      const [menuBuffer, gameBuffer, gameOverBuffer] = await Promise.all([
        this.ctx.decodeAudioData(menuData),
        this.ctx.decodeAudioData(gameData),
        this.ctx.decodeAudioData(gameOverData),
      ]);
      
      this.menuMusicBuffer = menuBuffer;
      this.gameMusicBuffer = gameBuffer;
      this.gameOverMusicBuffer = gameOverBuffer;
      this.buffersLoaded = true;
      
      console.log("[AudioManager.loadMusicBuffers] All music buffers loaded successfully");
      
      // Play any pending music that was requested before buffers loaded
      if (this.pendingMusic) {
        console.log("[AudioManager.loadMusicBuffers] Playing pending music:", this.pendingMusic);
        if (this.pendingMusic === "menu") {
          this.playMenuMusic();
        } else if (this.pendingMusic === "game") {
          this.playGameMusic();
        } else if (this.pendingMusic === "gameover") {
          this.playGameOverMusic();
        }
        this.pendingMusic = null;
      }
    } catch (e) {
      console.warn("[AudioManager.loadMusicBuffers] Failed to load music:", e);
    }
  }

  private createOscillator(freq: number, type: OscillatorType = "sine"): OscillatorNode {
    const osc = this.ctx!.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    return osc;
  }

  private createGain(value: number): GainNode {
    const gain = this.ctx!.createGain();
    gain.gain.value = value;
    return gain;
  }

  // ========== MUSIC ==========
  
  stopMusic(): void {
    if (this.currentMusicSource) {
      try {
        this.currentMusicSource.stop();
        this.currentMusicSource.disconnect();
      } catch (e) {}
      this.currentMusicSource = null;
    }
  }

  private playMusicBuffer(buffer: AudioBuffer | null, loop: boolean = true): void {
    if (!this.ctx || !this.musicGain || !buffer) return;
    
    this.stopMusic();
    
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(this.musicGain);
    source.start(0);
    
    this.currentMusicSource = source;
  }

  playMenuMusic(): void {
    console.log("[AudioManager.playMenuMusic] buffersLoaded:", this.buffersLoaded);
    if (!this.buffersLoaded) {
      this.pendingMusic = "menu";
      return;
    }
    this.pendingMusic = null;
    this.playMusicBuffer(this.menuMusicBuffer, true);
  }

  playGameMusic(): void {
    console.log("[AudioManager.playGameMusic] buffersLoaded:", this.buffersLoaded);
    if (!this.buffersLoaded) {
      this.pendingMusic = "game";
      return;
    }
    this.pendingMusic = null;
    this.playMusicBuffer(this.gameMusicBuffer, true);
  }

  playGameOverMusic(): void {
    console.log("[AudioManager.playGameOverMusic] buffersLoaded:", this.buffersLoaded);
    if (!this.buffersLoaded) {
      this.pendingMusic = "gameover";
      return;
    }
    this.pendingMusic = null;
    this.playMusicBuffer(this.gameOverMusicBuffer, false);
  }

  // ========== SOUND EFFECTS ==========
  
  playPlaceSound(): void {
    if (!this.ctx || !this.sfxGain) return;
    
    const now = this.ctx.currentTime;
    
    // Quick pop sound
    const osc = this.createOscillator(400, "sine");
    const gain = this.createGain(0.3);
    
    osc.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playClearSound(linesCleared: number): void {
    if (!this.ctx || !this.sfxGain) return;
    
    const now = this.ctx.currentTime;
    
    // Ascending sweep based on lines cleared
    const baseFreq = 300 + linesCleared * 100;
    
    const osc = this.createOscillator(baseFreq, "sawtooth");
    const gain = this.createGain(0.2);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2000;
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + 0.2);
    
    filter.frequency.setValueAtTime(500, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 0.15);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playComboSound(streak: number): void {
    if (!this.ctx || !this.sfxGain) return;
    
    const now = this.ctx.currentTime;
    
    if (streak >= 4) {
      // Mega clear - explosion burst
      this.playMegaClearSound();
      return;
    }
    
    // Rising arpeggio for combos
    const baseFreq = 440;
    const notes = streak === 2 ? [0, 4, 7] : [0, 4, 7, 12]; // Major triad or octave
    
    notes.forEach((semitone, i) => {
      const freq = baseFreq * Math.pow(2, semitone / 12);
      const osc = this.createOscillator(freq, "square");
      const gain = this.createGain(0.15);
      
      const filter = this.ctx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 3000;
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain!);
      
      const startTime = now + i * 0.08;
      
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
      
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  private playMegaClearSound(): void {
    if (!this.ctx || !this.sfxGain) return;
    
    const now = this.ctx.currentTime;
    
    // Layered explosion with noise burst
    const noise = this.ctx.createBufferSource();
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.5, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
    }
    noise.buffer = noiseBuffer;
    
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 0.5;
    
    const noiseGain = this.createGain(0.3);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    noise.start(now);
    
    // Add triumphant chord
    const chordFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    chordFreqs.forEach((freq, i) => {
      const osc = this.createOscillator(freq, "triangle");
      const gain = this.createGain(0.12);
      
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      
      osc.start(now);
      osc.stop(now + 0.55);
    });
  }

  playGameOverSound(): void {
    if (!this.ctx || !this.sfxGain) return;
    
    const now = this.ctx.currentTime;
    
    // Descending "wah wah" sound
    const osc = this.createOscillator(400, "sawtooth");
    const gain = this.createGain(0.2);
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.8);
    
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);
    
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    osc.start(now);
    osc.stop(now + 1);
  }
}

// ============= MAIN GAME CLASS =============
class BlockBlastGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  
  // Systems
  particles: ParticleSystem;
  floatingText: FloatingTextSystem;
  animations: AnimationSystem;
  audio: AudioManager;
  
  // Game state
  state: GameState;
  
  // Layout calculations
  cellSize: number = 0;
  gridOffsetX: number = 0;
  gridOffsetY: number = 0;
  queueY: number = 0;
  queueCellSize: number = 0;
  
  // Drag state
  draggedPiece: BlockPiece | null = null;
  draggedPieceIndex: number = -1;
  dragOffset: { x: number; y: number } = { x: 0, y: 0 };
  dragPos: { x: number; y: number } = { x: 0, y: 0 };
  ghostPos: { gridX: number; gridY: number } | null = null;
  isValidPlacement: boolean = false;
  
  // Timing
  lastTime: number = 0;
  
  // Mobile detection
  isMobile: boolean;

  constructor() {
    console.log("[BlockBlastGame] Initializing game");
    
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    
    this.particles = new ParticleSystem();
    this.floatingText = new FloatingTextSystem();
    this.animations = new AnimationSystem();
    this.audio = new AudioManager();
    
    this.isMobile = window.matchMedia("(pointer: coarse)").matches;
    
    this.state = this.createInitialState();
    
    this.setupEventListeners();
    this.resizeCanvas();
    
    window.addEventListener("resize", () => this.resizeCanvas());
    
    // Start the game loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  createInitialState(): GameState {
    console.log("[BlockBlastGame.createInitialState]");
    const grid: (number | null)[][] = [];
    for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
      grid[y] = [];
      for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
        grid[y][x] = null;
      }
    }
    
    return {
      grid,
      blockQueue: [],
      score: 0,
      highScore: this.loadHighScore(),
      linesCleared: 0,
      blocksPlaced: 0,
      combo: 0,
      maxCombo: 0,
      comboLeeway: 0,
      gameOver: false,
      started: false,
    };
  }

  loadHighScore(): number {
    try {
      return parseInt(localStorage.getItem("blockblast_highscore") || "0", 10);
    } catch {
      return 0;
    }
  }

  saveHighScore(score: number): void {
    try {
      localStorage.setItem("blockblast_highscore", score.toString());
    } catch {
      // Ignore storage errors
    }
  }

  resizeCanvas(): void {
    console.log("[BlockBlastGame.resizeCanvas]");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.calculateLayout();
  }

  calculateLayout(): void {
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Top safe area padding for mobile (notch, status bar, etc.)
    const topSafeArea = this.isMobile ? 60 : 0;
    
    // Responsive HUD height based on screen size
    // Mobile needs more space because HUD elements are larger relative to screen
    const hudHeight = this.isMobile ? 130 : Math.max(90, h * 0.1);
    
    if (this.isMobile) {
      // === MOBILE LAYOUT ===
      const queueHeight = 150;
      const maxGridWidth = w * 0.95;
      const availableHeight = h - topSafeArea - hudHeight - queueHeight;
      const maxGridHeight = availableHeight * 0.95;
      
      this.cellSize = Math.min(maxGridWidth / CONFIG.GRID_SIZE, maxGridHeight / CONFIG.GRID_SIZE);
      
      const gridWidth = this.cellSize * CONFIG.GRID_SIZE;
      const gridHeight = this.cellSize * CONFIG.GRID_SIZE;
      
      this.gridOffsetX = (w - gridWidth) / 2;
      this.gridOffsetY = topSafeArea + hudHeight;
      this.queueY = this.gridOffsetY + gridHeight + 20;
      this.queueCellSize = Math.min(this.cellSize * 0.55, 32);
    } else {
      // === DESKTOP LAYOUT ===
      // Fixed queue area dimensions for desktop:
      // - 20px gap after grid
      // - 25px for "DRAG TO PLACE" label
      // - 15px gap before blocks
      // - max piece height (5 cells * queueCellSize)
      // - 20px bottom padding
      
      // Target queue cell size for desktop (comfortable size)
      const targetQueueCellSize = 38;
      const maxPieceCells = 5; // Longest piece is 5 cells
      const labelHeight = 25;
      const gaps = 20 + 15 + 20; // top gap + gap after label + bottom padding
      const totalQueueHeight = gaps + labelHeight + (maxPieceCells * targetQueueCellSize);
      
      // Calculate grid size with remaining space
      const maxGridWidth = Math.min(w * 0.85, 700);
      const availableHeight = h - hudHeight - totalQueueHeight;
      const maxGridHeight = availableHeight;
      
      this.cellSize = Math.min(maxGridWidth / CONFIG.GRID_SIZE, maxGridHeight / CONFIG.GRID_SIZE);
      
      const gridWidth = this.cellSize * CONFIG.GRID_SIZE;
      const gridHeight = this.cellSize * CONFIG.GRID_SIZE;
      
      this.gridOffsetX = (w - gridWidth) / 2;
      this.gridOffsetY = hudHeight;
      this.queueY = this.gridOffsetY + gridHeight + 20;
      this.queueCellSize = targetQueueCellSize;
    }
    
    console.log("[BlockBlastGame.calculateLayout] cellSize:", this.cellSize, "queueY:", this.queueY, "queueCellSize:", this.queueCellSize);
  }

  setupEventListeners(): void {
    console.log("[BlockBlastGame.setupEventListeners]");
    
    // Start button
    document.getElementById("startButton")?.addEventListener("click", () => this.startGame());
    document.getElementById("restartButton")?.addEventListener("click", () => this.startGame());
    
    // Mouse events
    this.canvas.addEventListener("mousedown", (e) => this.onPointerDown(e.clientX, e.clientY));
    this.canvas.addEventListener("mousemove", (e) => this.onPointerMove(e.clientX, e.clientY));
    this.canvas.addEventListener("mouseup", () => this.onPointerUp());
    this.canvas.addEventListener("mouseleave", () => this.onPointerUp());
    
    // Touch events
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onPointerDown(touch.clientX, touch.clientY);
    }, { passive: false });
    
    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onPointerMove(touch.clientX, touch.clientY);
    }, { passive: false });
    
    this.canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.onPointerUp();
    }, { passive: false });
    
    this.canvas.addEventListener("touchcancel", () => this.onPointerUp());
  }

  startGame(): void {
    console.log("[BlockBlastGame.startGame]");
    
    // Initialize audio on first user gesture
    this.audio.init();
    this.audio.stopMusic();
    this.audio.playGameMusic();
    
    this.state = this.createInitialState();
    this.state.started = true;
    this.state.highScore = this.loadHighScore();
    
    // Generate initial block queue
    this.refillBlockQueue();
    
    // Hide start screen, show HUD
    document.getElementById("startScreen")?.classList.add("hidden");
    document.getElementById("gameOverScreen")?.classList.add("hidden");
    document.getElementById("hud")!.style.display = "flex";
    
    this.updateHUD();
  }

  refillBlockQueue(): void {
    console.log("[BlockBlastGame.refillBlockQueue]");
    
    while (this.state.blockQueue.length < CONFIG.BLOCK_QUEUE_SIZE) {
      const shape = weightedRandom(BLOCK_SHAPES);
      const colorIndex = Math.floor(Math.random() * CONFIG.BLOCK_COLORS.length);
      
      this.state.blockQueue.push({
        cells: shape.cells.map(c => [...c] as [number, number]),
        colorIndex,
        x: 0,
        y: 0,
        scale: 0,
        targetScale: 1,
      });
    }
    
    this.positionQueuePieces();
  }

  positionQueuePieces(): void {
    const w = this.canvas.width;
    
    // Label is at queueY, blocks should be positioned below it
    // 25px for label + 15px gap = 40px from queueY
    const blockAreaTop = this.queueY + 40;
    
    // Calculate actual widths of all pieces
    const pieceWidths: number[] = [];
    const pieceHeights: number[] = [];
    for (const piece of this.state.blockQueue) {
      const bounds = this.getPieceBounds(piece);
      pieceWidths.push((bounds.maxX - bounds.minX + 1) * this.queueCellSize);
      pieceHeights.push((bounds.maxY - bounds.minY + 1) * this.queueCellSize);
    }
    
    // Minimum gap between pieces
    const minGap = this.isMobile ? 25 : 50;
    
    // Total width needed: sum of all piece widths + gaps between them
    const totalPieceWidth = pieceWidths.reduce((sum, pw) => sum + pw, 0);
    const totalGaps = minGap * (this.state.blockQueue.length - 1);
    const totalNeededWidth = totalPieceWidth + totalGaps;
    
    // Start position to center all pieces
    let currentX = (w - totalNeededWidth) / 2;
    
    // Max piece height (5 cells) for consistent vertical positioning
    const maxPossibleHeight = 5 * this.queueCellSize;
    
    for (let i = 0; i < this.state.blockQueue.length; i++) {
      const piece = this.state.blockQueue[i];
      
      piece.x = currentX;
      // Vertically center each piece within the max possible height area
      piece.y = blockAreaTop + (maxPossibleHeight - pieceHeights[i]) / 2;
      
      // Move to next piece position
      currentX += pieceWidths[i] + minGap;
    }
  }

  getPieceBounds(piece: BlockPiece): { minX: number; maxX: number; minY: number; maxY: number } {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [cx, cy] of piece.cells) {
      minX = Math.min(minX, cx);
      maxX = Math.max(maxX, cx);
      minY = Math.min(minY, cy);
      maxY = Math.max(maxY, cy);
    }
    return { minX, maxX, minY, maxY };
  }

  onPointerDown(x: number, y: number): void {
    if (!this.state.started || this.state.gameOver) return;
    
    // Check if clicking on a queue piece
    for (let i = 0; i < this.state.blockQueue.length; i++) {
      const piece = this.state.blockQueue[i];
      const bounds = this.getPieceBounds(piece);
      const pieceWidth = (bounds.maxX - bounds.minX + 1) * this.queueCellSize;
      const pieceHeight = (bounds.maxY - bounds.minY + 1) * this.queueCellSize;
      
      // Expand hit area
      const hitPadding = 20;
      if (x >= piece.x - hitPadding && x <= piece.x + pieceWidth + hitPadding &&
          y >= piece.y - hitPadding && y <= piece.y + pieceHeight + hitPadding) {
        
        console.log("[BlockBlastGame.onPointerDown] Picked up piece", i);
        this.draggedPiece = piece;
        this.draggedPieceIndex = i;
        this.dragOffset = {
          x: x - piece.x - pieceWidth / 2,
          y: y - piece.y - pieceHeight / 2,
        };
        this.dragPos = { x, y };
        piece.targetScale = 1.2;
        break;
      }
    }
  }

  onPointerMove(x: number, y: number): void {
    if (!this.draggedPiece) return;
    
    this.dragPos = { x, y };
    
    // Emit trail particles
    const color = CONFIG.BLOCK_COLORS[this.draggedPiece.colorIndex];
    this.particles.emitTrail(x, y, color.glow);
    
    // Calculate ghost position - cursor position maps directly to grid cell
    // Apply vertical offset so piece appears well above finger on mobile
    const fingerOffset = this.isMobile ? 120 : 30;
    const cursorX = x;
    const cursorY = y - fingerOffset;
    
    // Get the piece bounds to center the piece on cursor
    const bounds = this.getPieceBounds(this.draggedPiece);
    const pieceCenterOffsetX = (bounds.maxX + bounds.minX) / 2;
    const pieceCenterOffsetY = (bounds.maxY + bounds.minY) / 2;
    
    // Convert cursor position to grid coordinates, centering the piece
    const gridX = Math.floor((cursorX - this.gridOffsetX) / this.cellSize - pieceCenterOffsetX + 0.5);
    const gridY = Math.floor((cursorY - this.gridOffsetY) / this.cellSize - pieceCenterOffsetY + 0.5);
    
    this.ghostPos = { gridX, gridY };
    this.isValidPlacement = this.canPlacePiece(this.draggedPiece, gridX, gridY);
  }

  onPointerUp(): void {
    if (!this.draggedPiece) return;
    
    console.log("[BlockBlastGame.onPointerUp] isValid:", this.isValidPlacement);
    
    if (this.isValidPlacement && this.ghostPos) {
      this.placePiece(this.draggedPiece, this.ghostPos.gridX, this.ghostPos.gridY);
      this.state.blockQueue.splice(this.draggedPieceIndex, 1);
      this.state.blocksPlaced++;
      
      // Play placement sound
      this.audio.playPlaceSound();
      
      // Check for line clears
      const clearedLines = this.checkAndClearLines();
      
      if (clearedLines > 0) {
        // Increment streak counter
        this.state.combo++;
        this.state.comboLeeway = 2; // 2 placements of leeway before streak resets
        this.state.maxCombo = Math.max(this.state.maxCombo, this.state.combo);
        
        // Play clear sound
        this.audio.playClearSound(clearedLines);
        
        // Play combo sound if streak > 1
        if (this.state.combo >= 2) {
          setTimeout(() => this.audio.playComboSound(this.state.combo), 150);
        }
        
        // Score calculation: base + multi-line bonus + streak multiplier
        const baseScore = clearedLines * 100;
        const multiLineBonus = clearedLines > 1 ? (clearedLines - 1) * 50 : 0;
        const streakMultiplier = 1 + (this.state.combo - 1) * 0.25;
        const score = Math.floor((baseScore + multiLineBonus) * streakMultiplier);
        
        this.state.score += score;
        this.state.linesCleared += clearedLines;
        
        // Show clear type and score
        const centerX = this.gridOffsetX + (CONFIG.GRID_SIZE / 2) * this.cellSize;
        const centerY = this.gridOffsetY + (CONFIG.GRID_SIZE / 2) * this.cellSize;
        
        // Show what was cleared
        this.showClearType(clearedLines, this.state.combo);
        
        // Show score below
        this.floatingText.add(centerX, centerY + 40, "+" + score, "#ffd700", 28);
        
        // Subtle screen shake
        this.animations.triggerScreenShake(0.2 + clearedLines * 0.1);
      } else {
        // No lines cleared - decrement leeway
        if (this.state.combo > 0) {
          this.state.comboLeeway--;
          if (this.state.comboLeeway <= 0) {
            this.hideCombo();
            this.state.combo = 0;
          }
        }
      }
      
      // Refill queue if empty
      if (this.state.blockQueue.length === 0) {
        this.refillBlockQueue();
      } else {
        this.positionQueuePieces();
      }
      
      // Check for game over AFTER grid updates are complete
      // Delay to ensure cleared cells are removed first
      const checkDelay = clearedLines > 0 ? 150 : 0;
      setTimeout(() => {
        if (this.checkGameOver()) {
          this.endGame();
        }
      }, checkDelay);
      
      this.updateHUD();
    } else {
      // Return piece to queue
      this.draggedPiece.targetScale = 1;
      this.positionQueuePieces();
    }
    
    this.draggedPiece = null;
    this.draggedPieceIndex = -1;
    this.ghostPos = null;
    this.isValidPlacement = false;
  }

  canPlacePiece(piece: BlockPiece, gridX: number, gridY: number): boolean {
    for (const [cx, cy] of piece.cells) {
      const x = gridX + cx;
      const y = gridY + cy;
      
      // Check bounds
      if (x < 0 || x >= CONFIG.GRID_SIZE || y < 0 || y >= CONFIG.GRID_SIZE) {
        return false;
      }
      
      // Check if cell is occupied
      if (this.state.grid[y][x] !== null) {
        return false;
      }
    }
    return true;
  }

  placePiece(piece: BlockPiece, gridX: number, gridY: number): void {
    console.log("[BlockBlastGame.placePiece] at", gridX, gridY);
    
    const color = CONFIG.BLOCK_COLORS[piece.colorIndex];
    
    for (const [cx, cy] of piece.cells) {
      const x = gridX + cx;
      const y = gridY + cy;
      
      this.state.grid[y][x] = piece.colorIndex;
      this.animations.addPlaceAnimation(x, y);
      
      // Emit placement particles
      const cellCenterX = this.gridOffsetX + (x + 0.5) * this.cellSize;
      const cellCenterY = this.gridOffsetY + (y + 0.5) * this.cellSize;
      this.particles.emit(cellCenterX, cellCenterY, color.glow, 5, "spark");
    }
    
    // Score for placing
    this.state.score += piece.cells.length;
  }

  checkAndClearLines(): number {
    console.log("[BlockBlastGame.checkAndClearLines]");
    
    const rowsToClear: number[] = [];
    const colsToClear: number[] = [];
    
    // Check rows
    for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
      let full = true;
      for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
        if (this.state.grid[y][x] === null) {
          full = false;
          break;
        }
      }
      if (full) rowsToClear.push(y);
    }
    
    // Check columns
    for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
      let full = true;
      for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
        if (this.state.grid[y][x] === null) {
          full = false;
          break;
        }
      }
      if (full) colsToClear.push(x);
    }
    
    if (rowsToClear.length === 0 && colsToClear.length === 0) {
      return 0;
    }
    
    console.log("[BlockBlastGame.checkAndClearLines] Clearing rows:", rowsToClear, "cols:", colsToClear);
    
    // Collect cells to clear (avoiding duplicates)
    const cellsToClear = new Set<string>();
    
    for (const y of rowsToClear) {
      for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
        cellsToClear.add(x + "," + y);
      }
    }
    
    for (const x of colsToClear) {
      for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
        cellsToClear.add(x + "," + y);
      }
    }
    
    // Animate rows with sweeping wave effect (left to right)
    for (const row of rowsToClear) {
      for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
        const colorIndex = this.state.grid[row][x];
        if (colorIndex !== null) {
          const color = CONFIG.BLOCK_COLORS[colorIndex];
          const cellCenterX = this.gridOffsetX + (x + 0.5) * this.cellSize;
          const cellCenterY = this.gridOffsetY + (row + 0.5) * this.cellSize;
          const delay = x * 0.04; // Sweep left to right
          
          setTimeout(() => {
            // Full line clear: extra particles + horizontal burst
            this.particles.emit(cellCenterX, cellCenterY, color.main, 8, "clear");
            this.particles.emit(cellCenterX, cellCenterY, "#ffffff", 4, "spark");
            // Directional burst along the row
            this.particles.emit(cellCenterX + 10, cellCenterY, color.glow, 3, "burst");
          }, delay * 1000);
          
          this.animations.addClearAnimation(x, row, delay);
        }
      }
    }
    
    // Animate columns with sweeping wave effect (top to bottom)
    for (const col of colsToClear) {
      for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
        // Skip if already cleared by a row
        if (rowsToClear.includes(y)) continue;
        
        const colorIndex = this.state.grid[y][col];
        if (colorIndex !== null) {
          const color = CONFIG.BLOCK_COLORS[colorIndex];
          const cellCenterX = this.gridOffsetX + (col + 0.5) * this.cellSize;
          const cellCenterY = this.gridOffsetY + (y + 0.5) * this.cellSize;
          const delay = y * 0.04; // Sweep top to bottom
          
          setTimeout(() => {
            // Full line clear: extra particles + vertical burst
            this.particles.emit(cellCenterX, cellCenterY, color.main, 8, "clear");
            this.particles.emit(cellCenterX, cellCenterY, "#ffffff", 4, "spark");
            // Directional burst along the column
            this.particles.emit(cellCenterX, cellCenterY + 10, color.glow, 3, "burst");
          }, delay * 1000);
          
          this.animations.addClearAnimation(col, y, delay);
        }
      }
    }
    
    // Big celebration burst at center for any line clear
    const centerX = this.gridOffsetX + (CONFIG.GRID_SIZE / 2) * this.cellSize;
    const centerY = this.gridOffsetY + (CONFIG.GRID_SIZE / 2) * this.cellSize;
    const totalLines = rowsToClear.length + colsToClear.length;
    setTimeout(() => {
      // More particles for more lines cleared
      this.particles.emit(centerX, centerY, "#ffd700", 8 + totalLines * 4, "burst");
      if (totalLines >= 2) {
        this.particles.emit(centerX, centerY, "#ffffff", 6, "burst");
      }
    }, 150);
    
    // Actually clear the grid after animation starts
    setTimeout(() => {
      for (const key of cellsToClear) {
        const [x, y] = key.split(",").map(Number);
        this.state.grid[y][x] = null;
      }
    }, 100);
    
    return rowsToClear.length + colsToClear.length;
  }

  checkGameOver(): boolean {
    // Check if any piece in the queue can be placed
    for (const piece of this.state.blockQueue) {
      for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
        for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
          if (this.canPlacePiece(piece, x, y)) {
            return false;
          }
        }
      }
    }
    
    console.log("[BlockBlastGame.checkGameOver] No valid moves!");
    return true;
  }

  endGame(): void {
    console.log("[BlockBlastGame.endGame] Final score:", this.state.score);
    
    this.state.gameOver = true;
    
    // Stop gameplay music and play game over audio
    this.audio.stopMusic();
    this.audio.playGameOverSound();
    setTimeout(() => this.audio.playGameOverMusic(), 500);
    
    // Submit score to platform leaderboard
    if (typeof (window as any).submitScore === "function") {
      (window as any).submitScore(this.state.score);
      console.log("[BlockBlastGame.endGame] Score submitted to leaderboard:", this.state.score);
    }
    
    // Check for new high score
    const isNewHighScore = this.state.score > this.state.highScore;
    if (isNewHighScore) {
      this.state.highScore = this.state.score;
      this.saveHighScore(this.state.score);
    }
    
    // Update game over screen
    document.getElementById("finalScore")!.textContent = this.state.score.toString();
    document.getElementById("linesCleared")!.textContent = this.state.linesCleared.toString();
    document.getElementById("blocksPlaced")!.textContent = this.state.blocksPlaced.toString();
    document.getElementById("maxCombo2")!.textContent = (this.state.maxCombo || 1).toString();
    
    const newHighScoreEl = document.getElementById("newHighScore")!;
    if (isNewHighScore) {
      newHighScoreEl.classList.add("show");
    } else {
      newHighScoreEl.classList.remove("show");
    }
    
    // Show game over screen after a delay
    setTimeout(() => {
      document.getElementById("gameOverScreen")?.classList.remove("hidden");
    }, 500);
  }

  comboHideTimeout: number = 0;

  showClearType(linesCleared: number, streak: number): void {
    console.log("[BlockBlastGame.showClearType] lines:", linesCleared, "streak:", streak);
    const comboDisplay = document.getElementById("comboDisplay")!;
    const comboText = document.getElementById("comboText")!;
    
    // Clear type based on lines cleared
    let clearName = "";
    if (linesCleared === 1) {
      clearName = "CLEAR";
    } else if (linesCleared === 2) {
      clearName = "DOUBLE";
    } else if (linesCleared === 3) {
      clearName = "TRIPLE";
    } else if (linesCleared >= 4) {
      clearName = "MEGA";
    }
    
    // Add streak multiplier if > 1
    let displayText = clearName;
    if (streak > 1) {
      displayText = clearName + " x" + streak;
    }
    
    comboText.textContent = displayText;
    
    // Simple sizing based on lines cleared
    const baseSize = this.isMobile ? 2.5 : 3.5;
    const bonus = Math.min(linesCleared - 1, 2) * 0.5;
    comboDisplay.style.fontSize = (baseSize + bonus) + "rem";
    
    // Simple styling
    comboDisplay.removeAttribute("data-combo");
    
    // Reset and trigger animation
    comboDisplay.classList.remove("active");
    void comboDisplay.offsetWidth;
    comboDisplay.classList.add("active");
    
    // Auto-hide after 800ms
    clearTimeout(this.comboHideTimeout);
    this.comboHideTimeout = window.setTimeout(() => {
      this.hideCombo();
    }, 800);
  }

  hideCombo(): void {
    const comboDisplay = document.getElementById("comboDisplay");
    if (comboDisplay) {
      comboDisplay.classList.remove("active");
      comboDisplay.removeAttribute("data-combo");
    }
  }

  updateHUD(): void {
    const scoreEl = document.getElementById("score")!;
    const oldScore = parseInt(scoreEl.textContent || "0", 10);
    const newScore = this.state.score;
    
    scoreEl.textContent = newScore.toString();
    document.getElementById("highScore")!.textContent = this.state.highScore.toString();
    
    // Trigger bump animation when score increases
    if (newScore > oldScore) {
      scoreEl.classList.remove("bump");
      // Force reflow to restart animation
      void scoreEl.offsetWidth;
      scoreEl.classList.add("bump");
    }
  }

  // ============= GAME LOOP =============
  gameLoop(timestamp: number): void {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1); // Cap delta time
    this.lastTime = timestamp;
    
    this.update(dt);
    this.render();
    
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt: number): void {
    // Update systems
    this.particles.update(dt);
    this.floatingText.update(dt);
    this.animations.update(dt);
    
    // Animate queue pieces scale
    for (const piece of this.state.blockQueue) {
      piece.scale = lerp(piece.scale, piece.targetScale, 0.2);
    }
  }

  render(): void {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Clear
    ctx.fillStyle = "#0f0f23";
    ctx.fillRect(0, 0, w, h);
    
    // Apply screen shake
    ctx.save();
    ctx.translate(this.animations.screenShake.x, this.animations.screenShake.y);
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.5, "#16213e");
    gradient.addColorStop(1, "#0f0f23");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    
    if (this.state.started) {
      this.renderGrid(ctx);
      this.renderGhost(ctx);
      this.renderQueue(ctx);
      this.renderDraggedPiece(ctx);
    }
    
    // Render effects (always on top)
    this.particles.draw(ctx);
    this.floatingText.draw(ctx);
    
    ctx.restore();
  }

  renderGrid(ctx: CanvasRenderingContext2D): void {
    const padding = 4;
    const borderRadius = 12;
    
    // Draw grid background
    ctx.fillStyle = CONFIG.GRID_BG;
    this.roundRect(
      ctx,
      this.gridOffsetX - padding,
      this.gridOffsetY - padding,
      CONFIG.GRID_SIZE * this.cellSize + padding * 2,
      CONFIG.GRID_SIZE * this.cellSize + padding * 2,
      borderRadius
    );
    ctx.fill();
    
    // Draw cells
    for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
      for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
        const cellX = this.gridOffsetX + x * this.cellSize;
        const cellY = this.gridOffsetY + y * this.cellSize;
        const cellPadding = 2;
        const cellRadius = 6;
        
        // Check for clear animation
        const clearState = this.animations.getClearState(x, y);
        
        if (clearState.clearing && clearState.progress > 0) {
          // Animate clearing
          ctx.save();
          const scale = 1 - easeInOutQuad(clearState.progress);
          const centerX = cellX + this.cellSize / 2;
          const centerY = cellY + this.cellSize / 2;
          ctx.translate(centerX, centerY);
          ctx.scale(scale, scale);
          ctx.translate(-centerX, -centerY);
        }
        
        // Draw cell background
        ctx.fillStyle = CONFIG.GRID_CELL_BG;
        this.roundRect(
          ctx,
          cellX + cellPadding,
          cellY + cellPadding,
          this.cellSize - cellPadding * 2,
          this.cellSize - cellPadding * 2,
          cellRadius
        );
        ctx.fill();
        
        // Draw block if present
        const colorIndex = this.state.grid[y][x];
        if (colorIndex !== null && (!clearState.clearing || clearState.progress === 0)) {
          const color = CONFIG.BLOCK_COLORS[colorIndex];
          const placeScale = this.animations.getPlaceScale(x, y);
          
          this.renderBlock(
            ctx,
            cellX + this.cellSize / 2,
            cellY + this.cellSize / 2,
            this.cellSize - cellPadding * 2 - 4,
            color,
            placeScale
          );
        }
        
        if (clearState.clearing && clearState.progress > 0) {
          ctx.restore();
        }
      }
    }
  }

  renderGhost(ctx: CanvasRenderingContext2D): void {
    if (!this.draggedPiece || !this.ghostPos) return;
    
    // Only render ghost if placement is valid (all cells in bounds AND all cells empty)
    if (!this.isValidPlacement) return;
    
    const { gridX, gridY } = this.ghostPos;
    const color = CONFIG.BLOCK_COLORS[this.draggedPiece.colorIndex];
    const cellPadding = 2;
    
    ctx.save();
    ctx.globalAlpha = 0.5;
    
    for (const [cx, cy] of this.draggedPiece.cells) {
      const x = gridX + cx;
      const y = gridY + cy;
      
      const cellX = this.gridOffsetX + x * this.cellSize;
      const cellY = this.gridOffsetY + y * this.cellSize;
      
      // Draw glow for valid placement
      ctx.shadowColor = color.glow;
      ctx.shadowBlur = 15;
      
      this.renderBlock(
        ctx,
        cellX + this.cellSize / 2,
        cellY + this.cellSize / 2,
        this.cellSize - cellPadding * 2 - 4,
        color,
        1
      );
      
      ctx.shadowBlur = 0;
    }
    
    ctx.restore();
  }

  renderQueue(ctx: CanvasRenderingContext2D): void {
    // Draw queue area label
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "600 14px Nunito, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("DRAG TO PLACE", this.canvas.width / 2, this.queueY);
    
    for (let i = 0; i < this.state.blockQueue.length; i++) {
      if (i === this.draggedPieceIndex) continue; // Don't render dragged piece here
      
      const piece = this.state.blockQueue[i];
      const color = CONFIG.BLOCK_COLORS[piece.colorIndex];
      
      ctx.save();
      
      // Apply scale animation
      const bounds = this.getPieceBounds(piece);
      const pieceWidth = (bounds.maxX - bounds.minX + 1) * this.queueCellSize;
      const pieceHeight = (bounds.maxY - bounds.minY + 1) * this.queueCellSize;
      const centerX = piece.x + pieceWidth / 2;
      const centerY = piece.y + pieceHeight / 2;
      
      ctx.translate(centerX, centerY);
      ctx.scale(piece.scale, piece.scale);
      ctx.translate(-centerX, -centerY);
      
      for (const [cx, cy] of piece.cells) {
        const blockX = piece.x + (cx - bounds.minX) * this.queueCellSize;
        const blockY = piece.y + (cy - bounds.minY) * this.queueCellSize;
        
        this.renderBlock(
          ctx,
          blockX + this.queueCellSize / 2,
          blockY + this.queueCellSize / 2,
          this.queueCellSize - 4,
          color,
          1
        );
      }
      
      ctx.restore();
    }
  }

  renderDraggedPiece(ctx: CanvasRenderingContext2D): void {
    if (!this.draggedPiece) return;
    
    const color = CONFIG.BLOCK_COLORS[this.draggedPiece.colorIndex];
    const bounds = this.getPieceBounds(this.draggedPiece);
    
    // Offset so piece appears well above finger on mobile
    const fingerOffset = this.isMobile ? 120 : 30;
    
    // Center the piece on cursor position
    const pieceCenterOffsetX = (bounds.maxX + bounds.minX) / 2;
    const pieceCenterOffsetY = (bounds.maxY + bounds.minY) / 2;
    
    ctx.save();
    
    // Scale effect
    const scale = this.draggedPiece.scale;
    ctx.translate(this.dragPos.x, this.dragPos.y - fingerOffset);
    ctx.scale(scale, scale);
    
    // Add glow when valid
    if (this.isValidPlacement) {
      ctx.shadowColor = color.glow;
      ctx.shadowBlur = 20;
    }
    
    for (const [cx, cy] of this.draggedPiece.cells) {
      const blockX = (cx - pieceCenterOffsetX) * this.cellSize;
      const blockY = (cy - pieceCenterOffsetY) * this.cellSize;
      
      this.renderBlock(
        ctx,
        blockX,
        blockY,
        this.cellSize - 8,
        color,
        1
      );
    }
    
    ctx.restore();
  }

  renderBlock(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    size: number,
    color: { main: string; light: string; dark: string; glow: string },
    scale: number
  ): void {
    const s = size * scale;
    const x = centerX - s / 2;
    const y = centerY - s / 2;
    const radius = Math.max(4, s * 0.15);
    
    // Main block
    ctx.fillStyle = color.main;
    this.roundRect(ctx, x, y, s, s, radius);
    ctx.fill();
    
    // Top highlight
    ctx.fillStyle = color.light;
    this.roundRect(ctx, x, y, s, s * 0.4, radius);
    ctx.fill();
    
    // Inner shadow (bottom right)
    ctx.fillStyle = color.dark;
    this.roundRect(ctx, x + s * 0.1, y + s * 0.6, s * 0.85, s * 0.35, radius * 0.7);
    ctx.fill();
    
    // Glossy highlight
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    this.roundRect(ctx, x + s * 0.15, y + s * 0.1, s * 0.3, s * 0.15, radius * 0.5);
    ctx.fill();
  }

  roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

// ============= INITIALIZE =============
window.addEventListener("DOMContentLoaded", () => {
  console.log("[main] Initializing Grid Surge");
  new BlockBlastGame();
});
