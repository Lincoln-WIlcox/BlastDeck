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

export const getCardsByMe = () =>
{
    return fetch(`/api/card/mine`).then(res => res.json())
}

export const getCardById = (id) =>
{
    return fetch(`/api/card/${id}`).then(res => res.json())
}

export const editCard = (card, id) =>
{
    return fetch(`/api/card/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(card)
        })
}

export const deleteCard = (id) =>
{
    return fetch(`/api/card/${id}`,
        {
            method: "DELETE",
        })
}

export const getStarred = (notInSet = null) =>
{
    return fetch(`/api/card/starred` + (notInSet ? `?notInSet=${notInSet}` : "")).then(res => res.json())
}

export const getCardIdsToPractice = () =>
{
    return fetch(`/api/card/cards-to-practice`).then(res => res.json())
}

export const getCardWithoutCorrectAnswer = (id) =>
{
    return fetch(`/api/card/${id}/no-correct-answer`).then(res => res.json())
}