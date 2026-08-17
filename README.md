# Portfolio — Mohammad Nur Irfan Mohammad Nadzri Hisham

Personal portfolio site built with plain HTML, CSS, and JavaScript. Live version hosted on GitHub Pages.

## Structure

```
portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```

## Running locally

Just open `index.html` in a browser, or serve it locally:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Create a new repository on GitHub named `portfolio` (or any name you like).
2. From this folder, initialize git and push:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/irfannadzri/portfolio.git
   git push -u origin main
   ```

3. On GitHub, go to the repo → **Settings** → **Pages**.
4. Under **Source**, select branch `main` and folder `/ (root)`, then **Save**.
5. After a minute, your site will be live at:

   ```
   https://irfannadzri.github.io/portfolio/
   ```

That link is what you share with employers.
