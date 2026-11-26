# Ringside Owner

A wrestling promotion booking sim that runs in your browser. Sign talent, book cards, build feuds, and try to keep your promotion alive.

**Play it:** open `index.html` in a browser, or use the GitHub Pages link for this repo.

## Building from source

The game is a single HTML file. To rebuild it after editing:

```
python3 source/build.py
```

This injects `source/data.json` into `source/src.html` and writes `index.html`.

The `tests/` folder holds Playwright smoke tests used during development.
