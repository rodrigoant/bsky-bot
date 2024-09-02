import pkg from '@atproto/api'
import * as dotenv from 'dotenv';
import * as process from 'process'
const { BskyAgent } = pkg;
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