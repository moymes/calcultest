var articleCount = 1;

function ajouterArticle() {
  articleCount++;

  var nouvelArticle = document.createElement('div');
  nouvelArticle.className = "article";

  var innerHTML = `
    <div class="input-group">
      <label for="prix_article_${articleCount}">Prix de l'article ${articleCount} :</label>
      <input type="number" id="prix_article_${articleCount}" min="0" style="flex: 3;">
      <label for="rabais_${articleCount}" style="flex: 1;">% rabais :</label>
      <input type="number" id="rabais_${articleCount}" min="0" placeholder="" style="flex: 1;">
    </div>
  `;

  nouvelArticle.innerHTML = innerHTML;

  var articlesContainer = document.getElementById('articlesContainer');
  articlesContainer.appendChild(nouvelArticle);
}

function calculer_prix_garantie(sous_total, nombre_articles) {
  if (nombre_articles === 1) {
    if (0 <= sous_total && sous_total <= 499.99) {
      return 141.99;
    } else if (500 <= sous_total && sous_total <= 749.99) {
      return 184.99;
    } else if (750 <= sous_total && sous_total <= 999.99) {
      return 206.99;
    } else if (1000 <= sous_total && sous_total <= 1249.99) {
      return 249.99;
    } else if (1250 <= sous_total && sous_total <= 1499.99) {
      return 260.99;
    } else if (1500 <= sous_total && sous_total <= 1999.99) {
      return 315.99;
    } else if (2000 <= sous_total && sous_total <= 2499.99) {
      return 347.99;
    } else if (2500 <= sous_total && sous_total <= 3499.99) {
      return 402.99;
    } else if (3500 <= sous_total && sous_total <= 4999.99) {
      return 412.99;
    } else if (5000 <= sous_total && sous_total <= 7499.99) {
      return 565.99;
    } else if (7500 <= sous_total && sous_total <= 9999.99) {
      return 847.99;
    } else if (10000 <= sous_total && sous_total <= 12499.99) {
      return 869.99;
    } else if (12500 <= sous_total && sous_total <= 17499.99) {
      return 1305;
    } else if (17500 <= sous_total && sous_total <= 25000.99) {
      return 1848;
    }
  } else if (nombre_articles === 2) {
    if (400 <= sous_total && sous_total <= 999.99) {
      return 239.99;
    } else if (1000 <= sous_total && sous_total <= 1249.99) {
      return 304.99;
    } else if (1250 <= sous_total && sous_total <= 1499.99) {
      return 326.99;
    } else if (1500 <= sous_total && sous_total <= 1749.99) {
      return 358.99;
    } else if (1750 <= sous_total && sous_total <= 2499.99) {
      return 380.99;
    } else if (2500 <= sous_total && sous_total <= 3499.99) {
      return 489.99;
    } else if (3500 <= sous_total && sous_total <= 4999.99) {
      return 575.99;
    } else if (5000 <= sous_total && sous_total <= 7499.99) {
      return 706.99;
    } else if (7500 <= sous_total && sous_total <= 9999.99) {
      return 978.99;
    } else if (10000 <= sous_total && sous_total <= 19000) {
      return 1630.99;
    } else if (20000 <= sous_total && sous_total <= 34999.99) {
      return 2716.99;
    } else if (35000 <= sous_total && sous_total <= 50000) {
      return 3912.99;
    }
  } else if (nombre_articles >= 3) {
    if (900 <= sous_total && sous_total <= 1499.99) {
      return 402.99;
    } else if (1500 <= sous_total && sous_total <= 1999.99) {
      return 467.99;
    } else if (2000 <= sous_total && sous_total <= 2499.99) {
      return 489.99;
    } else if (2500 <= sous_total && sous_total <= 3499.99) {
      return 565.99;
    } else if (3500 <= sous_total && sous_total <= 4999.99) {
      return 652.99;
    } else if (5000 <= sous_total && sous_total <= 9999.99) {
      return 978.99;
    } else if (10000 <= sous_total && sous_total <= 14999.99) {
      return 1630.99;
    } else if (15000 <= sous_total && sous_total <= 19999.99) {
      return 2282.99;
    } else if (20000 <= sous_total && sous_total <= 24999.99) {
      return 3043.99;
    } else if (25000 <= sous_total && sous_total <= 29999.99) {
      return 3803.99;
    } else if (30000 <= sous_total && sous_total <= 34999.99) {
      return 4564.99;
    } else if (35000 <= sous_total && sous_total <= 39999.99) {
      return 5325.99;
    } else if (40000 <= sous_total && sous_total <= 44999.99) {
      return 6086.99;
    } else if (45000 <= sous_total && sous_total <= 49999.99) {
      return 6846.99;
    } else if (50000 <= sous_total && sous_total <= 74999.99) {
      return 7607.99;
    } else if (75000 <= sous_total && sous_total <= 99999.99) {
      return 12226.99;
    } else if (100000 <= sous_total && sous_total <= 124999.99) {
      return 16301.99;
    } else if (125000 <= sous_total && sous_total <= 150000) {
      return 20377.99;
    }
  }

  return 0;
}

function calculer_facture() {
    var sous_total = 0;
  
    var articles = document.getElementsByClassName('article');
    var nombre_articles = articles.length;
  
    for (var i = 0; i < nombre_articles; i++) {
      var prix_article = parseFloat(document.getElementById('prix_article_' + (i + 1)).value);
      var rabais = parseFloat(document.getElementById('rabais_' + (i + 1)).value) || 0;
      var prix_article_rabais = prix_article * (1 - (rabais / 100));
      sous_total += prix_article_rabais;
    }
  
    var prix_garantie = calculer_prix_garantie(sous_total, nombre_articles);
    sous_total += prix_garantie;
  
    var montant_livraison = parseFloat(document.getElementById('livraison').value);
  
    var taxe = sous_total * 0.15;
    var prix_total = sous_total + montant_livraison + taxe;
  
    var resultat = document.getElementById('resultat');
    resultat.innerHTML = `
      <p>Résumé de la facture :</p>
      <p>Prix de la garantie : ${prix_garantie.toFixed(2)} $</p>
      <p>Sous-total (articles + garantie) : ${sous_total.toFixed(2)} $</p>
      <p>Montant de livraison : ${montant_livraison.toFixed(2)} $</p>
      <p>Taxe : ${taxe.toFixed(2)} $</p>
      <p>Total : ${prix_total.toFixed(2)} $</p>
    `;
  }
  
  var ajouterArticleBtn = document.getElementById('ajouterArticleBtn');
  ajouterArticleBtn.addEventListener('click', ajouterArticle);
  
  var calculerBtn = document.getElementById('calculerBtn');
  calculerBtn.addEventListener('click', calculer_facture);