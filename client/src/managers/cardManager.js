export const getCards = () =>
{
    return fetch(`/api/card`).then(res => res.json())
}

export const starCard = (cardId) =>
{
    return fetch(`/api/card/${cardId}/star`,
        {
            method: "POST"
        })
}

export const unStarCard = (cardId) =>
{
    return fetch(`/api/card/${cardId}/unstar`,
        {
            method: "DELETE"
        })
}

export const createCardByMe = (card) =>
{
    return fetch(`/api/card`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card)
        })
}