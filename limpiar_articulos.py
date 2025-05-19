# -*- coding: utf-8 -*-

import os
import re

def extraer_contenido_util(html):
    # Busca contenido entre <main> o <article>
    patrones = [
        re.compile(r"<main[^>]*>(.*?)</main>", re.DOTALL | re.IGNORECASE),
        re.compile(r"<article[^>]*>(.*?)</article>", re.DOTALL | re.IGNORECASE)
    ]

    for patron in patrones:
        match = patron.search(html)
        if match:
            return match.group(1).strip()

    # Si no encuentra <main> ni <article>, regresa todo tal cual
    return html.strip()

carpeta = "articles"

for nombre_archivo in os.listdir(carpeta):
    if nombre_archivo.endswith(".html"):
        ruta = os.path.join(carpeta, nombre_archivo)
        with open(ruta, "r", encoding="utf-8") as f:
            contenido = f.read()

        contenido_util = extraer_contenido_util(contenido)

        with open(ruta, "w", encoding="utf-8") as f:
            f.write(contenido_util)

        print(f"{nombre_archivo} limpiado correctamente.")

print("✅ Todos los artículos han sido limpiados.")