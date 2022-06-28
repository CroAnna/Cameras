"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const naslov = document.title;
  const pageTheme = document.body;

  if (localStorage.getItem("colorThemeLocal") === null) {
    localStorage.setItem("colorThemeLocal", "default");
  }

  checkStatus();

  function checkStatus() {
    console.log("pozvan set theme");

    // mozda ni ne treba ovo sve
    if (localStorage.getItem("colorThemeLocal") === "default-theme") {
      pageTheme.classList.remove("second-theme");
      pageTheme.classList.add("default");
    } else if (localStorage.getItem("colorThemeLocal") === "second-theme") {
      pageTheme.classList.remove("default");
      pageTheme.classList.add("second-theme");
    } else {
      pageTheme.classList.remove("default");
      pageTheme.classList.add("third-theme");
    }
  }

  // function to set a given theme/color-scheme
  function setTheme(themeName) {
    console.log(themeName);
    localStorage.setItem("colorThemeLocal", themeName);
    console.log(
      `colorThemeLocal novi: ${localStorage.getItem("colorThemeLocal")}`
    );
    document.documentElement.className = themeName;
  }

  // Immediately invoked function to set the theme on initial load
  // (function () {
  //   if (localStorage.getItem("theme") === "default-theme") {
  //     setTheme("default-theme");
  //   } else {
  //     setTheme("second-theme");
  //   }
  // })();

  var navEl = document.querySelectorAll(".navig");
  for (let i = 0; i < navEl.length; i++) {
    navEl[i].addEventListener("click", function (e) {
      if (confirm(`Sigurno odlazis?`)) {
      } else {
        e.preventDefault();
        window.alert(`Ostajemo na ${naslov}`);
        e.stopImmediatePropagation();
      }
    });
  }

  switch (naslov) {
    case "Pocetna stranica": {
      const paleta1El = document.getElementById("paleta1");
      const paleta2El = document.getElementById("paleta2");
      const paleta3El = document.getElementById("paleta3");

      const paletaBojaEl = document.querySelector(".prijava-btn2");
      const paletaProzorEl = document.querySelector(".paleta-prozor");
      const btnZatvori = document.querySelector(".zatvori");

      function promjenaPaleta(selectedTheme) {
        console.log("pro");
        setTheme(selectedTheme);
        pageTheme.classList.remove("default-theme");
        pageTheme.classList.remove("third-theme");
        pageTheme.classList.remove("second-theme");
        pageTheme.classList.add(selectedTheme);
      }

      // function promjenaPaleta1() {
      //   console.log("pro");
      //   setTheme("default-theme");
      //   pageTheme.classList.remove("third-theme");
      //   pageTheme.classList.remove("second-theme");
      //   pageTheme.classList.add("default-theme");
      // }

      paleta1El.addEventListener("click", () => {
        promjenaPaleta("default-theme");
      });
      paleta2El.addEventListener("click", () => {
        promjenaPaleta("second-theme");
      });
      paleta3El.addEventListener("click", () => {
        promjenaPaleta("third-theme");
      });

      // function promjenaPaleta3() {
      //   console.log("pro");
      //   setTheme("third-theme");
      //   pageTheme.classList.remove("second-theme");
      //   pageTheme.classList.remove("default-theme");
      //   pageTheme.classList.add("third-theme");
      // }

      // function promjenaPaleta2() {
      //   setTheme("second-theme");
      //   pageTheme.classList.remove("third-theme");
      //   pageTheme.classList.remove("default-theme");
      //   pageTheme.classList.add("second-theme");
      // }

      const otvoriSkocni = function () {
        paletaProzorEl.classList.remove("sakrij");
      };

      const zatvoriSkocni = function () {
        paletaProzorEl.classList.add("sakrij");
      };
      paletaBojaEl.addEventListener("click", otvoriSkocni);
      btnZatvori.addEventListener("click", zatvoriSkocni);

      const ispisParEl = document.querySelector(".ispod-slike");
      let X = -1,
        Y = -1;

      const krugEL = document.querySelector(".krug");
      const pravokutnikEL = document.querySelector(".pravokutnik");
      const mnogokutEL = document.querySelector(".mnogokut");

      krugEL.addEventListener("mouseover", sve);
      pravokutnikEL.addEventListener("mouseover", sve);
      mnogokutEL.addEventListener("mouseover", sve);

      function sve() {
        console.log(this.classList.value);

        let oblik = this.classList.value;
        let koordinate = this.getAttribute("coords");
        console.log(koordinate);

        var odvojeno = koordinate.split(",");
        ispisParEl.innerHTML = `kursor: X=${X}, Y=${Y} ==> ${oblik}: `;

        switch (oblik) {
          case "pravokutnik": {
            ispisParEl.innerHTML += `X1=${odvojeno[0]}, Y1=${odvojeno[1]}, X2=${odvojeno[2]}, Y2=${odvojeno[3]}`;
            break;
          }
          case "krug": {
            ispisParEl.innerHTML += `X1=${odvojeno[0]}, Y1=${odvojeno[1]}, R=${odvojeno[2]}`;

            break;
          }
          case "mnogokut": {
            let slovo,
              brojac = 0;
            for (let i = 0; i < odvojeno.length; i++) {
              if (i % 2 == 0) {
                slovo = "X";
                brojac++;
              } else slovo = "Y";
              ispisParEl.innerHTML += `${slovo}${brojac}=${odvojeno[i]}, `;
            }
            break;
          }
        }
      }

      document.onmousemove = function (event) {
        X = event.pageX;
        Y = event.pageY;
      };

      break;
    }

    case "Obrazac": {
      console.log(`Dobrodosli na ${naslov}`);
      const btnURedu = document.querySelector(".uredu");
      let drugiDioPrikazan = false;

      function provjeraForme(e) {
        const nazivKamereEl = document.forms["forma"]["nazivKamere"];
        const specifikacijeEl = document.forms["forma"]["specifikacije"];
        const vrstaKamereEl = document.forms["forma"]["vrstaKamere"];

        const ocuvanostKamereEl = document.forms["forma"]["ocuvanostKamere"];
        const cijenaEl = document.forms["forma"]["cijena"];

        let provjera1 = true,
          provjera2 = true,
          provjera3 = true,
          provjera4 = true,
          provjera5 = true,
          provjera9 = true;

        const label9 = document.querySelector("#labelproizvodac");

        const proizvodacEl = document.getElementById("proizvodac[]");
        var odredeniOdabiri = [...proizvodacEl.selectedOptions].map(
          (option) => option.value
        );

        if (odredeniOdabiri.length < 2) {
          e.stopImmediatePropagation();
          e.preventDefault();
          provjera9 = false;
          proizvodacEl.style.backgroundColor = "var(--red)";
          label9.innerHTML = " Proizvodac: *";
          label9.style.color = "var(--red)";
        } else {
          provjera9 = true;
          label9.innerHTML = "Naziv kamere: ✔";
          label9.style.color = "var(--orange)";
          proizvodacEl.style.backgroundColor = "var(--yellowish)";
        }

        const label1 = document.querySelector("#labelnazivKamere");
        if (!nazivKamereEl.value) {
          label1.innerHTML = "Naziv kamere: *";
          e.stopImmediatePropagation();
          e.preventDefault();
          provjera1 = false;
          nazivKamereEl.style.backgroundColor = "var(--red)";
          label1.style.color = "var(--red)";
        } else {
          provjera1 = true;
          label1.innerHTML = "Naziv kamere: ✔";
          nazivKamereEl.style.backgroundColor = "var(--yellowish)";
          label1.style.color = "var(--orange)";
        }

        const label2 = document.querySelector("#labelspecifikacije");
        if (!specifikacijeEl.value) {
          e.stopImmediatePropagation();
          e.preventDefault();
          provjera2 = false;
          specifikacijeEl.style.backgroundColor = "var(--red)";
          label2.innerHTML = " Specifikacije: *";
          label2.style.color = "var(--red)";
        } else {
          provjera2 = true;
          label2.innerHTML = " Specifikacije: ✔";
          specifikacijeEl.style.backgroundColor = "var(--yellowish)";
          label2.style.color = "var(--orange)";
        }

        const label3 = document.querySelector("#labeltxt-vrsta-kamere");
        if (!vrstaKamereEl.value) {
          e.stopImmediatePropagation();
          e.preventDefault();
          provjera3 = false;
          label3.innerHTML = " Vrsta kamere: *";
          label3.style.color = "var(--red)";
        } else {
          provjera3 = true;
          label3.innerHTML = " Vrsta kamere: ✔";
          label3.style.color = "var(--orange)";
        }

        const label4 = document.querySelector("#labelOcuvanostKamere");
        if (
          !ocuvanostKamereEl.value ||
          ocuvanostKamereEl.value > 100 ||
          ocuvanostKamereEl.value < 0
        ) {
          label4.innerHTML = " Očuvanost kamere: *";
          e.stopImmediatePropagation();
          e.preventDefault();
          provjera4 = false;
          label4.style.color = "var(--red)";
          ocuvanostKamereEl.style.backgroundColor = "var(--red)";
        } else {
          provjera4 = true;
          label4.innerHTML = " Očuvanost kamere: ✔";
          ocuvanostKamereEl.style.backgroundColor = "var(--yellowish)";
          label4.style.color = "var(--orange)";
        }

        const label5 = document.querySelector("#labelcijena");
        if (!cijenaEl.value || cijenaEl.value > 100 || cijenaEl.value < 0) {
          label5.innerHTML = " Cijena: *";
          e.stopImmediatePropagation();
          e.preventDefault();
          cijenaEl.style.backgroundColor = "var(--red)";
          label5.style.color = "var(--red)";
          provjera5 = false;
        } else {
          provjera5 = true;
          label5.innerHTML = " Cijena: ✔";
          cijenaEl.style.backgroundColor = "var(--yellowish)";
          label5.style.color = "var(--orange)";
        }

        if (
          provjera1 &&
          provjera2 &&
          provjera3 &&
          provjera4 &&
          provjera5 &&
          provjera9
        ) {
          console.log("sve ispunjeno");
          if (!drugiDioPrikazan) {
            drugiDioPrikazan = true;
            prikazi();
            e.stopImmediatePropagation();
            e.preventDefault();
          } else {
            console.log("vec je otvoreno i sad ce se provjerit");
            drugiDioProvjere();
            if (drugiDioProvjere() == false) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          }
        }
      }

      function drugiDioProvjere(e) {
        console.log("drugi dio provjere");
        let provjera6 = true,
          provjera7 = true,
          provjera8 = true;

        const datumEl = document.forms["forma"]["datumVrijeme"];
        const emailEl = document.forms["forma"]["email"];
        const telEl = document.forms["forma"]["telefon"];

        const label6 = document.querySelector("#pomeri-me");
        const label7 = document.querySelector("#labelemail");
        const label8 = document.querySelector("#labeltelefon");
        console.log(`email: ${emailEl.value}`);
        console.log(`datum: ${datumEl.value}`);
        console.log(`tel: ${telEl.value}`);

        if (!datumEl.value) {
          provjera6 = false;
          label6.innerHTML = " Datum i vrijeme kupnje: *";
          label6.style.color = "var(--red)";
          datumEl.style.backgroundColor = "var(--red)";
          return false;
        } else {
          provjera6 = true;
          label6.innerHTML = "Datum i vrijeme kupnje: ✔";
          label6.style.color = "var(--orange)";
          datumEl.style.backgroundColor = "var(--yellowish)";
        }

        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (regexEmail.test(emailEl.value)) console.log("email je u regexu");

        if (!emailEl.value || !regexEmail.test(emailEl.value)) {
          provjera7 = false;
          label7.innerHTML = " E-mail kupca: *";
          label7.style.color = "var(--red)";
          emailEl.style.backgroundColor = "var(--red)";
          return false;
        } else {
          provjera7 = true;
          label7.innerHTML = "E-mail kupca: ✔";
          label7.style.color = "var(--orange)";
          emailEl.style.backgroundColor = "var(--yellowish)";
        }
        let regexTel = /^[0-9]{3}[-\s\.][0-9]{3}[-\s\.][0-9]{4,6}$/;

        if (regexTel.test(telEl.value)) console.log("telefon je u regexu");

        if (!telEl.value || !regexTel.test(telEl.value)) {
          provjera8 = false;
          label8.innerHTML = "Telefon kupca: *";
          label8.style.color = "var(--red)";
          telEl.style.backgroundColor = "var(--red)";
          return false;
        } else {
          provjera8 = true;
          label8.innerHTML = "Telefon kupca: ✔";
          label8.style.color = "var(--orange)";
          telEl.style.backgroundColor = "var(--yellowish)";
        }

        if (provjera7 && provjera8 && provjera6) {
          console.log("sve ispunjeno broj 2");
        }
      }

      const viewInformacije = document.querySelector(".tem-cjelina2");

      btnURedu.addEventListener("click", provjeraForme);

      function prikazi() {
        viewInformacije.classList.remove("sakrij");
      }

      break;
    }
  }
});
