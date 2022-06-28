"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const naslov = document.title;
  const pageTheme = document.body;

  if (localStorage.getItem("colorThemeLocal") === null) {
    localStorage.setItem("colorThemeLocal", "default");
  }

  checkTheme();

  function checkTheme() {
    if (localStorage.getItem("colorThemeLocal") === "default-theme") {
      pageTheme.classList.remove("third-theme");
      pageTheme.classList.remove("second-theme");
      pageTheme.classList.add("default-theme");
    } else if (localStorage.getItem("colorThemeLocal") === "second-theme") {
      pageTheme.classList.remove("default-theme");
      pageTheme.classList.remove("third-theme");
      pageTheme.classList.add("second-theme");
    } else {
      pageTheme.classList.remove("default-theme");
      pageTheme.classList.remove("second-theme");
      pageTheme.classList.add("third-theme");
    }
  }

  function setTheme(themeName) {
    localStorage.setItem("colorThemeLocal", themeName);
    document.documentElement.className = themeName;
  }

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
      // theme
      const paleta1El = document.getElementById("paleta1");
      const paleta2El = document.getElementById("paleta2");
      const paleta3El = document.getElementById("paleta3");

      const paletaBojaEl = document.querySelector(".prijava-btn2");
      const paletaProzorEl = document.querySelector(".paleta-prozor");
      const btnZatvori = document.querySelector(".zatvori");

      function promjenaPaleta(selectedTheme) {
        setTheme(selectedTheme);
        pageTheme.classList.remove("default-theme");
        pageTheme.classList.remove("third-theme");
        pageTheme.classList.remove("second-theme");
        pageTheme.classList.add(selectedTheme);
      }

      paleta1El.addEventListener("click", () => {
        promjenaPaleta("default-theme");
      });
      paleta2El.addEventListener("click", () => {
        promjenaPaleta("second-theme");
      });
      paleta3El.addEventListener("click", () => {
        promjenaPaleta("third-theme");
      });

      const otvoriSkocni = function () {
        paletaProzorEl.classList.remove("sakrij");
      };

      const zatvoriSkocni = function () {
        paletaProzorEl.classList.add("sakrij");
      };

      paletaBojaEl.addEventListener("click", otvoriSkocni);
      btnZatvori.addEventListener("click", zatvoriSkocni);

      // CANVAS

      const btnPrikaziCanvas = document.querySelector(".prikaziCanvas");
      const btnGraf = document.querySelector("#graf-btn");
      const obrazacGrafEl = document.querySelector(".obrazacGraf");
      let opisGrafaEl = document.querySelector(".opisGrafa");
      const podatakEl = document.forms["forma-canvas"]["elementUnosa"];
      const kolicinaEl = document.forms["forma-canvas"]["elementKolicine"];
      var poljePodataka = [];
      var poljeOpisa = [];
      var boje = [
        "#f78e2c",
        "#f3d320",
        "#42c98a",
        "#e75b0a",
        "#500fb0",
        "#e7527c",
        "#542382",
        "#6b7280",
        "#111111",
      ];

      document.addEventListener("DOMContentLoaded", function () {
        prikaziCanvas();
      });
      btnPrikaziCanvas.addEventListener("click", function () {
        btnPrikaziCanvas.classList.add("sakrij");
        obrazacGrafEl.classList.remove("sakrij2");
      });
      let j = 1;
      btnGraf.addEventListener("click", function () {
        poljePodataka.push(kolicinaEl.value);
        poljeOpisa.push(podatakEl.value);
        var list = document.getElementById("list");
        var newEl = document.createElement("li");
        newEl.setAttribute("id", "item" + j + "");
        newEl.innerHTML += `${j}. ${podatakEl.value}`;
        newEl.setAttribute("onclick", "remove(this)");
        list.appendChild(newEl);
        newEl.style.color = "#f4f4f4";
        nacrtajGraf();
        j++;
      });
      prikaziCanvas();
      // funkcije:
      function prikaziCanvas() {
        var temp = document.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        document.getElementById("novi").appendChild(clon);
        nacrtajGraf();
      }

      function nacrtajGraf() {
        var ctx = myCanvas.getContext("2d");

        for (var i = 0; i < poljePodataka.length; i++) {
          drawHistogram([i] + 10, 0, 55, poljePodataka[i], boje[i]);
        }
        function drawHistogram(x, y, w, h, color) {
          ctx.save();
          ctx.fillStyle = color;
          ctx.fillRect(x, y, w, h);
          ctx.restore();
        }
      }

      btnGraf.addEventListener("click", function () {});

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
        let oblik = this.classList.value;
        let koordinate = this.getAttribute("coords");

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
          if (!drugiDioPrikazan) {
            drugiDioPrikazan = true;
            prikazi();
            e.stopImmediatePropagation();
            e.preventDefault();
          } else {
            drugiDioProvjere();
            if (drugiDioProvjere() == false) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }
          }
        }
      }

      function drugiDioProvjere(e) {
        let provjera6 = true,
          provjera7 = true,
          provjera8 = true;

        const datumEl = document.forms["forma"]["datumVrijeme"];
        const emailEl = document.forms["forma"]["email"];
        const telEl = document.forms["forma"]["telefon"];

        const label6 = document.querySelector("#pomeri-me");
        const label7 = document.querySelector("#labelemail");
        const label8 = document.querySelector("#labeltelefon");

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
