let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener("click", function () {
  csvFile = document.querySelector("#file-input").files[0];
  let reader = new FileReader();
  reader.addEventListener("load", function (e) {
    // récupération de la liste des villes
    listVille = getArrayCsv(e.target.result);

    // Calcul de la distance des villes par rapport à Grenoble
    listVille.forEach((ville) => {
      ville.distanceFromGrenoble = distanceFromGrenoble(ville);
    });
    // Tri
    const algo = $("#algo-select").val();
    nbPermutation = 0;
    nbComparaison = 0;
    sort(algo);

    // Affichage
    displayListVille();
  });
  reader.readAsText(csvFile);
});

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
  let listLine = csv.split("\n");
  listVille = [];
  let isFirstLine = true;
  listLine.forEach((line) => {
    if (isFirstLine || line === "") {
      isFirstLine = false;
    } else {
      let listColumn = line.split(";");
      listVille.push(
        new Ville(
          listColumn[8],
          listColumn[9],
          listColumn[11],
          listColumn[12],
          listColumn[13],
          0
        )
      );
    }
  });
  return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
  let lat1 = ville.latitude;
  let lon1 = ville.longitude;

  //Latitude et Longitude de Grenoble
  let lat2 = 45.166667;
  let lon2 = 5.716667;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres

  return d;
}

/**
 * Retourne vrai si la ville v1 est plus proche de Grenoble
 * par rapport à v2
 * @param {*} v1 distance de la ville v1
 * @param {*} v2 distance de la ville v2
 * @return vrai si la ville i est plus proche
 */
function isLess(v1, v2) {
  if (v1.distanceFromGrenoble < v2.distanceFromGrenoble) {
    return true;
  }
}

/**
 * interverti la ville à l'index i avec la ville à l'index j dans la liste des villes
 * @param {*} i
 * @param {*} j
 * @param {*} listeV
 */

function swap(listeV, i, j) {
  let intermediaire = listeV[i];
  listeV[i] = listeV[j];
  listeV[j] = intermediaire;
}

function sort(type) {
  switch (type) {
    case "insert":
      insertsort(listVille);
      break;
    case "select":
      selectionsort();
      break;
    case "bubble":
      bubblesort();
      break;
    case "shell":
      shellsort();
      break;
    case "merge":
      mergesort();
      break;
    case "heap":
      heapsort();
      break;
    case "quick":
      quicksort();
      break;
  }
}
// let j = 0;
// let intermediaire = 0;
// for (let i = 0; i < myTab3.length; i++) {
//   intermediaire = myTab3[i];
//   j = i - 1;
//   while (j >= 0 && myTab3[j] > myTab3[j + 1]) {
//     swap(myTab3, j + 1, j);

//     j--;
//   }
// }
function insertsort(listVille) {
  let j = 0;
  for (let i = 0; i < listVille.length; i++) {
    j = i - 1;
    while (j >= 0 && isLess(listVille[j + 1], listVille[j])) {
      swap(listVille, j + 1, j);
      j--;
    }
  }
}

function selectionsort() {
  console.log("selectionsort - implement me !");
}

function bubblesort() {
  console.log("bubblesort - implement me !");
}

function shellsort() {
  console.log("shellsort - implement me !");
}

function mergesort() {
  console.log("mergesort - implement me !");
}

function heapsort() {
  console.log("heapsort - implement me !");
}

function quicksort() {
  console.log("quicksort - implement me !");
}

/** MODEL */

class Ville {
  constructor(
    nom_commune,
    codes_postaux,
    latitude,
    longitude,
    dist,
    distanceFromGrenoble
  ) {
    this.nom_commune = nom_commune;
    this.codes_postaux = codes_postaux;
    this.latitude = latitude;
    this.longitude = longitude;
    this.dist = dist;
    this.distanceFromGrenoble = distanceFromGrenoble;
  }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
  document.getElementById("permutation").innerHTML =
    nbPermutation + " permutations";
}

function displayListVille() {
  document.getElementById("navp").innerHTML = "";
  displayPermutation(nbPermutation);
  let mainList = document.getElementById("navp");
  for (var i = 0; i < listVille.length; i++) {
    let item = listVille[i];
    let elem = document.createElement("li");
    elem.innerHTML =
      item.nom_commune +
      " - \t" +
      Math.round(item.distanceFromGrenoble * 100) / 100 +
      " m";
    mainList.appendChild(elem);
  }
}
