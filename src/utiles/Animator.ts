export default class Animator {
  playing = false;

  speed = 100;

  lastCallTime: number = 0

  currentFrameId?: number = undefined

  update: () => boolean

  constructor(update: () => boolean) {
    this.update = update;
  }

  private updater = () => {
    let currentTime = Date.now();
    if (currentTime - this.lastCallTime > this.speed) {
      console.log("Updating")
      this.lastCallTime = Date.now();
      if (!this.update()) {
        this.playing = false
        this.currentFrameId = undefined
        return
      }
    }
    this.currentFrameId = requestAnimationFrame(() => this.updater())
  }

  start() {
    console.log("In ani start")
    this.lastCallTime = 0
    if (this.currentFrameId) {
      cancelAnimationFrame(this.currentFrameId);
    }
    this.currentFrameId = requestAnimationFrame(this.updater)
    this.playing = true
  }

  stop() {
    if (this.currentFrameId) {
      cancelAnimationFrame(this.currentFrameId);
      this.currentFrameId = undefined
    }
    this.playing = false
  }

  setUpdateListener(update: () => boolean) {
    this.update = update;
  }

  isPlaying() {
    return this.playing
  }

  getSpeed(): number {
    return this.speed
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }
}