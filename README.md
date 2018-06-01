# Table of Contents
- [Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
    - [Database](#database)
    - [PHP](#php)
    - [Webpack](#webpack)
  - [Environmnent](#environment)
  - [Publishing](#publishing)
- [API](#api)
  - [Headers](#headers)
  - [Data Types](#data-types)
  - [/get_streams](#get_streams)
  - [/getreleases](#getreleases)

# Setup
## Requirements
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)
- [PHP](https://secure.php.net/downloads.php)
- [MariaDB](https://downloads.mariadb.org/)

## Installation
### Database
1. Open HeidiSQL
2. Create a new session
3. File -> Load SQL File
4. Select /onepace/db/db.sql
5. Run (F5)
6. Refresh the view to see onepace database
7. Click on the users icon
8. Add a new user with username onepace_site and password 12345

### PHP
1. Put extracted PHP contents under C:\
2. Remove `php.ini-production`
3. Rename `php.ini-development` to `php.ini`
4. Find `;   extension=mysqli`
5. Remove the semi-colon and save

### Webpack
1. Open cmd.exe
2. Type `npm i -g webpack@3.3.0`

## Environment
1. Open Visual Studio Code
2. Press File -> Open Folder and select this directory (onepace)
3. Open up the integrated terminal (View -> Integrated Terminal)
4. Type `cd react && npm i`
5. When the installation is done, type `cd .. && start.bat`

## Publishing
In the integrated terminal, type `publish.bat` (You must have FTP access and installed [WebPublisher](https://github.com/sewil/web-publisher) (Windows only) to perform this action)

# API
## Headers
- Content-Type: application/json
- Accept: application/json
- Charset: utf-8
## Data Types
- i: sint32
- b: bool
- s: string
- ut: unix-time
- .*\?$: nullable
## /get_streams
```
{
    "arcs":
    [
      {
        "id": i,
        "title": s,
        "chapters": s,
        "resolution": s,
        "released": b,
        "magnet": s,
        "torrent": s
      }
    ],
    "episodes":
    [
      {
        "id": i,
        "crc32": s,
        "resolution": s,
        "title": s,
        "chapters": s,
        "episodes": s,
        "status": s,
        "part": i?,
        "arcId": i?,
        "magnet": s
      }
    ]
}
```
## /getreleases
```
{
    "releases":
    [
      {
        "crc32": s,
        "name": s,
        "magnet": s,
        "torrent": s,
        "createddate": ut?,
        "ageDays": i
      }
    ]
}
```
