
import { jsPDF } from "jspdf";


const form = document.querySelector("form");
const nextBtn = form.querySelector(".nextBtn");
const backBtn = form.querySelector(".backBtn");
const allInput = form.querySelectorAll(".first input");
const genreSelect = form.querySelector(".input-field select");



nextBtn.addEventListener("click", () => {
  allInput.forEach(input => {
    if (input.value !== "") {
      form.classList.add('secActive');
    } else {
      form.classList.remove('secActive');
    }
  });
});

backBtn.addEventListener("click", () => form.classList.remove('secActive'));

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const doc = new jsPDF();
  
  /*// Charger l'image à partir d'une URL
  const imageUrl = 'https://www.datapathology.ma/images/annasr.jpg';

  // Définir les coordonnées et les dimensions de l'image
  const x = 5;
  const y = 5;
  const width = 10;
  const height = 10;

  // Insérer l'image dans le document PDF
  doc.addImage(imageUrl, 'JPEG', x, y, width, height);*/
  function isPageFull(currentPosition) {
    const pageHeight = doc.internal.pageSize.height;
    // get position y

    return currentPosition >= pageHeight - 30;
  }
  
  // Récupérer les valeurs des champs
  const nom = document.getElementById('nom').value;
  const daten = document.getElementById('dn').value;
  const reference = document.getElementById('ref').value;
  const dated = document.getElementById('dd').value;
  const numa = document.getElementById('na').value;
  // Définir la police et la taille du titre
  doc.setFont('helvetica');
  doc.setFontSize(18);
  // Ajouter les valeurs au document PDF
  doc.text("Rapport d'histopathologie du cancer du poumon", 30, 10);
  
  const rectX = 5;
  const rectY = 25;
  const rectWidth = 200; // Largeur du rectangle basée sur la largeur du texte
  const rectHeight = 20; // Hauteur du rectangle
  doc.rect(rectX, rectY, rectWidth, rectHeight, 'S'); // Dessiner le rectangle
  //doc.text(contenuParagraphe, rectX + 5, rectY + 7);  Ajouter le texte à l'intérieur du rectangle

  // Définir la police et la taille du paragraphe
  doc.setFont('helvetica');
  doc.setFontSize(12);
  doc.text("Détails Personnel", 10, 20);

  const rectX1 = 5;
  const rectY1 = 55;
  const rectWidth1 = 200; // Largeur du rectangle basée sur la largeur du texte
  const rectHeight1 = 240; // Hauteur du rectangle
  doc.rect(rectX1, rectY1, rectWidth1, rectHeight1, 'S'); // Dessiner le rectangle
  doc.setFontSize(10);
  doc.setFont('times', 'italic');
  doc.text(`Nom : ${nom}`, 10, 30);
  doc.text(`Date : ${daten}`, 10, 40);
  doc.text(`Reference : ${reference}`, 70, 30);
  doc.text(`Date de la demande : ${dated}`, 70, 40);
  doc.text(`Numéro d'accès/de laboratoire : ${numa}`, 140, 30);

  const selectedOption = genreSelect.value;

  doc.text(`Genre : ${selectedOption}`, 140, 40);

  doc.setFont('helvetica');
  doc.setFontSize(12);
  doc.text("Détails Medical", 10, 50);

  doc.setFontSize(10);
  doc.setFont('times', 'italic');
  
  // Récupérer les valeurs des champs de chaque input-field
  const fields1Checkboxes = form.querySelectorAll(".input-field1 input[type='checkbox']:checked");
  const latSelect = form.querySelector(".fields1 select");
  const structRadios = form.querySelectorAll(".fields1 input[name='options11']:checked");
  const assocRadios = form.querySelectorAll(".fields1 input[name='options22']:checked");
  const siteCheckboxes = form.querySelectorAll(".input-field2 input[type='checkbox']:checked");
  const nodulesRadios = form.querySelectorAll(".input-field3 input[name='options33']:checked");
  const plevreTextarea = form.querySelector(".fields1 textarea#AM");
  const atelectasieRadios = form.querySelectorAll(".fields1 input[name='options44']:checked");
  const dimTextarea = form.querySelector(".fields1 textarea#m");
  const broncheRadios = form.querySelectorAll(".fields1 input[name='options55']:checked");
  const careneRadios = form.querySelectorAll(".fields1 input[name='options66']:checked");
  const tumorTypeRadios = form.querySelectorAll(".fields1 input[name='tumorType']:checked");
  const tumorSubTypeRadios = form.querySelectorAll(".fields1 input[name='subTumorType']:checked");
  const distanceTextarea = form.querySelector(".fields1 textarea#w");
  const gradeRadios = form.querySelectorAll(".fields1 input[name='options88']:checked");
  const reponseRadios = form.querySelectorAll(".fields1 input[name='options99']:checked");
  // Ajouter les valeurs au document PDF
  const selectedCheckboxes = [];
  fields1Checkboxes.forEach(checkbox => {
    selectedCheckboxes.push(checkbox.value);
  });
  var l = selectedCheckboxes.length * 10;
  doc.text(`PROTOCOLE OPÉRATOIRE  :`, 10, 60);
  selectedCheckboxes.forEach((checkbox, index) => {
    doc.text(`${checkbox}`, 60, 60 + (index * 10));
    
    
    if (checkbox == 'Autre, spécifier') {
      const poTextarea = form.querySelector(".input-field1 textarea#a");
      doc.text(`:  ${poTextarea.value}`, 90, 60 + (index * 10) );
    }
  });

  doc.text("LATÉRALITÉ DU SPÉCIMEN  :", 120, 70);
  doc.text(latSelect.value, 170, 70 );
  
  if (l){
    l = l - 10;
  }
  doc.text("STRUCTURES ANATOMIQUES INCLUSES  :", 10, 70 + l);
  structRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 90, 70 + (index * 10) + l);
    if (radio.value == 'Soumises') {
      const paTextarea = form.querySelector(".fields1 textarea#b");
      doc.text(`:  ${paTextarea.value}`, 110, 70 + (index * 10) + l);

    }
  });

  doc.text("SPÉCIMENS ASSOCIÉS  :", 100, 60);
  assocRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 150, 60 + (index * 10));
    if (radio.value == 'Autre, spécifier') {
      const psTextarea = form.querySelector(".fields1 textarea#c");
      doc.text(`${psTextarea.value}`, 180, 60 + (index * 10));
  
    }
  });
  const selectedCheckboxes2 = [];
  siteCheckboxes.forEach(checkbox => {
    selectedCheckboxes2.push(checkbox.value);
  });
  var l1 = l + (selectedCheckboxes2.length * 10);
  if (l1){
    l1 = l1 - 10;
  }
  doc.text("SITE TUMORAL  :", 10, 80 + l);
  selectedCheckboxes2.forEach((checkbox, index) => {
    doc.text(`${checkbox}`, 40, 80 + (index * 10) + l);
     
    if (checkbox === 'Bronche, spécifier le site') {
      const ptTextarea = form.querySelector(".fields1 textarea#d");
      doc.text(`${ptTextarea.value}`, 90, 80 + (index * 10) + l);
  
    }
  });
   
  doc.text("NODULES TUMORAUX DISTINCTS  :", 10, 90 + l1);
  const prCheckboxes = form.querySelectorAll(".input-field3 input[type='checkbox']:checked");
  const selectedCheckboxes3 = [];
  prCheckboxes.forEach(checkbox => {
    selectedCheckboxes3.push(checkbox.value);
  });
  var l2 = l1 + (selectedCheckboxes3.length * 10);
  nodulesRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 70, 90 + (index * 10)+ l1);
    if (radio.value == 'Présents'){
      
      doc.text("site  :", 90, 90 + l1);
       
      selectedCheckboxes3.forEach((checkbox, index) => {
        doc.text(`${checkbox}`, 130, 90 + (index * 10) + l1);
      });
      
      doc.text("nombre de tumeurs  :", 90, 90 + l2 );
      const pnTextarea = form.querySelector(".fields1 textarea#n");
      doc.text(`${pnTextarea.value}`, 130, 90 + (index * 10) + l2);

    }
  });
  
  doc.text("ASPECT MACROSCOPIQUE DE LA PLÈVRE RECOUVRANT UNE TUMEUR LA PLÈVRE", 10, 100 + l2);
  doc.text(`RECOUVRANT UNE TUMEUR  : ${plevreTextarea.value}`, 10, 110 + l2);

  doc.text("ATÉLECTASIE/PNEUMOPATHIE OBSTRUCTIVE S'ÉTENDANT JUSQU'À LA RÉGION DU HILE  :", 10, 120 + l2);
  atelectasieRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 170, 120 + (index * 10) + l2);
  });
  
  doc.text("DIMENSION MAXIMALE DE LA TUMEUR  :", 10, 130 + l2);
  doc.text(dimTextarea.value, 80, 130 + l2);

  doc.text("ATTEINTE DE LA BRONCHE SOUCHE  :", 10, 140 + l2);
  broncheRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 80, 140 + (index * 10) + l2);
  });

  doc.text("ATTEINTE DE LA CARÈNE TRACHÉALE  :", 10, 150 + l2);
  careneRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 80, 150 + (index * 10) + l2);
  });

  doc.text("TYPE HISTOLOGIQUE DE LA TUMEUR  :", 10, 160 + l2);
  tumorTypeRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 80, 160 + (index * 10) + l2);
    if(radio.value == "Carcinome épidermoïde" || radio.value =="Carcinoïde" || radio.value == "Adénocarcinome in situ" || radio.value == "Adénocarcinome minimalement invasif" || radio.value == "Adénocarcinome invasif"){
      l2 = l2 + 10;
      doc.text("Sous-type de la tumeur  :", 30, 160 + l2);
      tumorSubTypeRadios.forEach((radio, index) => {
      doc.text(`${radio.value}`, 90, 160 + (index * 10) + l2);
      });
    }else if(radio.value == "Autre, spécifier"){
      const THTextarea = form.querySelector(".fields1 textarea#tre");
      doc.text(`${THTextarea.value}`, 90, 80 + (index * 10) + l);

    }
  });

  doc.text("DISTANCE DE LA TUMEUR À LA MARGE DE RÉSECTION LA PLUS PROCHEANCE  :", 10, 170 + l2);
  doc.text(` ${distanceTextarea.value}`, 160, 170 + l2);

  // add page
  /*doc.addPage();
  const rectX2 = 5;
  const rectY2 = 5;
  const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
  const rectHeight2 = 290; // Hauteur du rectangle
  doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
  
  l2 = -160;doc.internal.pageSize.height*/
  if (isPageFull(180 + l2)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l2 = -160;
  }
  doc.text("GRADE HISTOLOGIQUE  :", 10, 180 + l2);
  gradeRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 70, 180 + (index * 10) + l2);
  });
  if (isPageFull(190 + l2)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l2 = -170;
  }
  doc.text("RÉPONSE AU TRAITEMENT NÉO-ADJUVANT  :", 10, 190 + l2);
  reponseRadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 90, 190 + (index * 10) + l2);
  });
  // Récupération des entrées de la section "INVASION DIRECTE DES STRUCTURES ADJACENTES"
  
  const invasionDirecteCheckboxes = form.querySelectorAll(".input-field4 input[name^='options']:checked");
  
  const cAdjacentes = [];

  invasionDirecteCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      cAdjacentes.push(checkbox.value);
    }
  });
  // Récupération de l'entrée de la section "INVASION LYMPHOVASCULAIRE"
  const invasionLymphovasculaireRadio = form.querySelectorAll(".input-field1 input[name='options222']:checked");
  let invasionLymphovasculaire = "";

  invasionLymphovasculaireRadio.forEach(radio => {
    invasionLymphovasculaire = radio.value;
  });

  // Récupération des entrées de la section "INVASION DE LA PLÈVRE VISCÉRALE"
  const invasionPlevreRadio = form.querySelectorAll(".input-field5 input[name='options33r']:checked");
  let invasionPlevre = "";

  invasionPlevreRadio.forEach(radio => {
    invasionPlevre = radio.value;
  });

  // Vérification de l'affichage de la section "Étendue de l'atteinte pleurale"
  const optionsrDiv = document.getElementById("optionsr");
  let etendueAtteintePleurale = [];

  if (optionsrDiv.style.display !== "none") {
    const etenduePleuraleCheckboxes = optionsrDiv.querySelectorAll("input[type='checkbox']:checked");
    
    etenduePleuraleCheckboxes.forEach(checkbox => {
      etendueAtteintePleurale.push(checkbox.value);
    });
  }

  // Récupération de l'entrée de la section "INVASION PÉRINEURALE"
  const invasionPerineuraleRadio = form.querySelectorAll(".input-field1 input[name='options333']:checked");
  let invasionPerineurale = "";

  invasionPerineuraleRadio.forEach(radio => {
    invasionPerineurale = radio.value;
  });
  if (isPageFull(200 + l2)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l2 = -180;
  }
  // Affichage des valeurs récupérées dans le PDF
  doc.text("INVASION DIRECTE DES STRUCTURES ADJACENTES  :", 10, 200 + l2);
  
  cAdjacentes.forEach((structure, index) => {
    doc.text(`${structure}`, 110, 200 + (index * 10) + l2);
  });
  var l3 = l2 + cAdjacentes.length * 10;
  /*if(l3){
    l3 = l3 - 10;
  }*/
  if (isPageFull(210 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -190;
  }
  doc.text("INVASION LYMPHOVASCULAIRE  :", 10, 210 + l3);
  doc.text(invasionLymphovasculaire, 80, 210 + l3);
  if (isPageFull(220 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -200;
  }
  doc.text("INVASION DE LA PLÈVRE VISCÉRALE  :", 10, 220 + l3);
  doc.text(invasionPlevre, 90, 220 + l3);
  if(invasionPlevre === 'Présente'){
    doc.text("Étendue de l'atteinte pleurale  :", 90, 230 + l3);
    etendueAtteintePleurale.forEach((etendue, index) => {
      doc.text(`${etendue}`, 150, 230 + (index * 10) + l3);
    });
  } else {
    l3 = l3 - 10;
  }

  if (isPageFull(240 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -220;
  }
  doc.text("INVASION PÉRINEURALE  :", 10, 240 + l3);
  doc.text(invasionPerineurale, 70, 240 + l3);
 
  const autresTextarea = form.querySelector(".fields1 textarea#AP");
  if (isPageFull(250 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -230;
  }
  // Ajoutez ici le reste des champs à afficher dans le PDF
  doc.text("AUTRES PROCESSUS NÉOPLASIQUES  :", 10, 250 + l3);
  doc.text(` ${autresTextarea.value}`, 80, 250 + l3);
  const MALADIETextarea = form.querySelector(".fields1 textarea#MP");
  if (isPageFull(260 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -240;
  }
  doc.text("MALADIE PULMONAIRE NON NÉOPLASIQUE  :", 10, 260 + l3);
  doc.text(` ${MALADIETextarea.value}`, 90, 260 + l3);
  
  
  const margeBronchiqueRadios = form.querySelectorAll(".input-field1 input[name='options444']:checked");
  let margeBronchique = "";

  margeBronchiqueRadios.forEach(radio => {
    margeBronchique = radio.value;
  });

  const margeVasculaireRadios = form.querySelectorAll(".input-field1 input[name='options555']:checked");
  let margeVasculaire = "";

  margeVasculaireRadios.forEach(radio => {
    margeVasculaire = radio.value;
  });

  const marge1Radios = form.querySelectorAll(".input-field1 input[name='options666']:checked");
  let marge1 = "";

  marge1Radios.forEach(radio => {
    marge1 = radio.value;
  });
  const marge2Radios = form.querySelectorAll(".input-field1 input[name='options777']:checked");
  let marge2 = "";

  marge2Radios.forEach(radio => {
    marge2 = radio.value;
  });
  if (isPageFull(270 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -250;
  }
  doc.text("ÉTAT DES MARGES CHIRURGICALES  :", 10, 270 + l3);
  doc.text("Marge bronchique  :", 20, 280 + l3);
  doc.text(margeBronchique, 90, 280 + l3);

  doc.text("Marge vasculaire  :", 20, 290 + l3);
  doc.text(margeVasculaire, 90, 290 + l3);
  if (isPageFull(300 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -280;
  }
  doc.text("Autre Marge 1  :", 20, 300 + l3);
  const AM1Textarea = form.querySelector(".fields1 textarea#AM1");
  doc.text(` ${AM1Textarea.value}`, 90, 300 + l3);
  doc.text(marge1, 120, 300 + l3);

  doc.text("Autre Marge 2  :", 20, 310 + l3);
  const AM2Textarea = form.querySelector(".fields1 textarea#AM2");
  doc.text(` ${AM2Textarea.value}`, 90, 310 + l3);
  doc.text(marge2, 120, 310 + l3);

  const STATURadios = form.querySelectorAll(".input-field1 input[name='options33rr']:checked");
  /*const SSTATURadios = form.querySelectorAll(".input-field1 input[name='option1drr']:checked");
  let SSTATU = "";

  SSTATURadios.forEach(radio => {
    SSTATU = radio.value;
  });*/
  const S1STATURadios = form.querySelectorAll(".input-field1 input[name='options1drr']:checked");
  let S1STATU = "";

  S1STATURadios.forEach(radio => {
    S1STATU = radio.value;
  });
  const S2STATURadios = form.querySelectorAll(".input-field1 input[name='options2drr']:checked");
  let S2STATU = "";

  S2STATURadios.forEach(radio => {
    S2STATU = radio.value;
  });
  const S3STATURadios = form.querySelectorAll(".input-field1 input[name='options3drr']:checked");
  let S3STATU = "";

  S3STATURadios.forEach(radio => {
    S3STATU = radio.value;
  });
  const S1Textarea = form.querySelector(".fields1 textarea#AP1");
  const S1ATextarea = form.querySelector(".fields1 textarea#AP2");
  const S1NTextarea = form.querySelector(".fields1 textarea#AP3");
  const S2Textarea = form.querySelector(".fields1 textarea#AP4");
  const S2ATextarea = form.querySelector(".fields1 textarea#AP5");
  const S2NTextarea = form.querySelector(".fields1 textarea#AP6");
  const S3Textarea = form.querySelector(".fields1 textarea#AP7");
  const S3ATextarea = form.querySelector(".fields1 textarea#AP8");
  const S3NTextarea = form.querySelector(".fields1 textarea#AP9");
  if (isPageFull(320 + l3)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l3 = -300;
  }
  doc.text("STATUT GANGLIONNAIRE  :", 10, 320 + l3);
  var l4 = 0;
  STATURadios.forEach((radio, index) => {
    doc.text(`${radio.value}`, 70, 320 + l3);
    /*doc.text(`${radio.value}`, 70, 90 + (index * 10)+ l1);*/
    
    if (radio.value == 'Atteinte'){
      if(S1STATU == "Ne peut être déterminé" && S2STATU == "Ne peut être déterminé" && S3STATU == "Ne peut être déterminé" ){
        doc.text("Site 1 atteint:", 10, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 30, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 100, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 140, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 180, 330 + (index * 10) + l3);
        doc.text(`${S1STATU}`, 10, 340 + (index * 10) + l3);
        doc.text(`${S2STATU}`, 80, 340 + (index * 10) + l3);
        doc.text(`${S3STATU}`, 140, 340 + (index * 10) + l3);
        
        l4 = 20;
      }else if(S2STATU == "Ne peut être déterminé" && S3STATU == "Ne peut être déterminé" ){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

        doc.text(`${S1ATextarea.value}`, 90, 340 + (index * 10) + l3);
        doc.text(`${S1NTextarea.value}`, 90, 350 + (index * 10) + l3);
        
        doc.text(`${S2STATU}`, 120, 340 + (index * 10) + l3);
        doc.text(`${S3STATU}`, 170, 340 + (index * 10) + l3);
        l4 = 30;
      }else if(S1STATU == "Ne peut être déterminé" && S2STATU == "Ne peut être déterminé" ){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

        doc.text(`${S1STATU}`, 80, 340 + (index * 10) + l3);
        doc.text(`${S2STATU}`, 120, 340 + (index * 10) + l3);
      
        doc.text(`${S3ATextarea.value}`, 170, 340 + (index * 10) + l3);
        doc.text(`${S3NTextarea.value}`, 170, 350 + (index * 10) + l3);
        l4 = 30;
      }else if(S1STATU == "Ne peut être déterminé" && S3STATU == "Ne peut être déterminé" ){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

       
        doc.text(`${S2ATextarea.value}`, 120, 340 + (index * 10) + l3);
        doc.text(`${S2NTextarea.value}`, 120, 350 + (index * 10) + l3);
      
        doc.text(`${S1STATU}`,80 , 340 + (index * 10) + l3);
        doc.text(`${S3STATU}`, 170, 340 + (index * 10) + l3);
        l4 = 30;
      }else if(S1STATU == "Ne peut être déterminé"){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

        doc.text(`${S1STATU}`,80 , 340 + (index * 10) + l3);   

        doc.text(`${S2ATextarea.value}`, 120, 340 + (index * 10) + l3);
        doc.text(`${S2NTextarea.value}`, 120, 350 + (index * 10) + l3);
        
        doc.text(`${S3ATextarea.value}`, 170, 340 + (index * 10) + l3);
        doc.text(`${S3NTextarea.value}`, 170, 350 + (index * 10) + l3);
        l4 = 30;
      }else if(S2STATU == "Ne peut être déterminé" ){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

        doc.text(`${S2STATU}`,120 , 340 + (index * 10) + l3);   

        doc.text(`${S1ATextarea.value}`, 80, 340 + (index * 10) + l3);
        doc.text(`${S1NTextarea.value}`, 80, 350 + (index * 10) + l3);
        
        doc.text(`${S3ATextarea.value}`, 170, 340 + (index * 10) + l3);
        doc.text(`${S3NTextarea.value}`, 170, 350 + (index * 10) + l3);
        l4 = 30;
      }else if(S3STATU == "Ne peut être déterminé"){
        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);
        
        doc.text(`${S2ATextarea.value}`, 120, 340 + (index * 10) + l3);
        doc.text(`${S2NTextarea.value}`, 120, 350 + (index * 10) + l3);

        doc.text(`${S1ATextarea.value}`, 80, 340 + (index * 10) + l3);
        doc.text(`${S1NTextarea.value}`, 80, 350 + (index * 10) + l3);
      
        
        doc.text(`${S3STATU}`, 170, 340 + (index * 10) + l3);
        l4 = 30;

      }else /*if(S1STATU != "Ne peut être déterminé" && S2STATU != "Ne peut être déterminé" && S3STATU != "Ne peut être déterminé" )*/{
        doc.text(`Nombre de ganglions lymphatiques atteints:`, 10, 340 + (index * 10) + l3);
        doc.text(`Nombre de ganglions lymphatiques:`, 10, 350 + (index * 10) + l3);

        doc.text("Site 1 atteint:", 80, 330 + (index * 10) + l3);
        doc.text(`${S1Textarea.value}`, 105, 330 + (index * 10) + l3);
        doc.text("Site 2 atteint:", 120, 330 + (index * 10) + l3);
        doc.text(`${S2Textarea.value}`, 145, 330 + (index * 10) + l3);
        doc.text("Site 3 atteint:", 160, 330 + (index * 10) + l3);
        doc.text(`${S3Textarea.value}`, 185, 330 + (index * 10) + l3);

        doc.text(`${S1ATextarea.value}`, 80, 340 + (index * 10) + l3);
        doc.text(`${S1NTextarea.value}`, 80, 350 + (index * 10) + l3);

        doc.text(`${S2ATextarea.value}`, 120, 340 + (index * 10) + l3);
        doc.text(`${S2NTextarea.value}`, 120, 350 + (index * 10) + l3);
        
        doc.text(`${S3ATextarea.value}`, 160, 340 + (index * 10) + l3);
        doc.text(`${S3NTextarea.value}`, 160, 350 + (index * 10) + l3);
        l4 = 30;
      }
      
    }
  });
  l4 = l3 + l4
  
  doc.setFont('helvetica');
  doc.setFontSize(12);
  doc.text("Études Connexes", 10, 330 + l4);

  doc.setFontSize(10);
  doc.setFont('times', 'italic');
  if (isPageFull(340 + l4)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l4 = -320;
  }
  doc.text("MARQUEURS IMMUNOHISTOCHIMIQUES  :", 20, 340 + l4);
  // Récupérer les valeurs des champs
  const Anticorpsp = document.getElementById('ANP').value;
  const Anticorpse = document.getElementById('ANE').value;
  const Anticorpsn = document.getElementById('ANN').value;
  const clc = document.getElementById('CLC').value;

  if (isPageFull(350 + l4)) {
    doc.addPage();
    const rectX2 = 5;
    const rectY2 = 5;
    const rectWidth2 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight2 = 290; // Hauteur du rectangle
    doc.rect(rectX2, rectY2, rectWidth2, rectHeight2, 'S'); // Dessiner le rectangle
    l4 = -330;
  }
  // Ajouter les valeurs au document PDF
  doc.text(`Anticorps positifs  : ${Anticorpsp}`, 30, 350 + l4);
  doc.text(`Anticorps équivoques  : ${Anticorpse}`, 30, 360 + l4);
  doc.text(`Anticorps négatifs  : ${Anticorpsn}`, 120, 350 + l4);
  doc.text(`Conclusions: ${clc}`, 120, 360 + l4);
  const ASTextarea = form.querySelector(".div3 textarea#ADM");

  const radioEGFR = form.querySelectorAll(".input-field1 input[name='options33rrr']:checked");
  let rEGFR = "";

  radioEGFR.forEach(radio => {
    rEGFR = radio.value;
  });
  const radioEML4 = form.querySelectorAll(".input-field1 input[name='options33rrrr']:checked");
  let rEML4 = "";

  radioEML4.forEach(radio => {
    rEML4 = radio.value;
  });
  const DTextarea = form.querySelector(".div1 textarea#D");
  const DDTextarea = form.querySelector(".div2 textarea#DD");
  // add page
  if (isPageFull(370 + l4)) {
    doc.addPage();
    const rectX3 = 5;
    const rectY3 = 5;
    const rectWidth3 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight3 = 290; // Hauteur du rectangle
    doc.rect(rectX3, rectY3, rectWidth3, rectHeight3, 'S'); // Dessiner le rectangle
    l4 = -350;
  }
  
  doc.text("DONNÉES MOLÉCULAIRES", 10, 370 + l4);
  doc.text("Autre, spécifier :", 140, 380 + l4)
  doc.text(`${ASTextarea.value}`, 140, 390 + l4);
  doc.text("Résultat EGFR :", 20, 380 + l4);
  doc.text(`${rEGFR}`, 20, 390  + l4); 
  
  doc.text("Résultat EML4-ALK :", 70, 380 + l4)
  doc.text(`${rEML4}`, 70, 390 + l4)
  if(rEGFR === "Mutation Présente" || rEML4 === 'Réarrangement présent'){
    l4 = l4 + 10;
  
    if(rEGFR === "Mutation Présente"){
      doc.text(`${DTextarea.value}`, 20, 390 + l4);
      
    }
    if(rEML4 === 'Réarrangement présent'){
      doc.text(`${DDTextarea.value}`, 70, 390 + l4);
      
    }
  }

  const SPCheckboxes = form.querySelectorAll(".input-field6 input[type='checkbox']:checked");
  const selectedSPCheckboxes = [];
  SPCheckboxes.forEach(checkbox => {
    selectedSPCheckboxes.push(checkbox.value);
  });
  /*var l5 = l4 + (selectedSPCheckboxes.length * 10);*/
  
  const radioT = form.querySelectorAll(".input-field1 input[name='optionsT']:checked");
  let RT = "";

  radioT.forEach(radio => {
    RT = radio.value;
  });
  const radioN = form.querySelectorAll(".input-field1 input[name='optionsN']:checked");
  let RN = "";

  radioN.forEach(radio => {
    RN = radio.value;
  });
  const radioM = form.querySelectorAll(".input-field1 input[name='optionsM']:checked");
  let RM = "";

  radioM.forEach(radio => {
    RM = radio.value;
  });
  if (isPageFull(400 + l4)) {
    doc.addPage();
    const rectX3 = 5;
    const rectY3 = 5;
    const rectWidth3 = 200; // Largeur du rectangle basée sur la largeur du texte
    const rectHeight3 = 290; // Hauteur du rectangle
    doc.rect(rectX3, rectY3, rectWidth3, rectHeight3, 'S'); // Dessiner le rectangle
    l4 = -380;
  }
  doc.text("STADE PATHOLOGIQUE (TNM, 8e édition)  :", 10, 400 + l4);
  selectedSPCheckboxes.forEach((checkbox, index) => {
    doc.text(`${checkbox}`, 90 + (index * 10), 400 + l4);
  });
  var l5 = l4;
  doc.text("T - tumeur primitive:", 10, 410 + l5);
  doc.text(`${RT}`, 45, 410  + l5); 
  
  doc.text("N - Ganglions lymphatiques régionaux:", 55, 410 + l5)
  doc.text(`${RN}`, 120, 410 + l5)
  
  doc.text("M - Métastase(s) à distance:", 130, 410 + l5)
  doc.text(`${RM}`, 180, 410 + l5);


  doc.save("filename.pdf");
});







