//const refs = {
//days: document.querySelector('[data-value="days"]'),
//hours: document.querySelector('[data-value="hours"]'),
//minutes: document.querySelector('[data-value="mins"]'),
//seconds: document.querySelector('[data-value="secs"]'),
//};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerId = null;
    this.timeClock();

    this.days = document.querySelector(`${selector} [data-value="days"]`);
    this.hours = document.querySelector(`${selector} [data-value="hours"]`);
    this.minutes = document.querySelector(`${selector} [data-value="mins"]`);
    this.seconds = document.querySelector(`${selector} [data-value="secs"]`);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );

    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  timeClock() {
    const startTime = this.targetDate.getTime();

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.screenDate(time);

      if (deltaTime <= 0) {
        this.clearTimer(this.timerId);
      }
    }, 1000);
  }

  screenDate({ days, hours, mins, secs }) {
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.minutes.textContent = mins;
    this.seconds.textContent = secs;
  }

  clearTimer() {
    clearInterval(this.timerId);

    this.days.textContent = "00";
    this.hours.textContent = "00";
    this.minutes.textContent = "00";
    this.seconds.textContent = "00";
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 22, 2021"),
});
