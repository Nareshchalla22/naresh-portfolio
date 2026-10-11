# Naresh Challa - Portfolio

React + Vite portfolio. No other libraries, no CSS framework needed.

## Run it

```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # production files go to /dist
```

## Edit your content

Open `src/Portfolio.jsx`. Everything clients read is in the block at the top:

- `PROFILE`: name, email, phone, WhatsApp, GitHub, LinkedIn, booking link, photo, call hours, reply time
- `PROJECTS`: problem, what you built, results, live link, GitHub repo link, screenshot (`image`)
- `TESTIMONIALS`: add a real client quote and the "What clients say" section appears
- `SERVICES`, `STEPS`, `FAQ`, `FIT`, `ENGAGE`, `TOOLS`: all plain text and lists

Empty values (`photo`, `linkedin`, `bookingUrl`, `repo`, `image`, `TESTIMONIALS`) simply hide that part.

## Add your photo and screenshots

Put files in the `public` folder, then set the path:

- `photo: "/me.jpg"` in `PROFILE` (replaces the developer illustration)
- `image: "/ap13news.png"` on a project (replaces the placeholder browser frame)

## Check these before publishing

The text includes defaults you should confirm you can keep: timelines, 30 days of free fixes, 50% upfront payment, "you own the code and hosting", and 24/7 call availability.

## Deploy

Push to GitHub and import the repo in Vercel (framework: Vite, build `npm run build`, output `dist`). Add your own domain in the Vercel project settings.

## Credits

Tool logos are from Devicon (MIT licence), embedded in `src/toolIcons.js`.
