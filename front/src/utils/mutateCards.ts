import { Card } from "../@types";

export default function mutateCards(cards: Card[], userid: string) {
    return cards.map((c: Card) => { c.liked = c.likes.includes(userid); return c; })
}