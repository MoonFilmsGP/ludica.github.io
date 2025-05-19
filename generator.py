# -*- coding: utf-8 -*-

import json
import os

# Cargar plantilla
with open("template.html", "r", encoding="utf-8") as f:
    template = f.read()

# Cargar index.json
with open("index.json", "r", encoding="utf-8") as f:
    articles = json.load(f)

for article in articles:
    title = article["title"]
    date = article["date"]
    path = article["path"]
    article_path = f"articles/{path}"

    # Leer contenido del artículo ya existente
    with open(article_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Armar el HTML nuevo
    final_html = template.replace("{{ title }}", title)
    final_html = final_html.replace("{{ date }}", date)
    final_html = final_html.replace("{{ content }}", content)

    # Escribir de nuevo el archivo ya decorado
    with open(article_path, "w", encoding="utf-8") as f:
        f.write(final_html)

print("Artículos decorados correctamente.")