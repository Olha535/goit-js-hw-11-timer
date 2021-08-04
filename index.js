const refs = {
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  minutes: document.querySelector('[data-value="mins"]'),
  seconds: document.querySelector('[data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerId = null;
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

  screenDate({ days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = mins;
    refs.seconds.textContent = secs;
  }

  timeClock() {
    const startTime = this.targetDate.getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
      this.screenDate({ days, hours, mins, secs });
    }, 1000);
  }

  //stopTimer() {
  //clearInterval(this.timerId);

  //refs.days.textContent = "00";
  // refs.hours.textContent = "00";
  // refs.minutes.textContent = "0";
  //refs.seconds.textContent = "0";
  // }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Aug 22, 2021"),
});

console.log(timer);
