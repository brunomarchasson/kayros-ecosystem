// * @apiParam {String} WEB_Designation Désignation du produit
// * @apiParam {String} WEB_RefCli Référence Client de l'étiquette
// * @apiParam {Number} WEB_NbEtiq1 Quantité 1 (Nombre d'étiquettes)
// * @apiParam {Number} WEB_NbEtiq2 Quantité 2 (Nombre d'étiquettes)
// * @apiParam {Number} WEB_NbEtiq3 Quantité 3 (Nombre d'étiquettes)
// * @apiParam {String} WEB_NbRef Nombre de références
// * @apiParam {Number=(0,1,2,3)} WEB_FormEtiq Format de l'étiquette
// * @apiParam {Number} WEB_LzEtiq Largeur de l'étiquette
// * @apiParam {Number} WEB_AvEtiq Hauteur de l'étiquette
// * @apiParam {Number} WEB_Support Identifiant du support
// * @apiParam {Number=(103,106)} WEB_Procede_Impr Procédé d'impression
// * @apiParam {Number=(0,1,2,3,4)} WEB_Impression Type d'impression
// * @apiParam {Number=(801,802)} WEB_Type_Dorure Type de dorure
// * @apiParam {Number} WEB_Dorure Identifiant de la dorure
// * @apiParam {Number} WEB_Vernis Identifiant du vernis
// * @apiParam {Number} WEB_Pelliculage Identifiant du pelliculage
// * @apiParam {Boolean} WEB_Spot Spot(marque noire)
// * @apiParam {Boolean} WEB_Perfo Perforation entre étiquettes
// * @apiParam {Number} WEB_NbreEtiqFront Nombre d'étiquettes de front
// * @apiParam {String=('Bo', 'Pa')} WEB_TypeCond Type de conditionnement
// * @apiParam {Number} WEB_CondMandrin Identifiant du mandrin
// * @apiParam {Number} WEB_CondNbEtiqBob Nombre d'étiquettes par rouleau
// * @apiParam {Number} WEB_CondDiamBob Diamètre maxi des rouleaux
// * @apiParam {Number=(0,1)} WEB_CondSensDeroul Sens d'enroulement
// * @apiParam {Number=(0,1,2,3)} WEB_CondSensSortie Sens de sortie
// * @apiParam {Number} WEB_NbEtiqPar Nombre d'étiquettes par paravent
// * @apiParam {Number} WEB_NbParPaq Nombre de paravents par paquet
// * @apiParam {String} WEB_PaysLivr Code postal livraison
// * @apiParam {String} WEB_CPLivr Code pays de livraison



// * @apiSuccess {String}     id numéro de devis
// * @apiSuccess {float[]}  PrixAuMille   prix au mille pour les trois quantitées
// * @apiSuccess {Number[]}  QteFab   Quantitées réel
// * @apiSuccess {object}     Frais    Liste des frais
// * @apiSuccess {string}     Frais.Designation  Libellé du frais
// * @apiSuccess {String}     Frais.Qte quantitée
// * @apiSuccess {string}   Frais.PU Prix unitaire du frais


// * @apiErrorExample BadRequest:
// *     HTTP/1.1 400 Bad Request
// *     {
// *        "error": {
// *          "id": 2,
// *          "description": "La Quantité 1 n'est pas valide"
// *        }
// *     }
// *
// * @apiErrorExample NoAccessRight:
// *     HTTP/1.1 401 Not Authenticated
// *     {
// *       "error": "NoAccessRight"
// *     }
