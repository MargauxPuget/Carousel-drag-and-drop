// sélection de l'élément de curseur, du curseur lui-même et du conteneur de curseur
let sliderContainer = document.querySelector('.slider-container');
let innerSlider = document.querySelector('.inner-slider');

// variable correspondante au bouton pressé.
let pressed = false;
// valeur du x lorque le bouton est pressé
let startX;
let x;


// mouseenter : lorsque la souris entre dans l'espace voulu ici 'sliderContainer'
sliderContainer.addEventListener("mouseenter", () => {
  sliderContainer.style.cursor = "grab";
});

// mousedown : bouton de souri pressé dans un élement donné
// click = bouton de souris pressé puis relaché dans un élement donné
sliderContainer.addEventListener("mousedown", (e) => {
  pressed = true;
  startX = e.offsetX - innerSlider.offsetLeft;
  // style du curseur
  sliderContainer.style.cursor = "grabbing";
});

// mouseup : événement est déclenché lorsque le pointeur se trouve dans l'élément et qu'un bouton de la souris est relâché.
sliderContainer.addEventListener("mouseup", () => {
  sliderContainer.style.cursor = "grab";
  pressed = false;
});

// créons le mouvement
// mousemove : Lorsqu'une souris est déplacée alors que le curseur est à l'intérieur d'un élément.
sliderContainer.addEventListener("mousemove", (e) => {
  // on vérifie qu ela sourie est pressée sinon on sort
  if (!pressed) return;
  // bloque le comportement par défault qui ne nous intéresse pas 
  e.preventDefault();

  // on définit le x en fonction de sa position
  x = e.offsetX;

  // puis on fait la différence avec la dernière position connue
  innerSlider.style.left = `${x - startX}px`;
   checkBoundary();
});

// vérification des limites
const checkBoundary = () => {
  // getBoundingClientRect() : retourne un objet DOMRect fournissant des informations sur la taille d'un élément et sa position relative par rapport à la zone d'affichage.
  let outer = sliderContainer.getBoundingClientRect();
  console.log(outer);
  let inner = innerSlider.getBoundingClientRect();
  console.log(inner);

  // bloque le défilement sur la gauche
  if (parseInt(innerSlider.style.left) > 0) {
      innerSlider.style.left = "0px";
  }

  // bloque le défilement sur la droite
  if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
};
