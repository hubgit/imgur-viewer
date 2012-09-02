<?php

// No CORS header for the gallery JSON, so needs a server-side proxy

if (!preg_match('#^http://imgur\.com/gallery/.+\.json$#', $_GET['url'])) exit();

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

readfile($_GET['url']);