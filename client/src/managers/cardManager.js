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