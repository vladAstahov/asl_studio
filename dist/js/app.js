(() => {
  "use strict";

  const s = document.querySelector("#main");
  window.onload = () => {
    s?.classList.add("is-visible");
  };
  const e = s => {
      const e = document.querySelector(`#${s}`);
      return {
        classList: e?.classList,
        offset: e?.getBoundingClientRect().top - e?.clientHeight / 2,
        isShowed: e?.classList.contains("is-visible") ?? !1
      };
    },
    t = [e("benefits"), e("tariff"), e("promotion")],
    i = () => {
      const s = window.scrollY;
      t.forEach(e => {
        s > e.offset && !e.isShowed && e.classList.add("is-visible");
      }), s + window.innerHeight >= document.body.scrollHeight && document.removeEventListener("scroll", i);
    };
  document.addEventListener("scroll", i);
})();