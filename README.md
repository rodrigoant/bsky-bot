# 🦋🤖 Quotidian Quotables Bsky Bot

Inspiring quotes every 4 hours posted on [https://bsky.app/profile/quotidianquotables.bsky.social](https://bsky.app/profile/quotidianquotables.bsky.social)

## Javascript
```js
import pkg from '@atproto/api';
import dotenv from 'dotenv'
import process from 'process'
const { BskyAgent } = pkg
dotenv.config()

const agent = new BskyAgent({
  service: 'https://bsky.social'
})

await agent.login({
  identifier: process.env.BLUESKY_USERNAME,
  password: process.env.BLUESKY_PASSWORD
})

const data = await fetch(process.env.URL)
const quotes = await data.json()
const randomIndex = Math.floor(Math.random() * quotes.length)
const { content, author } = quotes[randomIndex]

await agent.post({
  text: `💬 ${content}

📖 — ${author} ✍️`
})
```

## Workflow 
Cron Job configured with Github Actions

```yml
name: Create Post

on:
  # Triggers the workflow every 4 hours
  schedule:
    - cron: "0 */4 * * *"
  workflow_dispatch:

jobs:
  cron:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4 

      - name: Set up Node.js
        uses: actions/setup-node@v4 
        with:
          node-version: '20' 

      - name: Install dependencies
        run: npm install

      - name: Run the app
        env:
          BLUESKY_USERNAME: ${{ secrets.BLUESKY_USERNAME }}
          BLUESKY_PASSWORD: ${{ secrets.BLUESKY_PASSWORD }}
          URL: ${{ secrets.URL }}
        run: node index.js
```

## Quotes

The quotes are stored in a private gist file with +2000 entries:

```json
[
  {
    "content": "We've got to have a dream if we are going to make a dream come true.",
    "author": "Walt Disney"
  },
  {
    "content": "Education is the most powerful weapon which you can use to change the world.",
    "author": "Nelson Mandela"
  }
]
```
