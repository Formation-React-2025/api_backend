# API BACKEND pour la formation

Cette API propose la gestion d'une liste d'utilisateurs.

Un utilisateur est représenté avec les attributs suivants :

| Nom d'attribut  | Description                                    | Type        | Format JSON                   | Exemple                      |
|-----------------|------------------------------------------------|-------------|-------------------------------|------------------------------|
| `id`            | Identifiant de l'utilisateur                   | `string`    | `[A-Z]{4}[0-9]{3}`            | "AAAA000"                    |
| `createdAt`     | Date de création de l'utilisateur              | `timestamp` | `yyyy-MM-dd HH:mm:ss`         | "2025-04-23 19:28:54"        |
| `createdBy`     | Entité ayant créé l'utilisateur                | `string`    |                               | "Formation React"            |
| `modifiedAt`    | Date de dernière modification de l'utilisateur | `timestamp` | `yyyy-MM-dd HH:mm:ss`         | "2025-04-23 19:28:54"        |
| `modifiedBy`    | Dernière entité ayant modifié l'utilisateur    | `string`    |                               | "Formation React"            |
| `civilite`      | Civilité de l'utilisateur                      | `string`    | `"M"` ou  `"MLLE"` ou `"MME"` | "M"                          |
| `prenom`        | Prénom de l'utilisateur                        | `string`    |                               | "Jeffrey"                    |
| `nom`           | Nom de l'utilisateur                           | `string`    |                               | "Chapuis"                    |
| `dateNaissance` | Date de naissance de l'utilisateur             | `date`      | `yyyy-MM-dd`                  | "2001-03-04"                 |
| `email`         | E-mail de l'utilisateur                        | `string`    |                               | "jeffrey.chapuis@yahoo.com"  |

## Points d'entrés 

| Opération | Path              | Description                                                                                                          | Query Params                                                                                                       |
|-----------|-------------------|----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `GET`     | `/users`          | Récupération de l'ensemble des utilisateurs. <br/> Les utilisateurs peuvent être filtrés en fonction de query params | - `prenom`  <br/> - `nom` <br/> - `civilite` <br/> - `dateNaissanceMin` <br/> - `dateNaissanceMax` <br/> - `email` |
| `GET`     | `/users/{idUser}` | Récupération de l'utilisateur dont l'id est en path param                                                            |                                                                                                                    |
| `POST`    | `/users`          | Création d'un nouvel utilisateur                                                                                     |                                                                                                                    |
| `PATCH`   | `/users/{idUser}` | Modification de l'utilisateur dont l'id est en path param                                                            |                                                                                                                    |
| `DELETE`  | `/users/{idUser}` | Suppression de l'utilisateur dont l'id est en path param                                                             |                                                                                                                    |

La création et modification prennent en body les attributs suivants :

| Nom d'attribut   | Description                         | Type         | Format JSON                    | Exemple                      |
|------------------|-------------------------------------|--------------|--------------------------------|------------------------------|
| `civilite`       | Civilité de l'utilisateur           | `string`     | `"M"` ou  `"MLLE"` ou `"MME"`  | "M"                          |
| `prenom`         | Prénom de l'utilisateur             | `string`     |                                | "Jeffrey"                    |
| `nom`            | Nom de l'utilisateur                | `string`     |                                | "Chapuis"                    |
| `dateNaissance`  | Date de naissance de l'utilisateur  | `date`       | `yyyy-MM-dd`                   | "2001-03-04"                 |
| `email`          | E-mail de l'utilisateur             | `string`     |                                | "jeffrey.chapuis@yahoo.com"  |

