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
  return v1.distanceFromGrenoble < v2.distanceFromGrenoble;
}

// if (v1.distanceFromGrenoble < v2.distanceFromGrenoble) {
//   return true;
// }

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

// function swapBcpPlusMieux(i, j) {
//   [listeVille[i], listVille[j]] = [listVille[j], listVille[i]];
// }

function sort(type) {
  switch (type) {
    case "insert":
      insertsort(listVille);
      break;
    case "select":
      selectionsort(listVille);
      break;
    case "bubble":
      bubblesort(listVille);
      break;
    case "shell":
      shellsort(listVille);
      break;
    case "merge":
      listVille = mergesort(listVille);
      break;
    case "heap":
      heapsort(listVille);
      break;
    case "quick":
      quicksort(listVille);
      break;
  }
}

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

function selectionsort(listVille) {
  for (let i = 0; i < listVille.length; i++) {
    let min = i;
    for (let j = i + 1; j < listVille.length; j++) {
      if (isLess(listVille[j], listVille[min])) {
        min = j;
      }
    }
    swap(listVille, i, min);
  }
}

function bubblesort(listVille) {
  let i = 0;

  while (i < listVille.length - 1)
    if (isLess(listVille[i + 1], listVille[i])) {
      swap(listVille, i + 1, i);
      i = 0;
    } else {
      i++;
    }
}

function shellsort(listVille) {
  let sizeTable = listVille.length;
  let n = 0;

  while (n < sizeTable) {
    n = 3 * n + 1;
  }

  while (n != 0) {
    n = Math.floor(n / 3);

    for (i = n; i < sizeTable; i++) {
      let valeur = listVille[i];
      let j = i;

      while (j > n - 1 && isLess(valeur, listVille[j - n])) {
        swap(listVille, j, j - n);
        j = j - n;
      }
    }
  }
}

function mergesort(listVille) {
  let listVilleSize = listVille.length; //je déclare ma variable de la taille de mon tableau
  let middleOfMyTab = Math.floor(listVilleSize / 2); //je déclare ma variable pour la moitié de mon tableau
  if (listVilleSize <= 1) {
    return listVille;
  } else {
    let listVilleLeft = listVille.slice(0, middleOfMyTab); //moitié exclue
    let listVilleRight = listVille.slice(middleOfMyTab);

    return merge(mergesort(listVilleLeft), mergesort(listVilleRight));
  }
}

function merge(listVilleLeft, listVilleRight) {
  let listVilleResult = [];
  if (listVilleLeft.length < 1) {
    return listVilleRight;
  } else if (listVilleRight.length < 1) {
    return listVilleLeft;
  } else if (isLess(listVilleLeft[0], listVilleRight[0])) {
    listVilleResult.push(listVilleLeft[0]);
    return listVilleResult.concat(
      merge(listVilleLeft.slice(1), listVilleRight)
    );
  } else {
    listVilleResult.push(listVilleRight[0]);
    return listVilleResult.concat(
      merge(listVilleLeft, listVilleRight.slice(1))
    );
  }
}

function heapsort(listVille) {
  organiser(listVille);

  for (let i = listVille.length - 1; i > 0; i--) {
    swap(listVille, 0, i);
    redesecendre(listVille, i, 0);
  }
  return listVille;
}

function organiser(listVille) {
  for (let i = 0; i < listVille.length - 1; i++) {
    remonter(listVille, i);
  }
}

function remonter(listVille, i) {
  if (isLess(listVille[Math.floor(i / 2)], listVille[i])) {
    swap(listVille, Math.floor(i / 2), i);
    remonter(listVille, Math.floor(i / 2));
  }
}

function redesecendre(listVille, element, i) {
  let max;
  let formule = 2 * i + 1;
  if (formule < element) {
    if (isLess(listVille[2 * i], listVille[formule])) {
      max = formule;
    } else {
      max = 2 * i;
    }
    if (isLess(listVille[i], listVille[max])) {
      swap(listVille, i, max);
      redesecendre(listVille, element, max);
    }
  }
}

function quicksort(listVille, first = 0, last = listVille.length - 1) {
  if (first < last) {
    pi = part(listVille, first, last);
    quicksort(listVille, first, pi - 1);
    quicksort(listVille, pi + 1, last);
  }

  return listVille;
}

function part(listVille, first, last) {
  let pivot = last;
  let j = first;

  for (let i = first; i < pivot; i++) {
    if (isLess(listVille[i], listVille[pivot])) {
      swap(listVille, i, j);
      j++;
    }
  }

  swap(listVille, pivot, j);
  return j;
}
console.log("quicksort - implement me !");
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
