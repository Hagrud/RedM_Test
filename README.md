# Récapitulatif du projet et de l'organisation:

Je fait ce fichier pour décrir la structure de mon code et expliquer comment j'ai travaillé


# Structure du code

``` 
[hagrud_test] -|
               |- hagrud_chat : example de script trouvé sur youtube que j'ai gardé pour afficher les info coté client
               |                sert aussi de fichier temporaire pour tester des fonctions
               |
               |- hagrud_debugger : permet d'afficher des info au client ( je l'avais fait au début je l'utilise que pour les commandes teleport)
               |
               |- hagrud_utility -|
               |                  |- client/commandes.js        : commandes pour faire spawn des objets 
               |                  |- client/detection.js        : fonctions pour détecter des Ped/Objets en face du joueur
               |                  |- client/hud.js              : fonction pour afficher un texte à l'écran (depuis une position 3D)
               |                  |- client/entity_animation.js : fonction pour lancer un scénario sur un Ped
               |                  |- client/entity_spawn.js     : fonctions pour faire spawn des objets/peds
               |
               |- hagrud_teleport : fichiers pour gérer la téléporation coté client et serveur
               |
               |- hagrud_trader : fichier pour faire apparaitre un "trader" dans un saloon de saint-denis
```


Pour que la teleportation fonctionne, il faut une base de données avec un table "tp_locations" ( nom : CHAR(100), px : INT, py : INT, pz : INT ) et que la configuration du soit correcte (ligne 16 de server.cfg)



# Explication de ce qu'on voit dans la vidéo et des commandes :
	
Commande :

	/hg:save_place nom  : sauvegarde la position dans la base de donnée 
	/hg:teleport nom    : teleporte le joueur sur un position sauvegardé dans la base de donnée
			 
			 
	/hg:teleport tmp    : teleporte le joueur au saloon de saint denis (parce que c'est dans la base de donnée) pos :  [2634.18, -1224.79, 53.3804] 
	/hg:create_trader   : fait spawn un ped immobile dans le saloon, avec 3 objets sur le comptoir
			 
	/hg:ask             : cherche si le joueur regarde le trader (si oui on va afficher le nom des objets sur le comptoir temps que le joueur est a moins de 10 metres du trader)
					On trace une ligne bleu pendant 5 secondes pour visualiser le rayon qui a essayé de detecter le trader (pour le debug)
	
	
# Organisation :
 
23/01 : lancement téléchargement rdr2, redM \
24/01 : code du module téléportation (uniquement coté serveur) \
25/01 : fin du téléchargement de Rdr2 -_-' \
26/01 : config d'un serveur redM qui marche \
27/01 : debug de la téléportation + spawn objets/peds + début du code trader \
28/01 : day off \
29/01 : day off \
30/01 : nettoyage du code, fin du module trader + rédaction du README
			   
# Documentations :
Configurer un serveur : 

	https://forum.cfx.re/ (dans les tuto)
	https://docs.fivem.net/docs/server-manual/setting-up-a-server/
	https://gta5.cool/comment-installer-fivem-mysql-async/   (mysql-async)
	https://wiki.kanersps.pw/display/REDM/RedEM%3A+Roleplay  (mysql-async)
	https://github.com/amakuu/mysql-async-temporary          (mysql-async)
							
							
Faire un mod basique :

	https://www.youtube.com/watch?v=2NgV0kVdDkE (cette chaine)
	
Liste des peds/objets/... : 

	https://www.mod-rdr.com/wiki/pages/
	
Liste des natives :

	https://vespura.com/doc/natives/
	https://runtime.fivem.net/doc/natives/ (ça peut toujours etre utile)
	http://www.kronzky.info/fivemwiki/ (<3 : explique comment utiliser pas mal de natives fiveM)
	discord CFX.re Project Hub
						
						
Javascript : 

	https://developer.mozilla.org/fr/docs/Web/JavaScript
        https://stackoverflow.com/
				 
 # Outils : 
 	Notepad++, mysql
